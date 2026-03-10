import { Button } from '@components/ui';
import { categories } from '@data/products';
import styles from './Categories.module.scss';

export const AdminCategories = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Categorias</h1>
          <p>Organize os produtos por categorias</p>
        </div>
        <Button>Nova categoria</Button>
      </div>

      <div className={styles.card}>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat.id} className={styles.categoryCard}>
              <img src={cat.image} alt={cat.name} className={styles.categoryImage} />
              <div className={styles.categoryInfo}>
                <h3>{cat.name}</h3>
                <span>{cat.productCount} produtos</span>
                <div className={styles.actions}>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
