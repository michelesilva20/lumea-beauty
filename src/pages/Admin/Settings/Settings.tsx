import { Button, Input, Checkbox } from '@components/ui';
import styles from './Settings.module.scss';

export const AdminSettings = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Configurações</h1>
        <p>Configure as preferências da sua loja</p>
      </div>

      <div className={styles.card}>
        <h2>Informações da loja</h2>
        <div className={styles.form}>
          <Input label="Nome da loja" placeholder="Luméa Beauty" fullWidth />
          <Input label="E-mail de contato" type="email" placeholder="contato@lumea.com" fullWidth />
          <Input label="Telefone" placeholder="(11) 99999-9999" fullWidth />
        </div>
      </div>

      <div className={styles.card}>
        <h2>Frete</h2>
        <div className={styles.form}>
          <Input label="Frete grátis a partir de (R$)" placeholder="199" fullWidth />
          <Checkbox label="Oferecer frete expresso" />
        </div>
      </div>

      <div className={styles.card}>
        <h2>Pagamento</h2>
        <div className={styles.form}>
          <Checkbox label="Aceitar cartão de crédito" />
          <Checkbox label="Aceitar PIX" />
          <Checkbox label="Parcelamento em até 3x sem juros" />
        </div>
      </div>

      <Button size="lg">Salvar alterações</Button>
    </div>
  );
};
