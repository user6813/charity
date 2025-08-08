import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, loading, error, login, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    // If error is set, show alert (will not redirect due to isLoggedIn remaining false)
    if (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white shadow-lg rounded px-8 py-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l font-semibold ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('login')}
            disabled={mode === 'login'}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-r font-semibold ${mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('signup')}
            disabled={mode === 'signup'}
          >
            Sign Up
          </button>
        </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              disabled={loading}
            >
              {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
            </button>
          </form>
      </div>
    </div>
  );
};

export default Auth;