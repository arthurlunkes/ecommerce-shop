import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { StarRating } from '@/components/ui/star-rating'
import { useAuthStore } from '@/stores/useAuthStore'
import { useReviewsStore } from '@/stores/useReviewsStore'

interface ReviewFormProps {
  productId: string
  productName: string
  onReviewSubmitted?: () => void
}

export function ReviewForm({ productId, productName, onReviewSubmitted }: ReviewFormProps) {
  const { user } = useAuthStore()
  const { addReview } = useReviewsStore()
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('Você precisa estar logado para avaliar um produto.')
      return
    }

    if (rating === 0) {
      setError('Por favor, selecione uma avaliação.')
      return
    }

    if (comment.trim().length < 10) {
      setError('O comentário deve ter pelo menos 10 caracteres.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      addReview({
        productId,
        userId: user.id,
        userName: user.name || user.email.split('@')[0] || 'Anônimo',
        rating,
        comment: comment.trim()
      })

      setSuccess('Avaliação enviada com sucesso! Obrigado pelo feedback.')
      setRating(0)
      setComment('')
      
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (err) {
      setError('Erro ao enviar avaliação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Avaliar {productName}
      </h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <span>{error}</span>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Sua Avaliação *
          </Label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size="lg"
          />
        </div>

        <div>
          <Label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Comentário *
          </Label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Compartilhe sua experiência com este produto..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Mínimo de 10 caracteres
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Enviando...
              </>
            ) : (
              'Enviar Avaliação'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setRating(0)
              setComment('')
              setError(null)
              setSuccess(null)
            }}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
