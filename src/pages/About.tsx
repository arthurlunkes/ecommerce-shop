import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sobre Nós</h1>
        <p className="text-lg text-gray-600 mt-2">Conheça nossa missão e valores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nossa História</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Somos uma loja dedicada a oferecer produtos de qualidade que expressem fé e propósito.
              Nosso compromisso é com a excelência no atendimento e a curadoria de itens que inspiram.
            </p>
            <p className="text-gray-700">
              Trabalhamos para que cada experiência de compra seja simples, segura e significativa.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" /> Nossos Valores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>Integridade e transparência</li>
              <li>Excelência no atendimento</li>
              <li>Produtos selecionados com propósito</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" /> Nossa Operação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Enviamos para todo o Brasil com parceiros logísticos confiáveis. Compras seguras e suporte agil por nossos canais.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

