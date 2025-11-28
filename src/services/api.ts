import type { Product, Category, Order } from '@/types/index';
import { mockApiEnabled, mockProducts, mockCategories, mockOrders, mockFavorites, mockReviews, mockAuth } from '@/services/mock';

// Produtos
export const productsApi = {
  getAll: (categoryId?: number) => mockProducts.getAll(categoryId),
  getById: (id: number) => mockProducts.getById(id),
  search: (query: string) => mockProducts.search(query),
};

// Categorias
export const categoriesApi = {
  getAll: () => mockCategories.getAll(),
  getById: (id: number) => mockCategories.getById(id),
};

// Pedidos
export const ordersApi = {
  getAll: () => mockOrders.getAll(),
  create: (orderData: any) => mockOrders.create(orderData),
  getById: (id: string) => mockOrders.getById(id),
};

// Favoritos
export const favoritesApi = {
  getAll: () => mockFavorites.getAll(),
  add: (productId: number) => mockFavorites.add(productId),
  remove: (id: string) => mockFavorites.remove(id),
};

// Avaliações
export const reviewsApi = {
  getByProduct: (productId: number) => mockReviews.getByProduct(productId),
  create: (reviewData: any) => mockReviews.create(reviewData),
};

// Autenticação
export const authApi = {
  login: (email: string, password: string) => mockAuth.login(email, password),
  register: (userData: any) => mockAuth.register(userData),
  me: () => mockAuth.me(),
};

export default {} as any;
