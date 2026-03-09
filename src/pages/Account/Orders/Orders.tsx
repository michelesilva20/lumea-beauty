import { Link } from 'react-router-dom';
import { Badge, Tabs, TabList, Tab, TabPanel } from '@components/ui';
import styles from './Orders.module.scss';

const orders = [
  {
    id: 'LUM-2024001',
    date: '05/03/2026',
    status: 'delivered',
    statusLabel: 'Entregue',
    total: 389.90,
    items: [
      { name: 'Sérum Vitamina C Iluminador', quantity: 1, price: 189.90, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100' },
      { name: 'Hidratante Facial Ácido Hialurônico', quantity: 1, price: 159.90, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=100' },
    ],
  },
  {
    id: 'LUM-2024002',
    date: '28/02/2026',
    status: 'shipping',
    statusLabel: 'Em transporte',
    total: 189.90,
    items: [
      { name: 'Sérum Vitamina C Iluminador', quantity: 1, price: 189.90, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100' },
    ],
  },
  {
    id: 'LUM-2024003',
    date: '20/02/2026',
    status: 'delivered',
    statusLabel: 'Entregue',
    total: 99.90,
    items: [
      { name: 'Protetor Solar Facial FPS 60', quantity: 1, price: 99.90, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100' },
    ],
  },
];

export const AccountOrders = () => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipping':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderOrders = (filteredOrders: typeof orders) => (
    <div className={styles.orders}>
      {filteredOrders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <div>
              <span className={styles.orderId}>{order.id}</span>
              <span className={styles.orderDate}>{order.date}</span>
            </div>
            <Badge variant={getStatusVariant(order.status) as any}>{order.statusLabel}</Badge>
          </div>

          <div className={styles.orderItems}>
            {order.items.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemQty}>Qtd: {item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>

          <div className={styles.orderFooter}>
            <div className={styles.orderTotal}>
              <span>Total:</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
            <div className={styles.orderActions}>
              <Link to={`/conta/pedidos/${order.id}`} className={styles.orderLink}>
                Ver detalhes
              </Link>
              {order.status === 'shipping' && (
                <Link to={`/rastrear/${order.id}`} className={styles.trackLink}>
                  Rastrear pedido
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.title}>Meus Pedidos</h1>

      <Tabs defaultTab="all">
        <TabList>
          <Tab id="all">Todos ({orders.length})</Tab>
          <Tab id="shipping">Em andamento ({orders.filter(o => o.status === 'shipping').length})</Tab>
          <Tab id="delivered">Entregues ({orders.filter(o => o.status === 'delivered').length})</Tab>
        </TabList>

        <TabPanel id="all">
          {renderOrders(orders)}
        </TabPanel>

        <TabPanel id="shipping">
          {renderOrders(orders.filter(o => o.status === 'shipping'))}
        </TabPanel>

        <TabPanel id="delivered">
          {renderOrders(orders.filter(o => o.status === 'delivered'))}
        </TabPanel>
      </Tabs>
    </div>
  );
};
