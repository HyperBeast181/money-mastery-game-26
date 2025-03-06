
import { Module } from '../../types';
import { popularModules } from './popularModules';
import { financialModules } from './financialModules';
import { savingsModules } from './savingsModules';
import { taxModules } from './taxModules';

// Combine all module arrays
export const modules: Module[] = [
  ...popularModules,
  ...financialModules,
  ...savingsModules,
  ...taxModules
];
