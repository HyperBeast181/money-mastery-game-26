
import { Module } from '../../types';
import { popularModules } from './popularModules';
import { financialModules } from './financialModules';
import { savingsModules } from './savingsModules';
import { taxModules } from './taxModules';
import { educationModules } from './educationModules';
import { investingModules } from './educationModules';
import { careerModules } from './educationModules';
import { lifecycleModules } from './educationModules';
import { entrepreneurshipModules } from './educationModules';
import { riskManagementModules } from './educationModules';
import { financialBasicsModules } from './educationModules';

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
