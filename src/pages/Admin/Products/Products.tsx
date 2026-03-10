import { Link } from 'react-router-dom';
import { Button } from '@components/ui';
import { products } from '@data/products';
import styles from './Products.module.scss';

export const AdminProducts = () => {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Produtos</h1>
          <p>Gerencie o catálogo de produtos</p>
        </div>
        <Link to="/admin/produtos/novo">
          <Button>Novo produto</Button>
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productCell}>
                      <img src={product.images[0]} alt={product.name} className={styles.productImage} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.inStock ? 'Em estoque' : 'Esgotado'}</td>
                  <td>
                    <span className={`${styles.badge} ${product.isFeatured ? styles.featured : ''}`}>
                      {product.isFeatured ? 'Destaque' : 'Normal'}
                    </span>
                  </td>
                  <td>
                    <Link to={`/admin/produtos/${product.id}/editar`} className={styles.link}>
                      Editar
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
