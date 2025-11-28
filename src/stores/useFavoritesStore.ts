import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  addedAt: string
}

interface FavoritesState {
  favorites: FavoriteProduct[]
  addToFavorites: (product: Omit<FavoriteProduct, 'addedAt'>) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (product) => {
        const newFavorite: FavoriteProduct = {
          ...product,
          addedAt: new Date().toISOString()
        }
        
        set((state) => ({
          favorites: [...state.favorites, newFavorite]
        }))
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter(item => item.id !== productId)
        }))
      },

      isFavorite: (productId) => {
        return get().favorites.some(item => item.id === productId)
      },

      clearFavorites: () => {
        set({ favorites: [] })
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
)