import { Product } from '@data/products';
import { ProductCard } from '../ProductCard';
import styles from './ProductGrid.module.scss';

export interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  onAddToWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
}

export const ProductGrid = ({
  products,
  columns = 4,
  onAddToWishlist,
  onQuickView,
  className = '',
}: ProductGridProps) => {
  return (
    <div className={`${styles.grid} ${styles[`cols${columns}`]} ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToWishlist={onAddToWishlist}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
