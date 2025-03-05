
import { supabase } from "../integrations/supabase/client";
import { Lesson, Quiz, ModuleStatus } from "../types";

// Получение уроков для модуля
export const getLessonsForModule = async (moduleId: string): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .order('order_index');
  
  if (error) {
    console.error('Ошибка при получении уроков:', error);
    return [];
  }
  
  // Для каждого урока получим викторину, если она есть
  const lessonsWithQuizzes = await Promise.all(
    data.map(async (lesson) => {
      const quiz = await getQuizForLesson(lesson.id);
      return {
        ...lesson,
        id: lesson.id,
        moduleId: lesson.module_id,
        title: lesson.title,
        content: lesson.content,
        order: lesson.order_index,
        completed: lesson.completed,
        quiz: quiz || undefined
      };
    })
  );
  
  return lessonsWithQuizzes;
};

// Отметка урока как выполненного
export const completeLesson = async (moduleId: string, lessonId: string): Promise<boolean> => {
  // Проверяем, авторизован ли пользователь
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('Пользователь не авторизован');
    return false;
  }
  
  // Получаем запись user_modules
  const { data: userModule, error: userModuleError } = await supabase
    .from('user_modules')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single();
  
  if (userModuleError && userModuleError.code !== 'PGRST116') {
    console.error('Ошибка при получении прогресса модуля:', userModuleError);
    return false;
  }
  
  let completedLessons: string[] = [];
  
  if (userModule) {
    completedLessons = userModule.completed_lessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }
  } else {
    completedLessons = [lessonId];
  }
  
  // Получаем общее количество уроков в модуле
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id')
    .eq('module_id', moduleId);
  
  if (lessonsError) {
    console.error('Ошибка при получении уроков модуля:', lessonsError);
    return false;
  }
  
  const totalLessons = lessons.length;
  const progress = Math.round((completedLessons.length / totalLessons) * 100);
  const status: ModuleStatus = progress === 100 ? 'завершено' : progress > 0 ? 'в процессе' : 'не начат';
  
  // Обновляем или создаем запись в user_modules
  if (userModule) {
    const { error: updateError } = await supabase
      .from('user_modules')
      .update({
        completed_lessons: completedLessons,
        progress,
        status,
        last_access: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('module_id', moduleId);
    
    if (updateError) {
      console.error('Ошибка при обновлении прогресса:', updateError);
      return false;
    }
  } else {
    const { error: insertError } = await supabase
      .from('user_modules')
      .insert({
        user_id: user.id,
        module_id: moduleId,
        completed_lessons: completedLessons,
        progress,
        status,
        last_access: new Date().toISOString()
      });
    
    if (insertError) {
      console.error('Ошибка при создании записи прогресса:', insertError);
      return false;
    }
  }
  
  return true;
};
