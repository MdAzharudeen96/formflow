import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Forms from './pages/admin/Forms';
import Submissions from './pages/admin/Submissions';

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  return pathname;
}

function AppRoutes() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    function handleLinkClick(event) {
      const link = event.target.closest('a');
      if (!link || link.origin !== window.location.origin || link.target === '_blank') return;
      event.preventDefault();
      window.history.pushState({}, '', link.href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  if (pathname === '/login') {
    return isAuthenticated ? <NavigateToAdmin /> : <Login />;
  }

  const page = pathname === '/admin/forms' ? <Forms /> : pathname === '/admin/submissions' ? <Submissions /> : <Dashboard />;

  return pathname.startsWith('/admin') ? <ProtectedRoute>{page}</ProtectedRoute> : <NavigateToAdmin />;
}

function NavigateToAdmin() {
  useEffect(() => {
    window.history.replaceState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  return null;
}

function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>;
}

export default App;