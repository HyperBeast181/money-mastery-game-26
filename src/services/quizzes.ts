
import { supabase } from '../integrations/supabase/client';
import { Quiz, Question, Option } from '../types';
import { moduleContentData } from '../data/categoryModules';

export const getQuizForLesson = async (lessonId: string): Promise<Quiz | null> => {
  try {
    // Пробуем получить тест из Supabase
    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('lesson_id', lessonId)
      .maybeSingle();
    
    if (quizError) throw quizError;
    
    if (quizData) {
      // Если тест найден, получаем его вопросы
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizData.id);
      
      if (questionsError) throw questionsError;
      
      // Для каждого вопроса получаем варианты ответов
      const questions: Question[] = await Promise.all(
        questionsData.map(async question => {
          const { data: optionsData, error: optionsError } = await supabase
            .from('options')
            .select('*')
            .eq('question_id', question.id);
          
          if (optionsError) throw optionsError;
          
          return {
            id: question.id,
            text: question.text,
            correctOptionId: question.correct_option_id,
            explanation: question.explanation || '',
            options: optionsData as Option[]
          };
        })
      );
      
      return {
        id: quizData.id,
        lessonId,
        questions: questions
      };
    } else {
      // Если в базе данных нет теста, проверяем локальные данные
      // Нам нужно найти модуль и урок по lessonId
      for (const moduleId in moduleContentData) {
        const moduleContent = moduleContentData[moduleId as keyof typeof moduleContentData];
        
        if (moduleContent.lessons) {
          const lesson = moduleContent.lessons.find(l => l.id === lessonId);
          
          if (lesson && lesson.quiz) {
            return {
              ...lesson.quiz,
              lessonId // Add the required lessonId property
            };
          }
        }
      }
      
      return null;
    }
  } catch (error) {
    console.error('Error fetching quiz:', error);
    
    // В случае ошибки проверяем локальные данные
    for (const moduleId in moduleContentData) {
      const moduleContent = moduleContentData[moduleId as keyof typeof moduleContentData];
      
      if (moduleContent.lessons) {
        const lesson = moduleContent.lessons.find(l => l.id === lessonId);
        
        if (lesson && lesson.quiz) {
          return {
            ...lesson.quiz,
            lessonId // Add the required lessonId property
          };
        }
      }
    }
    
    return null;
  }
};
