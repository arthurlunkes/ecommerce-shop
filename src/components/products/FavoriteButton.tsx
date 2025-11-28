import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

interface FavoriteButtonProps {
  productId: string
  productName: string
  productPrice: number
  productImage: string
  productCategory: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function FavoriteButton({
  productId,
  productName,
  productPrice,
  productImage,
  productCategory,
  size = 'md',
  className
}: FavoriteButtonProps) {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore()

  const isFavorited = isFavorite(productId)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate('/auth/login')
      return
    }

    if (isFavorited) {
      removeFromFavorites(productId)
    } else {
      addToFavorites({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        category: productCategory
      })
    }
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleFavoriteClick}
      className={`${sizeClasses[size]} ${className} transition-all duration-200 ${
        isFavorited 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      }`}
      aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={`${
          size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
        } ${isFavorited ? 'fill-current' : ''}`}
      />
    </Button>
  )
}
