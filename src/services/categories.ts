
import { supabase } from "../integrations/supabase/client";
import { Category } from "../types";

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
