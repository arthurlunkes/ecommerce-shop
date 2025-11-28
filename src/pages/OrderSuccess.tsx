import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, Home, ShoppingBag, Mail, Phone, MapPin, DollarSign, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
}

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar o pedido no localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = existingOrders.find((o: Order) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Se não encontrar o pedido, redirecionar para home
      navigate('/');
    }
    
    setLoading(false);
  }, [orderId, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      credit_card: 'Cartão de Crédito',
      boleto: 'Boleto Bancário',
      pix: 'PIX'
    };
    return methods[method as keyof typeof methods] || method;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes do pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null; // Redirecionamento já foi tratado no useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de Sucesso */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Realizado com Sucesso!</h1>
          <p className="text-gray-600">
            Seu pedido #{order.id} foi confirmado e está sendo processado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações do Pedido */}
          <div className="space-y-6">
            {/* Status do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Status do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Pedido Confirmado</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Seu pedido foi recebido e está sendo preparado para envio.
                </p>
              </CardContent>
            </Card>

            {/* Método de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{getPaymentMethodLabel(order.paymentMethod)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.paymentMethod === 'credit_card' && 'Seu cartão será cobrado em breve.'}
                  {order.paymentMethod === 'boleto' && 'O boleto foi gerado e enviado para seu email.'}
                  {order.paymentMethod === 'pix' && 'O QR code foi gerado e enviado para seu email.'}
                </p>
              </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.address}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - CEP: {order.shippingAddress.zipCode}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {order.shippingAddress.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {order.shippingAddress.phone}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Resumo do Pedido #{order.id.split('-')[1]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-3">
                      <img
                        src={item.image || 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=produto%20religioso%20placeholder&image_size=square'}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qtd: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center">
                      <Truck className="h-3 w-3 mr-1" />
                      Frete
                    </span>
                    <span>{order.shipping === 0 ? 'Grátis' : formatPrice(order.shipping)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Voltar para Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/meus-pedidos">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Ver Meus Pedidos
            </Link>
          </Button>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            Um email de confirmação foi enviado para {order.shippingAddress.email}
          </p>
          <p>
            Você receberá atualizações sobre o status do seu pedido por email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;