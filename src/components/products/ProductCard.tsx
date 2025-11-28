import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useCartStore } from '@/stores/useCartStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useReviewsStore } from '@/stores/useReviewsStore';
import { FavoriteButton } from './FavoriteButton';
import { StarRating } from '@/components/ui/star-rating';
import { useState } from 'react';
import type { Product } from '@/types/index';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const { isFavorite } = useFavoritesStore();
  const { getProductRating } = useReviewsStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get product rating from reviews store
  const { average, count } = getProductRating(product.id.toString());

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      addItem(product);
      // Pequeno delay para feedback visual
      setTimeout(() => setIsAddingToCart(false), 500);
    } catch (error) {
      setIsAddingToCart(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/produtos/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg cursor-pointer" onClick={handleCardClick}>
          <img
            src={product.image || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=camiseta%20com%20Jesus%20cristo%20estilo%20crist%C3%A3o%20religioso&image_size=square'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <FavoriteButton
            productId={product.id.toString()}
            productName={product.name}
            productPrice={product.price}
            productImage={product.image}
            productCategory={product.category.name}
            size="sm"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 
          className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center mb-2">
          <StarRating 
            rating={average} 
            readonly 
            size="sm" 
            showCount={true}
            reviewCount={count}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} disponíveis` : 'Esgotado'}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock === 0}
        >
          {isAddingToCart ? (
            'Adicionando...'
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
