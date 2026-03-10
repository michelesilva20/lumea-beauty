import { Button } from '@components/ui';
import styles from './Coupons.module.scss';

const coupons = [
  { code: 'LUMEA10', discount: '10%', minOrder: 100, uses: 324, limit: 500 },
  { code: 'PRIMEIRACOMPRA', discount: '15%', minOrder: 0, uses: 189, limit: 1000 },
  { code: 'FRETEGRATIS', discount: 'Frete grátis', minOrder: 199, uses: 456, limit: null },
];

export const AdminCoupons = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Cupons</h1>
          <p>Crie e gerencie cupons de desconto</p>
        </div>
        <Button>Novo cupom</Button>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Desconto</th>
                <th>Pedido mín.</th>
                <th>Usos</th>
                <th>Limite</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code}>
                  <td className={styles.code}>{c.code}</td>
                  <td>{c.discount}</td>
                  <td>{c.minOrder ? `R$ ${c.minOrder}` : '-'}</td>
                  <td>{c.uses}</td>
                  <td>{c.limit ?? 'Ilimitado'}</td>
                  <td>
                    <button type="button" className={styles.link}>Editar</button>
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
