import { useEffect } from 'react';
import AppRoutes from '@/routes/routes.tsx';
import { useAuthStore } from '@/stores/useAuthStore';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Verificar autenticação ao carregar a aplicação
    checkAuth();
  }, [checkAuth]);

  return <AppRoutes />;
}

export default App;