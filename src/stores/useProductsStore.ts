import { create } from 'zustand'
import type { Product } from '@/types/index'
import { productsApi } from '@/services/api'

interface ProductsState {
  products: Product[]
  isLoading: boolean
  error: string | null
  fetchAll: () => Promise<void>
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchAll: async () => {
    try {
      set({ isLoading: true, error: null })
      const res = await productsApi.getAll()
      set({ products: res.data, isLoading: false })
    } catch (e) {
      set({ error: 'Erro ao carregar produtos', isLoading: false })
    }
  },
}))

// Carregar produtos automaticamente quando o store for importado
if (useProductsStore.getState().products.length === 0) {
  useProductsStore.getState().fetchAll()
}

