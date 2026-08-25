import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, loginRequest, logoutRequest } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('formflow_token');

    if (!token) {
      setIsLoading(false);
      return;
    }

    getCurrentUser()
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('formflow_token');
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(credentials) {
    const response = await loginRequest(credentials);
    localStorage.setItem('formflow_token', response.data.token);
    setUser(response.data.user);
    return response;
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem('formflow_token');
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
