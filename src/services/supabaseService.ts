
import { supabase } from "../integrations/supabase/client";
import { User, Module, Category, Lesson, Question, Option, ModuleStatus, Quiz } from "../types";

// Получение категорий
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('title');
  
  if (error) {
    console.error('Ошибка при получении категорий:', error);
    return [];
  }
  
  return data || [];
};

// Получение модулей
export const getModules = async (): Promise<Module[]> => {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .order('order_index');
  
  if (error) {
    console.error('Ошибка при получении модулей:', error);
    return [];
  }
  
  return data.map(module => ({
    ...module,
    status: module.status as ModuleStatus,
    progress: module.progress || 0,
    currentPart: module.current_part || 0,
    totalParts: module.total_parts || 1,
    timeEstimate: module.time_estimate || 5,
    participants: module.participants || 0
  })) || [];
};

// Получение модулей по категории
export const getModulesByCategory = async (categoryId: string): Promise<Module[]> => {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('category_id', categoryId)
    .order('order_index');
  
  if (error) {
    console.error('Ошибка при получении модулей по категории:', error);
    return [];
  }
  
  return data.map(module => ({
    ...module,
    status: module.status as ModuleStatus,
    progress: module.progress || 0,
    currentPart: module.current_part || 0,
    totalParts: module.total_parts || 1,
    timeEstimate: module.time_estimate || 5,
    participants: module.participants || 0
  })) || [];
};

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

// Получение викторины для урока
export const getQuizForLesson = async (lessonId: string): Promise<Quiz | null> => {
  const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lessonId)
    .single();
  
  if (quizError || !quizData) {
    return null;
  }
  
  // Получаем вопросы для викторины
  const { data: questionsData, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .eq('quiz_id', quizData.id);
  
  if (questionsError || !questionsData) {
    return {
      id: quizData.id,
      lessonId: quizData.lesson_id,
      questions: []
    };
  }
  
  // Для каждого вопроса получаем варианты ответов
  const questionsWithOptions = await Promise.all(
    questionsData.map(async (question) => {
      const { data: optionsData, error: optionsError } = await supabase
        .from('options')
        .select('*')
        .eq('question_id', question.id);
      
      if (optionsError || !optionsData) {
        return {
          id: question.id,
          text: question.text,
          explanation: question.explanation || '',
          correctOptionId: question.correct_option_id || '',
          options: []
        };
      }
      
      const options = optionsData.map(option => ({
        id: option.id,
        text: option.text
      }));
      
      return {
        id: question.id,
        text: question.text,
        explanation: question.explanation || '',
        correctOptionId: question.correct_option_id || '',
        options
      };
    })
  );
  
  return {
    id: quizData.id,
    lessonId: quizData.lesson_id,
    questions: questionsWithOptions
  };
};

// Обновление прогресса модуля
export const updateModuleProgress = async (moduleId: string, progress: number, status: ModuleStatus): Promise<boolean> => {
  // Проверяем, авторизован ли пользователь
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('Пользователь не авторизован');
    return false;
  }
  
  // Проверяем, есть ли запись в user_modules
  const { data: existingData, error: checkError } = await supabase
    .from('user_modules')
    .select('*')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .single();
  
  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 - запись не найдена, это нормально
    console.error('Ошибка при проверке прогресса модуля:', checkError);
    return false;
  }
  
  if (!existingData) {
    // Создаем новую запись
    const { error: insertError } = await supabase
      .from('user_modules')
      .insert({
        user_id: user.id,
        module_id: moduleId,
        progress,
        status,
        last_access: new Date().toISOString()
      });
    
    if (insertError) {
      console.error('Ошибка при создании записи прогресса:', insertError);
      return false;
    }
  } else {
    // Обновляем существующую запись
    const { error: updateError } = await supabase
      .from('user_modules')
      .update({
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
  }
  
  return true;
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

// Получение тривиа-событий
export const getTriviaEvents = async () => {
  const { data, error } = await supabase
    .from('trivia_events')
    .select('*');
  
  if (error) {
    console.error('Ошибка при получении событий викторины:', error);
    return [];
  }
  
  return data || [];
};

// Получение данных таблицы лидеров
export const getLeaderboardUsers = async () => {
  const { data, error } = await supabase
    .from('leaderboard_users')
    .select('*')
    .order('position');
  
  if (error) {
    console.error('Ошибка при получении таблицы лидеров:', error);
    return [];
  }
  
  return data || [];
};
