import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Checkbox } from '@components/ui';
import { useAuth } from '@contexts/AuthContext';
import styles from './Login.module.scss';

type AuthMode = 'login' | 'register' | 'forgot';

export const Login = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/';

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/admin' : '/conta', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = login(email.trim(), password);

    if (result.success && result.user) {
      if (result.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from.startsWith('/admin') ? '/conta' : from, { replace: true });
      }
    } else {
      setError(result.error || 'E-mail ou senha incorretos.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.card}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>Luméa</span>
            <span className={styles.logoAccent}>Beauty</span>
          </Link>

          {mode === 'login' && (
            <>
              <h1 className={styles.title}>Entrar na sua conta</h1>
              <p className={styles.subtitle}>
                Bem-vinda de volta! Acesse sua conta para continuar.
              </p>

              <div className={styles.demoHint}>
                <strong>Usuários demo:</strong>
                <ul>
                  <li><kbd>cliente@lumea.com</kbd> / <kbd>cliente123</kbd> → Área do cliente</li>
                  <li><kbd>admin@lumea.com</kbd> / <kbd>admin123</kbd> → Painel admin</li>
                </ul>
              </div>

              <form className={styles.form} onSubmit={handleLoginSubmit}>
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                />

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.formRow}>
                  <Checkbox label="Lembrar de mim" />
                  <button
                    type="button"
                    className={styles.link}
                    onClick={() => setMode('forgot')}
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <Button type="submit" size="lg" fullWidth loading={isSubmitting} disabled={isSubmitting}>
                  Entrar
                </Button>
              </form>

              <div className={styles.divider}>
                <span>ou continue com</span>
              </div>

              <div className={styles.social}>
                <button type="button" className={styles.socialButton}>
                  <svg viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button type="button" className={styles.socialButton}>
                  <svg viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>

              <p className={styles.footer}>
                Não tem uma conta?{' '}
                <button type="button" className={styles.link} onClick={() => setMode('register')}>
                  Criar conta
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <h1 className={styles.title}>Criar sua conta</h1>
              <p className={styles.subtitle}>
                Junte-se a nós e aproveite benefícios exclusivos.
              </p>

              <form className={styles.form}>
                <Input label="Nome completo" type="text" placeholder="Seu nome" fullWidth />
                <Input label="E-mail" type="email" placeholder="seu@email.com" fullWidth />
                <Input label="Senha" type="password" placeholder="Mínimo 8 caracteres" fullWidth hint="Use letras, números e caracteres especiais" />
                <Input label="Confirmar senha" type="password" placeholder="Confirme sua senha" fullWidth />
                <Checkbox label="Li e aceito os Termos de Uso e Política de Privacidade" />
                <Checkbox label="Quero receber novidades e ofertas exclusivas por e-mail" />
                <Button type="submit" size="lg" fullWidth>
                  Criar Conta
                </Button>
              </form>

              <p className={styles.footer}>
                Já tem uma conta?{' '}
                <button type="button" className={styles.link} onClick={() => setMode('login')}>
                  Entrar
                </button>
              </p>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <h1 className={styles.title}>Recuperar senha</h1>
              <p className={styles.subtitle}>
                Digite seu e-mail e enviaremos um link para redefinir sua senha.
              </p>

              <form className={styles.form}>
                <Input label="E-mail" type="email" placeholder="seu@email.com" fullWidth />
                <Button type="submit" size="lg" fullWidth>
                  Enviar Link
                </Button>
              </form>

              <p className={styles.footer}>
                Lembrou a senha?{' '}
                <button type="button" className={styles.link} onClick={() => setMode('login')}>
                  Voltar ao login
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      <div className={styles.image}>
        <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200" alt="Luméa Beauty" />
        <div className={styles.imageOverlay}>
          <h2>Beleza que inspira confiança</h2>
          <p>Descubra produtos premium para sua rotina de cuidados</p>
        </div>
      </div>
    </div>
  );
};
