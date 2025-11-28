import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FavoriteButton } from '@/components/products/FavoriteButton'
import { StarRating } from '@/components/ui/star-rating'
import { ReviewsList } from '@/components/products/ReviewsList'
import { useProductsStore } from '@/stores/useProductsStore'
import { useCartStore } from '@/stores/useCartStore'
import { useReviewsStore } from '@/stores/useReviewsStore'
import { ShoppingCart, Package } from 'lucide-react'

export default function ProductDetail() {
  const navigate = useNavigate()
  const params = useParams()
  const { products } = useProductsStore()
  const { addItem } = useCartStore()
  const { getProductRating } = useReviewsStore()

  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const productId = useMemo(() => params.id ? Number(params.id) : null, [params.id])
  const product = useMemo(() => products.find(p => p.id === productId), [products, productId])

  useEffect(() => {
    if (!product && productId !== null) {
      // Se o produto não existe, volta para a listagem
      navigate('/produtos')
    }
  }, [product, productId, navigate])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">O item que você procura não está disponível.</p>
          <Button onClick={() => navigate('/produtos')}>Voltar para produtos</Button>
        </div>
      </div>
    )
  }

  const { average, count } = getProductRating(product.id.toString())

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      addItem(product)
      setTimeout(() => setIsAddingToCart(false), 600)
    } catch (e) {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[420px] object-cover"
            />
            <FavoriteButton
              productId={product.id.toString()}
              productName={product.name}
              productPrice={product.price}
              productImage={product.image}
              productCategory={product.category.name}
              size="sm"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive">Esgotado</Badge>
              </div>
            )}
          </div>
        </Card>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <p className="text-sm text-gray-600 capitalize">{product.category.name}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <StarRating rating={average} readonly size="md" />
                <span className="text-gray-700">{count} avaliação{count !== 1 ? 'es' : ''}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                <span className="text-sm text-gray-500">
                  {product.stock > 0 ? `${product.stock} disponíveis` : 'Esgotado'}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                  className="flex-1"
                >
                  {isAddingToCart ? 'Adicionando...' : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate('/produtos')}>Voltar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-10">
        <ReviewsList productId={product.id.toString()} productName={product.name} />
      </div>
    </div>
  )
}

