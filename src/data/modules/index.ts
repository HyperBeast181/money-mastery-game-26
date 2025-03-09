
import { Module } from '../../types';
import { popularModules } from './popularModules';
import { financialModules } from './financialModules';
import { savingsModules } from './savingsModules';
import { taxModules } from './taxModules';
import { educationModules } from './educationModules';

// Импортируем модули с правильными путями
// Остальные модули будут добавлены позже
const investingModules: Module[] = [];
const careerModules: Module[] = [];
const lifecycleModules: Module[] = [];
const entrepreneurshipModules: Module[] = [];
const riskManagementModules: Module[] = [];
const financialBasicsModules: Module[] = [];

// Combine all module arrays
export const modules: Module[] = [
  ...popularModules,
  ...financialModules,
  ...savingsModules,
  ...taxModules,
  ...educationModules,
  ...investingModules,
  ...careerModules,
  ...lifecycleModules,
  ...entrepreneurshipModules,
  ...riskManagementModules,
  ...financialBasicsModules
];
