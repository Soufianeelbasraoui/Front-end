import { mockAuthAPI, mockProductAPI, mockAdminAPI } from './mockService';

export const authAPI = mockAuthAPI;
export const productAPI = mockProductAPI;
export const adminAPI = mockAdminAPI;

export default {
  auth: authAPI,
  products: productAPI,
  admin: adminAPI,
};
