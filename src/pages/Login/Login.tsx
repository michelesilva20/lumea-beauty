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
