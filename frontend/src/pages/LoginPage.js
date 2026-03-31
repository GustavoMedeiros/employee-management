import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" data-testid="login-page">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 
              className="text-4xl lg:text-5xl font-black tracking-tighter text-[#0A0A0A] mb-4"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              data-testid="login-title"
            >
              Bem-vindo
            </h1>
            <p className="text-[#666666] text-lg">
              Sistema de Gerenciamento de Funcionários
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] mb-3"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#002FA7] focus:border-transparent transition-all duration-200 rounded-none"
                placeholder="admin@empresa.com"
                data-testid="login-email-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label 
                htmlFor="senha" 
                className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] mb-3"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#E5E5E5] bg-white px-4 py-3 pr-12 text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#002FA7] focus:border-transparent transition-all duration-200 rounded-none"
                  placeholder="••••••••"
                  data-testid="login-password-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#666666] transition-colors"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#002FA7] text-white hover:bg-[#00227A] transition-colors duration-200 px-6 py-4 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
              data-testid="login-submit-button"
            >
              {loading ? (
                <span>Entrando...</span>
              ) : (
                <>
                  <LogIn size={20} strokeWidth={1.5} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#A3A3A3]">
              Credenciais de teste:
            </p>
            <p className="text-sm text-[#666666] mt-1">
              Email: <code className="bg-[#FAFAFA] px-2 py-0.5">admin@empresa.com</code>
            </p>
            <p className="text-sm text-[#666666]">
              Senha: <code className="bg-[#FAFAFA] px-2 py-0.5">admin123</code>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div 
        className="hidden lg:block lg:w-1/2 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/9958947/pexels-photo-9958947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'
        }}
        data-testid="login-background-image"
      >
        <div className="w-full h-full bg-gradient-to-br from-[#002FA7]/20 to-transparent" />
      </div>
    </div>
  );
}
