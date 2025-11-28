import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ReviewsState {
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void
  getProductReviews: (productId: string) => Review[]
  getProductRating: (productId: string) => { average: number; count: number }
  deleteReview: (reviewId: string) => void
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString()
        }
        
        set((state) => ({
          reviews: [...state.reviews, newReview]
        }))
      },

      getProductReviews: (productId) => {
        return get().reviews
          .filter(review => review.productId === productId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      },

      getProductRating: (productId) => {
        const productReviews = get().getProductReviews(productId)
        
        if (productReviews.length === 0) {
          return { average: 0, count: 0 }
        }
        
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
        const average = Math.round((sum / productReviews.length) * 10) / 10
        
        return { average, count: productReviews.length }
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter(review => review.id !== reviewId)
        }))
      }
    }),
    {
      name: 'reviews-storage'
    }
  )
)