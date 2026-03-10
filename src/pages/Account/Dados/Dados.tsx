import { useState } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { Button, Input } from '@components/ui';
import styles from './Dados.module.scss';

export const AccountDados = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? 'Maria Silva',
    email: user?.email ?? 'cliente@lumea.com',
    phone: '(11) 98765-4321',
    birthDate: '1990-05-15',
    cpf: '123.456.789-00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção, enviaria para API
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dados Pessoais</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nome completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
          required
        />
        <Input
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
          required
        />
        <div className={styles.row}>
          <Input
            label="Telefone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(00) 00000-0000"
            fullWidth
          />
          <Input
            label="Data de nascimento"
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            fullWidth
          />
        </div>
        <Input
          label="CPF"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
          placeholder="000.000.000-00"
          fullWidth
          hint="Utilizado apenas para emissão de notas fiscais"
        />
        <div className={styles.actions}>
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </div>
  );
};
