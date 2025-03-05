
import { supabase } from "../integrations/supabase/client";

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
