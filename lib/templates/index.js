import { getBaseTemplate } from './base/index.js';
import { getTodoTemplate } from './todo/index.js';
import { getDashboardTemplate } from './dashboard/index.js';
import { getEcommerceTemplate } from './ecommerce/index.js';

export const templates = {
  empty: getBaseTemplate,
  todo: getTodoTemplate,
  dashboard: getDashboardTemplate,
  ecommerce: getEcommerceTemplate
}; 