
import { supabase } from "../integrations/supabase/client";
import { Module, ModuleStatus } from "../types";

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
