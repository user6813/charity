import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_API, SIGNUP_API } from '../constants/api';
import type { GlobalResponse } from '../types/global';
import { toast } from 'react-toastify';

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
    try {
      const response = await axios.post<GlobalResponse<{ email: string }>>(LOGIN_API, { email, password });
      if (response.data.success && response.data.data) {
        setAuth({ isLoggedIn: true, user: { email: response.data.data.email } });
        localStorage.setItem('loggedIn', 'true');
        setError(null);
        toast.success('Login successful!');
      } else {
        setError(response.data.message || 'Login failed');
        toast.error(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login error');
      toast.error(err.response?.data?.message || err.message || 'Login error');
    }
    setLoading(false);
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<GlobalResponse<{ email: string }>>(SIGNUP_API, { email, password });
      if (response.data.success && response.data.data) {
        setAuth({ isLoggedIn: true, user: { email: response.data.data.email } });
        localStorage.setItem('loggedIn', 'true');
        setError(null);
        toast.success('Sign up successful!');
      } else {
        setError(response.data.message || 'Sign up failed');
        toast.error(response.data.message || 'Sign up failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Sign up error');
      toast.error(err.response?.data?.message || err.message || 'Sign up error');
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
