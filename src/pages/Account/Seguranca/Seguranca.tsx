import { useState } from 'react';
import { Button, Input } from '@components/ui';
import styles from './Seguranca.module.scss';

export const AccountSeguranca = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.newPassword !== form.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    // Em produção, enviaria para API
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Alterar Senha</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Senha atual"
          type="password"
          value={form.currentPassword}
          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          fullWidth
          required
        />
        <Input
          label="Nova senha"
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          fullWidth
          required
          hint="Mínimo de 6 caracteres"
        />
        <Input
          label="Confirmar nova senha"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          fullWidth
          required
          error={error}
        />
        <div className={styles.actions}>
          <Button type="submit">Alterar senha</Button>
        </div>
      </form>
    </div>
  );
};
