import { useNavigate } from 'react-router-dom'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export default function Favorites() {
  const navigate = useNavigate()
  const { favorites, removeFromFavorites } = useFavoritesStore()

  const handleRemoveFavorite = (productId: string) => {
    removeFromFavorites(productId)
  }

  const handleAddToCart = (product: any) => {
    // Navigate to product page or add to cart functionality
    navigate(`/produtos/${product.id}`)
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Meus Favoritos</h1>
          <Card>
            <CardContent className="py-12">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum favorito ainda</h3>
              <p className="text-gray-600 mb-6">
                Você ainda não adicionou nenhum produto aos seus favoritos.
              </p>
              <Button onClick={() => navigate('/produtos')}>
                Explorar Produtos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Favoritos</h1>
        <p className="text-gray-600">{favorites.length} produto{favorites.length !== 1 ? 's' : ''} salvo{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/produtos/${product.id}`)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFavorite(product.id)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
              >
                <Heart className="h-5 w-5 fill-current" />
              </Button>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`/produtos/${product.id}`)}>
                {product.name}
              </CardTitle>
              <p className="text-sm text-gray-600 capitalize">{product.category}</p>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ver Produto
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}