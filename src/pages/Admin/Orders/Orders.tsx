import { Link } from 'react-router-dom';
import styles from './Orders.module.scss';

const orders = [
  { id: 'LUM-2024005', customer: 'Ana Paula', total: 289.90, status: 'Pago', date: '09/03/2026 14:32' },
  { id: 'LUM-2024004', customer: 'Carla Santos', total: 189.90, status: 'Enviado', date: '09/03/2026 12:15' },
  { id: 'LUM-2024003', customer: 'Juliana Lima', total: 459.90, status: 'Pago', date: '09/03/2026 10:45' },
  { id: 'LUM-2024002', customer: 'Marina Silva', total: 129.90, status: 'Enviado', date: '08/03/2026 18:22' },
  { id: 'LUM-2024001', customer: 'Fernanda Costa', total: 399.90, status: 'Entregue', date: '08/03/2026 15:10' },
];

export const AdminOrders = () => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pago': return styles.statusPaid;
      case 'Enviado': return styles.statusShipped;
      case 'Entregue': return styles.statusDelivered;
      default: return '';
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Pedidos</h1>
        <p>Gerencie todos os pedidos da loja</p>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Status</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
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
                  <td>
                    <Link to={`/admin/pedidos/${order.id}`} className={styles.link}>
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
