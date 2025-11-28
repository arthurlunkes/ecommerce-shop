import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { StarRating } from '@/components/ui/star-rating'
import { ReviewForm } from './ReviewForm'
import { useReviewsStore } from '@/stores/useReviewsStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MessageCircle, User, Trash2 } from 'lucide-react'

interface ReviewsListProps {
  productId: string
  productName: string
}

export function ReviewsList({ productId, productName }: ReviewsListProps) {
  const { user } = useAuthStore()
  const { getProductReviews, deleteReview } = useReviewsStore()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reviews = getProductReviews(productId)
  const { average, count } = useReviewsStore.getState().getProductRating(productId)

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      deleteReview(reviewId)
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  const handleReviewSubmitted = () => {
    setShowReviewForm(false)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {/* Resumo das Avaliações */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Avaliações dos Clientes
            </CardTitle>
            {!showReviewForm && (
              <Button
                onClick={() => setShowReviewForm(true)}
                disabled={!user}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Avaliar Produto
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {count > 0 ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StarRating rating={average} readonly size="lg" />
                <span className="text-2xl font-bold text-gray-900">{average.toFixed(1)}</span>
              </div>
              <span className="text-gray-600">
                baseado em {count} avaliação{count !== 1 ? 'ões' : ''}
              </span>
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">
                Este produto ainda não possui avaliações.
              </p>
              {user && (
                <Button onClick={() => setShowReviewForm(true)}>
                  Seja o primeiro a avaliar
                </Button>
              )}
            </div>
          )}

          {!user && (
            <Alert className="mt-4">
              <AlertDescription>
                Faça login para poder avaliar este produto.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Formulário de Avaliação */}
      {showReviewForm && user && (
        <ReviewForm
          productId={productId}
          productName={productName}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}

      {/* Lista de Avaliações */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 rounded-full p-2">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.userName}
                        </h4>
                        <StarRating rating={review.rating} readonly size="sm" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatDate(review.createdAt)}
                      </p>
                      <p className="text-gray-800 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                  
                  {user && user.id === review.userId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
