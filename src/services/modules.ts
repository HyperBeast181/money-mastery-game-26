import { supabase } from '../integrations/supabase/client';
import { Module, ModuleStatus } from '../types';

export const getModules = async (): Promise<Module[]> => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    
    // Transform the data to match the Module type
    return data.map(module => ({
      id: module.id,
      title: module.title,
      icon: module.icon,
      category: module.category,
      category_id: module.category_id,
      coins: module.coins || 0,
      progress: module.progress || 0,
      currentPart: module.current_part || 0,
      totalParts: module.total_parts || 1,
      timeEstimate: module.time_estimate || 5,
      participants: module.participants || 0,
      status: (module.status || 'не начат') as ModuleStatus,
      description: module.description || ''
    }));
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

export const getModulesByCategory = async (categoryId: string): Promise<Module[]> => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('category_id', categoryId)
      .order('order_index');
    
    if (error) throw error;
    
    // Transform the data to match the Module type
    return data.map(module => ({
      id: module.id,
      title: module.title,
      icon: module.icon,
      category: module.category,
      category_id: module.category_id,
      coins: module.coins || 0,
      progress: module.progress || 0,
      currentPart: module.current_part || 0,
      totalParts: module.total_parts || 1,
      timeEstimate: module.time_estimate || 5,
      participants: module.participants || 0,
      status: (module.status || 'не начат') as ModuleStatus,
      description: module.description || ''
    }));
  } catch (error) {
    console.error('Error fetching modules by category:', error);
    return [];
  }
};

export const updateModuleProgress = async (
  moduleId: string, 
  progress: number, 
  status: ModuleStatus
): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    // Проверяем, существует ли запись о прогрессе пользователя для данного модуля
    const { data: existingRecord, error: checkError } = await supabase
      .from('user_modules')
      .select('*')
      .eq('user_id', user.id)
      .eq('module_id', moduleId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    let updateResult;
    
    if (existingRecord) {
      // Обновляем существующую запись
      updateResult = await supabase
        .from('user_modules')
        .update({
          progress,
          status,
          last_access: new Date().toISOString()
        })
        .eq('id', existingRecord.id);
    } else {
      // Создаем новую запись
      updateResult = await supabase
        .from('user_modules')
        .insert({
          user_id: user.id,
          module_id: moduleId,
          progress,
          status,
          started_at: new Date().toISOString(),
          last_access: new Date().toISOString()
        });
    }
    
    if (updateResult.error) throw updateResult.error;
    
    return true;
  } catch (error) {
    console.error('Error updating module progress:', error);
    return false;
  }
};

export const updateCategory = async (categoryId: string, newValues: Partial<{
  title: string,
  icon: string,
  total_modules: number
}>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('categories')
      .update(newValues)
      .eq('id', categoryId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    return false;
  }
};

export const updateCategoryModuleCount = async (categoryId: string): Promise<boolean> => {
  try {
    // Получаем количество модулей в категории
    const { count, error } = await supabase
      .from('modules')
      .select('id', { count: 'exact' })
      .eq('category_id', categoryId);
    
    if (error) throw error;
    
    // Обновляем счетчик модулей в категории
    const { error: updateError } = await supabase
      .from('categories')
      .update({ total_modules: count })
      .eq('id', categoryId);
    
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error('Error updating category module count:', error);
    return false;
  }
};
