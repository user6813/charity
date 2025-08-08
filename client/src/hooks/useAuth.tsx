import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isLoggedIn: boolean;
  user: null | { email: string };
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    return { isLoggedIn: loggedIn, user: null };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.removeItem('loggedIn');
    }
  }, [auth.isLoggedIn]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    // Simulate login (replace with real logic)
    await new Promise(res => setTimeout(res, 700));
    if (email && password) {
      setAuth({ isLoggedIn: true, user: { email } });
      localStorage.setItem('loggedIn', 'true');
    } else {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    // Simulate signup (replace with real logic)
    await new Promise(res => setTimeout(res, 700));
    if (email && password) {
      setAuth({ isLoggedIn: true, user: { email } });
      localStorage.setItem('loggedIn', 'true');
    } else {
      setError('Signup failed');
    }
    setLoading(false);
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
    localStorage.removeItem('loggedIn');
    navigate('/auth');
  };

  return { ...auth, loading, error, login, signup, logout };
};
