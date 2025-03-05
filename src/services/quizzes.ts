
import { supabase } from "../integrations/supabase/client";
import { Quiz } from "../types";

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
