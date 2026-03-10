import styles from './Customers.module.scss';

const customers = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', orders: 12, total: 1890.50 },
  { id: '2', name: 'Ana Paula Costa', email: 'ana@email.com', orders: 8, total: 1245.00 },
  { id: '3', name: 'Carla Santos', email: 'carla@email.com', orders: 5, total: 899.90 },
  { id: '4', name: 'Juliana Lima', email: 'ju@email.com', orders: 15, total: 2345.80 },
  { id: '5', name: 'Fernanda Rodrigues', email: 'fe@email.com', orders: 3, total: 456.00 },
];

export const AdminCustomers = () => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Clientes</h1>
        <p>Visualize e gerencie sua base de clientes</p>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>E-mail</th>
                <th>Pedidos</th>
                <th>Total comprado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className={styles.customerName}>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.orders}</td>
                  <td>{formatPrice(c.total)}</td>
                  <td>
                    <button type="button" className={styles.link}>Ver detalhes</button>
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
