import type { Product, Category, Order, Review, Favorite, User, CartItem } from '@/types/index';

const ls = {
  get<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  },
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

// Mock categories
const categories: Category[] = [
  { id: 1, name: 'Camisetas', description: 'Roupas com mensagens de fé', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: 'Tênis', description: 'Calçados com estilo cristão', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, name: 'Copos', description: 'Utensílios e acessórios', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

// Mock products
const products: Product[] = [
  { id: 1, name: 'Camiseta Jesus Saves', description: '100% algodão, estampa premium', price: 89.9, image: '/img/camiseta-jesus.jpg', category: categories[0], stock: 20, rating: 4.6, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, name: 'Tênis Walk in Faith', description: 'Conforto e estilo', price: 249.9, image: '/img/tenis-faith.jpg', category: categories[1], stock: 12, rating: 4.2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, name: 'Copo Hope 500ml', description: 'Copo térmico com mensagem', price: 59.9, image: '/img/copo-hope.jpg', category: categories[2], stock: 30, rating: 4.8, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, name: 'Camiseta Oficial', description: 'Oficial Cristão Movement', price: 99.9, image: '/img/camiseta.jpg', category: categories[0], stock: 15, rating: 4.4, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

const genId = () => Math.random().toString(36).slice(2, 10);

// Mock auth
const AUTH_KEY = 'mock_auth_user';
const TOKEN_KEY = 'auth_token';

export const mockAuth = {
  login(email: string, password: string) {
    const users = ls.get<Record<string, User>>('mock_users', {});
    let user = users[email];
    if (!user) {
      user = { id: genId(), email, name: email.split('@')[0], created_at: new Date().toISOString() };
      users[email] = user;
      ls.set('mock_users', users);
    }
    const token = genId();
    ls.set<User>(AUTH_KEY, user);
    localStorage.setItem(TOKEN_KEY, token);
    return Promise.resolve({ data: { user, token } });
  },
  register(userData: { email: string; password: string; name: string }) {
    const users = ls.get<Record<string, User>>('mock_users', {});
    const user: User = { id: genId(), email: userData.email, name: userData.name, created_at: new Date().toISOString() };
    users[user.email] = user;
    ls.set('mock_users', users);
    const token = genId();
    ls.set<User>(AUTH_KEY, user);
    localStorage.setItem(TOKEN_KEY, token);
    return Promise.resolve({ data: { user, token } });
  },
  me() {
    const user = ls.get<User | null>(AUTH_KEY, null);
    return Promise.resolve({ data: user });
  },
};

// Mock products API
export const mockProducts = {
  getAll(categoryId?: number) {
    const data = categoryId ? products.filter(p => p.category.id === categoryId) : products;
    return Promise.resolve({ data });
  },
  getById(id: number) {
    const item = products.find(p => p.id === id) || null;
    return Promise.resolve({ data: item });
  },
  search(query: string) {
    const q = query.toLowerCase();
    const data = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    return Promise.resolve({ data });
  },
};

// Mock categories API
export const mockCategories = {
  getAll() { return Promise.resolve({ data: categories }); },
  getById(id: number) { return Promise.resolve({ data: categories.find(c => c.id === id) || null }); },
};

// Favorites
export const mockFavorites = {
  getAll() {
    const data = ls.get<Favorite[]>('favorites', []);
    return Promise.resolve({ data });
  },
  add(productId: number) {
    const user = ls.get<User | null>(AUTH_KEY, null);
    const favs = ls.get<Favorite[]>('favorites', []);
    const fav: Favorite = { id: genId(), user_id: user?.id || 'anon', product_id: productId, created_at: new Date().toISOString() };
    const next = [...favs, fav];
    ls.set('favorites', next);
    return Promise.resolve({ data: fav });
  },
  remove(id: string) {
    const favs = ls.get<Favorite[]>('favorites', []);
    const next = favs.filter(f => f.id !== id);
    ls.set('favorites', next);
    return Promise.resolve({ data: { id } });
  },
};

// Reviews
export const mockReviews = {
  getByProduct(productId: number) {
    const data = ls.get<Review[]>('reviews', []).filter(r => r.product_id === productId);
    return Promise.resolve({ data });
  },
  create(reviewData: Omit<Review, 'id' | 'created_at'>) {
    const reviews = ls.get<Review[]>('reviews', []);
    const next: Review = { ...reviewData, id: genId(), created_at: new Date().toISOString() };
    ls.set('reviews', [...reviews, next]);
    return Promise.resolve({ data: next });
  },
};

// Orders
export const mockOrders = {
  getAll() {
    const user = ls.get<User | null>(AUTH_KEY, null);
    const all = ls.get<Order[]>('orders', []);
    const data = user ? all.filter(o => o.user_id === user.id) : [];
    return Promise.resolve({ data });
  },
  create(orderData: { items: CartItem[]; total: number }) {
    const user = ls.get<User | null>(AUTH_KEY, null);
    const all = ls.get<Order[]>('orders', []);
    const order: Order = {
      id: genId(),
      user_id: user?.id || 'anon',
      total: orderData.total,
      status: 'pending',
      items: orderData.items,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    ls.set('orders', [order, ...all]);
    return Promise.resolve({ data: order });
  },
  getById(id: string) {
    const all = ls.get<Order[]>('orders', []);
    return Promise.resolve({ data: all.find(o => o.id === id) || null });
  },
};

export const mockApiEnabled = true;

