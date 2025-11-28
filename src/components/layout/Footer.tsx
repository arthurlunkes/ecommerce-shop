import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <span className="font-bold">Church Store</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Sua loja virtual de produtos religiosos! Camisetas, acessórios e muito mais para expressar sua fé.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/produtos" className="text-gray-600 hover:text-primary">Produtos</Link></li>
              <li><Link to="/sobre" className="text-gray-600 hover:text-primary">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-gray-600 hover:text-primary">Contato</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/produtos?categoria=camisetas" className="text-gray-600 hover:text-primary">Camisetas</Link></li>
              <li><Link to="/produtos?categoria=acessorios" className="text-gray-600 hover:text-primary">Acessórios</Link></li>
              <li><Link to="/produtos?categoria=copos" className="text-gray-600 hover:text-primary">Copos</Link></li>
              <li><Link to="/produtos?categoria=tenis" className="text-gray-600 hover:text-primary">Tênis</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">contato@churchstore.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            ©2025 Church Store Loja Virtual. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;