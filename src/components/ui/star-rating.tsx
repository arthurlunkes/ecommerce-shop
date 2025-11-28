import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  reviewCount?: number
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = 'md',
  showCount = false,
  reviewCount
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleClick = (newRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(newRating)
    }
  }

  const handleMouseEnter = (newRating: number) => {
    if (!readonly) {
      setHoverRating(newRating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating)
        const isHalf = !isFilled && star === Math.ceil(rating) && rating % 1 !== 0

        return (
          <button
            key={star}
            type="button"
            className={cn(
              'transition-colors',
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
              sizeClasses[size]
            )}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            aria-label={`${star} estrelas`}
          >
            <Star
              className={cn(
                'w-full h-full',
                isFilled 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : isHalf
                  ? 'fill-yellow-200 text-yellow-400'
                  : 'fill-gray-200 text-gray-300'
              )}
            />
          </button>
        )
      })}
      {showCount && reviewCount !== undefined && (
        <span className="ml-2 text-sm text-gray-600">
          ({reviewCount})
        </span>
      )}
    </div>
  )
}