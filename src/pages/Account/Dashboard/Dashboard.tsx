import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import styles from './Dashboard.module.scss';

const recentOrders = [
  {
    id: 'LUM-2024001',
    date: '05/03/2026',
    status: 'Entregue',
    total: 389.90,
    items: 3,
  },
  {
    id: 'LUM-2024002',
    date: '28/02/2026',
    status: 'Em transporte',
    total: 189.90,
    items: 1,
  },
];

const quickLinks = [
  { name: 'Rastrear Pedido', href: '/conta/pedidos', icon: '📦' },
  { name: 'Editar Endereço', href: '/conta/enderecos', icon: '📍' },
  { name: 'Favoritos', href: '/conta/favoritos', icon: '❤️' },
  { name: 'Cupons', href: '/conta/cupons', icon: '🏷️' },
];

export const AccountDashboard = () => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Entregue':
        return styles.statusDelivered;
      case 'Em transporte':
        return styles.statusShipping;
      case 'Processando':
        return styles.statusProcessing;
      default:
        return '';
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Olá, Maria!</h1>
        <p>Bem-vinda de volta. Aqui está um resumo da sua conta.</p>
      </div>

      <div className={styles.quickLinks}>
        {quickLinks.map((link) => (
          <Link key={link.name} to={link.href} className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Pedidos Recentes</h2>
          <Link to="/conta/pedidos" className={styles.sectionLink}>
            Ver todos
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className={styles.orders}>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className={styles.orderDetails}>
                  <div>
                    <span className={styles.orderLabel}>Data</span>
                    <span>{order.date}</span>
                  </div>
                  <div>
                    <span className={styles.orderLabel}>Itens</span>
                    <span>{order.items}</span>
                  </div>
                  <div>
                    <span className={styles.orderLabel}>Total</span>
                    <span className={styles.orderTotal}>{formatPrice(order.total)}</span>
                  </div>
                </div>
                <Link to={`/conta/pedidos/${order.id}`} className={styles.orderLink}>
                  Ver detalhes
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Você ainda não tem pedidos.</p>
            <Button>Começar a Comprar</Button>
          </div>
        )}
      </section>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h3>Endereço Principal</h3>
          <p>
            Rua das Flores, 123<br />
            Jardim Primavera<br />
            São Paulo - SP<br />
            01234-567
          </p>
          <Link to="/conta/enderecos" className={styles.cardLink}>
            Gerenciar endereços
          </Link>
        </section>

        <section className={styles.card}>
          <h3>Dados da Conta</h3>
          <p>
            Maria Silva<br />
            maria@email.com<br />
            (11) 99999-9999
          </p>
          <Link to="/conta/dados" className={styles.cardLink}>
            Editar dados
          </Link>
        </section>
      </div>
    </div>
  );
};
