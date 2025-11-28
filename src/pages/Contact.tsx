import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validate = () => {
    if (!name.trim()) return 'Informe seu nome.'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Informe um e-mail válido.'
    if (message.trim().length < 10) return 'Sua mensagem deve ter pelo menos 10 caracteres.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const validation = validate()
    if (validation) {
      setError(validation)
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 600))
      setSuccess('Mensagem enviada! Entraremos em contato em breve.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError('Falha ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contato</h1>
        <p className="text-lg text-gray-600 mt-2">Fale com nossa equipe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envie sua mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">{error}</Alert>
            )}
            {success && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">{success}</Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium mb-2">Nome</Label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium mb-2">E-mail</Label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium mb-2">Mensagem</Label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  placeholder="Como podemos ajudar?"
                />
                <p className="text-xs text-gray-500 mt-1">Mínimo de 10 caracteres</p>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>Email: suporte@lojaexemplo.com</p>
            <p>Telefone: (11) 99999-9999</p>
            <p>Atendimento: Seg a Sex, 9h às 18h</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

