import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';

const stats = [
  { label: 'Receita Hoje', value: 'R$ 4.589,90', change: '+12.5%', positive: true, icon: '💰' },
  { label: 'Pedidos Hoje', value: '23', change: '+8.2%', positive: true, icon: '📦' },
  { label: 'Ticket Médio', value: 'R$ 199,56', change: '-2.1%', positive: false, icon: '🎫' },
  { label: 'Conversão', value: '3.2%', change: '+0.5%', positive: true, icon: '📈' },
];

const recentOrders = [
  { id: 'LUM-2024005', customer: 'Ana Paula', total: 289.90, status: 'Pago', date: '09/03/2026 14:32' },
  { id: 'LUM-2024004', customer: 'Carla Santos', total: 189.90, status: 'Enviado', date: '09/03/2026 12:15' },
  { id: 'LUM-2024003', customer: 'Juliana Lima', total: 459.90, status: 'Pago', date: '09/03/2026 10:45' },
  { id: 'LUM-2024002', customer: 'Marina Silva', total: 129.90, status: 'Enviado', date: '08/03/2026 18:22' },
  { id: 'LUM-2024001', customer: 'Fernanda Costa', total: 399.90, status: 'Entregue', date: '08/03/2026 15:10' },
];

const topProducts = [
  { name: 'Sérum Vitamina C Iluminador', sales: 156, revenue: 29621.40 },
  { name: 'Hidratante Facial Ácido Hialurônico', sales: 134, revenue: 21426.60 },
  { name: 'Protetor Solar Facial FPS 60', sales: 198, revenue: 19780.20 },
  { name: 'Kit Rotina Completa Glow', sales: 67, revenue: 26793.30 },
  { name: 'Óleo Corporal Nutritivo Rose Gold', sales: 89, revenue: 11561.10 },
];

const lowStock = [
  { name: 'Máscara Facial Detox Argila Verde', stock: 5 },
  { name: 'Creme para Olhos Retinol Noturno', stock: 8 },
  { name: 'Água Micelar Suave', stock: 12 },
];

export const AdminDashboard = () => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pago': return styles.statusPaid;
      case 'Enviado': return styles.statusShipped;
      case 'Entregue': return styles.statusDelivered;
      default: return '';
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Bem-vindo de volta! Aqui está o resumo da sua loja.</p>
        </div>
        <div className={styles.dateRange}>
          <span>Hoje, 09 de Março de 2026</span>
        </div>
      </div>

      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Pedidos Recentes</h2>
            <Link to="/admin/pedidos">Ver todos</Link>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.orderId}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.date}>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className={styles.sideCards}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Top Produtos</h2>
              <Link to="/admin/produtos">Ver todos</Link>
            </div>
            <div className={styles.productList}>
              {topProducts.map((product, index) => (
                <div key={product.name} className={styles.productItem}>
                  <span className={styles.productRank}>{index + 1}</span>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productSales}>{product.sales} vendas</span>
                  </div>
                  <span className={styles.productRevenue}>{formatPrice(product.revenue)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Alerta de Estoque</h2>
              <Link to="/admin/produtos?filter=low-stock">Ver todos</Link>
            </div>
            <div className={styles.stockList}>
              {lowStock.map((item) => (
                <div key={item.name} className={styles.stockItem}>
                  <span className={styles.stockName}>{item.name}</span>
                  <span className={styles.stockCount}>{item.stock} un.</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
