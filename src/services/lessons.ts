
import { supabase } from '../integrations/supabase/client';
import { Lesson } from '../types';
import { moduleContentData } from '../data/categoryModules';
import { getQuizForLesson } from './quizzes';

export const getLessonsForModule = async (moduleId: string): Promise<Lesson[]> => {
  try {
    // Сначала попробуем получить уроки из Supabase
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index');
    
    if (error) throw error;
    
    // Если в Supabase есть уроки для этого модуля, используем их
    if (data && data.length > 0) {
      const lessons: Lesson[] = await Promise.all(
        data.map(async lesson => {
          // Получаем тест для урока, если он есть
          const quiz = await getQuizForLesson(lesson.id);
          
          return {
            id: lesson.id,
            title: lesson.title,
            content: lesson.content,
            completed: lesson.completed || false,
            quiz: quiz
          };
        })
      );
      
      return lessons;
    } else {
      // Если в Supabase нет уроков, проверяем в наших локальных данных
      const moduleContent = moduleContentData[moduleId as keyof typeof moduleContentData];
      
      if (moduleContent && moduleContent.lessons) {
        return moduleContent.lessons as Lesson[];
      }
      
      // Если нет ни в базе данных, ни в локальных данных, возвращаем пустой массив
      return [];
    }
  } catch (error) {
    console.error('Error fetching lessons:', error);
    
    // В случае ошибки, попробуем использовать локальные данные
    const moduleContent = moduleContentData[moduleId as keyof typeof moduleContentData];
    
    if (moduleContent && moduleContent.lessons) {
      return moduleContent.lessons as Lesson[];
    }
    
    return [];
  }
};

export const completeLesson = async (moduleId: string, lessonId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    // Проверяем, существует ли запись о прогрессе пользователя для данного модуля
    const { data: userModule, error: checkError } = await supabase
      .from('user_modules')
      .select('*')
      .eq('user_id', user.id)
      .eq('module_id', moduleId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    let updateResult;
    
    if (userModule) {
      // Добавляем lessonId в массив completed_lessons, если его там еще нет
      const completedLessons = userModule.completed_lessons || [];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      }
      
      // Обновляем запись
      updateResult = await supabase
        .from('user_modules')
        .update({
          completed_lessons: completedLessons,
          last_access: new Date().toISOString()
        })
        .eq('id', userModule.id);
    } else {
      // Создаем новую запись
      updateResult = await supabase
        .from('user_modules')
        .insert({
          user_id: user.id,
          module_id: moduleId,
          completed_lessons: [lessonId],
          progress: 0, // начальный прогресс
          status: 'в процессе',
          started_at: new Date().toISOString(),
          last_access: new Date().toISOString()
        });
    }
    
    if (updateResult.error) throw updateResult.error;
    
    // Обновляем статус урока в базе данных
    const lessonUpdateResult = await supabase
      .from('lessons')
      .update({ completed: true })
      .eq('id', lessonId);
    
    if (lessonUpdateResult.error) throw lessonUpdateResult.error;
    
    return true;
  } catch (error) {
    console.error('Error completing lesson:', error);
    return false;
  }
};
