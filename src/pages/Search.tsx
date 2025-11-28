import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, Filter, X, Package, Heart, ShoppingCart, Star, Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { FavoriteButton } from '@/components/products/FavoriteButton'
import { StarRating } from '@/components/ui/star-rating'
import { useProductsStore } from '@/stores/useProductsStore'
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import { useCartStore } from '@/stores/useCartStore'
import { useReviewsStore } from '@/stores/useReviewsStore'

interface SearchFilters {
  query: string
  category: string
  minPrice: number
  maxPrice: number
  minRating: number
  inStock: boolean
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'name'
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products } = useProductsStore()
  const { addItem } = useCartStore()
  const { getProductRating } = useReviewsStore()
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    inStock: false,
    sortBy: 'relevance'
  })
  
  const [showFilters, setShowFilters] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null)

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category.name)))

  // Filter and search products
  const filteredProducts = products.filter(product => {
    const matchesQuery = !filters.query || 
      product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.category.name.toLowerCase().includes(filters.query.toLowerCase())
    
    const matchesCategory = !filters.category || product.category.name === filters.category
    
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice
    
    const { average } = getProductRating(product.id.toString())
    const matchesRating = average >= filters.minRating
    
    const matchesStock = !filters.inStock || product.stock > 0
    
    return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesStock
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        const ratingA = getProductRating(a.id.toString()).average
        const ratingB = getProductRating(b.id.toString()).average
        return ratingB - ratingA
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0 // relevance - keep original order
    }
  })

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams()
    if (filters.query) params.set('q', filters.query)
    if (filters.category) params.set('category', filters.category)
    setSearchParams(params)
  }, [filters.query, filters.category, setSearchParams])

  const handleAddToCart = (product: any) => {
    setIsAddingToCart(product.id)
    addItem(product)
    setTimeout(() => setIsAddingToCart(null), 1000)
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      inStock: false,
      sortBy: 'relevance'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Buscar Produtos</h1>
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Busque por nome, descrição ou categoria..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Sliders className="h-5 w-5" />
            Filtros
            {Object.values(filters).some(v => v !== '' && v !== 0 && v !== false && v !== 'relevance') && (
              <Badge variant="secondary" className="ml-1">
                Ativo
              </Badge>
            )}
          </Button>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {sortedProducts.length} resultado{sortedProducts.length !== 1 ? 's' : ''}
            {filters.query && ` para "${filters.query}"`}
          </p>
          
          {/* Sort Options */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="relevance">Relevância</option>
            <option value="name">Nome</option>
            <option value="price-low">Menor Preço</option>
            <option value="price-high">Maior Preço</option>
            <option value="rating">Avaliação</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="w-80 bg-white rounded-lg p-6 shadow-sm h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filtros</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                Limpar tudo
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-3">Categoria</Label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-3">
                Faixa de Preço: {formatPrice(filters.minPrice)} - {formatPrice(filters.maxPrice)}
              </Label>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-600">Mínimo: {formatPrice(filters.minPrice)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Máximo: {formatPrice(filters.maxPrice)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <Label className="block text-sm font-medium mb-3">Avaliação Mínima</Label>
              <div className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.minRating === rating}
                      onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                      className="text-primary"
                    />
                    {rating === 0 ? (
                      <span className="text-sm">Qualquer avaliação</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <StarRating rating={rating} readonly size="sm" />
                        <span className="text-sm ml-1">ou mais</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Filter */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="text-primary"
                />
                <span className="text-sm">Apenas produtos em estoque</span>
              </label>
            </div>
          </aside>
        )}

        {/* Results */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar seus filtros ou termos de busca.
                </p>
                <Button onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const { average, count } = getProductRating(product.id.toString())
                
                return (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Esgotado</Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 capitalize">{product.category.name}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center mb-3">
                        <StarRating 
                          rating={average} 
                          readonly 
                          size="sm" 
                          showCount={true}
                          reviewCount={count}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.stock > 0 ? `${product.stock} disponíveis` : 'Esgotado'}
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAddingToCart === product.id || product.stock === 0}
                        className="w-full"
                      >
                        {isAddingToCart === product.id ? (
                          'Adicionando...'
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Adicionar ao Carrinho
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
