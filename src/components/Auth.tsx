import React, { useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
    import { RootState } from '../store';
    import { loginSuccess, loginFailure, clearError } from '../store/authSlice';
    import { findUserByEmail, saveUser, validatePassword } from '../services/auth';

    const Auth: React.FC = () => {
      const dispatch = useDispatch();
      const error = useSelector((state: RootState) => state.auth.error);
      const theme = useSelector((state: RootState) => state.auth.theme);
      
      const [isLogin, setIsLogin] = useState(true);
      const [isLoading, setIsLoading] = useState(false);
      const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
      });

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(clearError());

        try {
          if (isLogin) {
            const user = findUserByEmail(formData.email);
            if (!user || !validatePassword(user, formData.password)) {
              throw new Error('Invalid email or password');
            }
            dispatch(loginSuccess(user));
          } else {
            if (findUserByEmail(formData.email)) {
              throw new Error('Email already exists');
            }
            const newUser = {
              id: Date.now().toString(),
              email: formData.email,
              password: formData.password,
              name: formData.name,
            };
            saveUser(newUser);
            dispatch(loginSuccess(newUser));
          }
        } catch (err) {
          dispatch(loginFailure(err instanceof Error ? err.message : 'An error occurred'));
        } finally {
          setIsLoading(false);
        }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      };

      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-center mb-8">
              <CheckCircle2 className="w-8 h-8 text-green-500 mr-2" />
              <h1 className="text-2xl text-white font-bold">DoIt</h1>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  isLogin
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  !isLogin
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                  <XCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  <>{isLogin ? 'Login' : 'Create Account'}</>
                )}
              </button>
            </form>
          </div>
        </div>
      );
    };

    export default Auth;
