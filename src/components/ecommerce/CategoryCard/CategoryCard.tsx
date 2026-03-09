import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

export interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
  className?: string;
}

export const CategoryCard = ({
  name,
  slug,
  image,
  productCount,
  className = '',
}: CategoryCardProps) => {
  return (
    <Link to={`/categoria/${slug}`} className={`${styles.card} ${className}`}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
        <div className={styles.overlay} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        {productCount !== undefined && (
          <span className={styles.count}>{productCount} produtos</span>
        )}
      </div>
    </Link>
  );
};
