import { Navigate } from './Navigate';
import { useAuth } from '../context/AuthContext';

function LoadingScreen() {
  return (
    <main className="loading-screen">
      <div className="loading-mark" aria-hidden="true">F</div>
      <p>Checking your session...</p>
    </main>
  );
}

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
