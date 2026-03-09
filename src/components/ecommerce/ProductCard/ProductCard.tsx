import { Link } from 'react-router-dom';
import { Badge, RatingStars, IconButton } from '@components/ui';
import { Product } from '@data/products';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  product: Product;
  onAddToWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
}

export const ProductCard = ({
  product,
  onAddToWishlist,
  onQuickView,
  className = '',
}: ProductCardProps) => {
  const {
    id,
    name,
    slug,
    brand,
    price,
    originalPrice,
    discount,
    images,
    rating,
    reviewCount,
    isNew,
    isBestSeller,
    inStock,
  } = product;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <article className={`${styles.card} ${className}`}>
      <Link to={`/produto/${slug}`} className={styles.imageWrapper}>
        <img src={images[0]} alt={name} className={styles.image} loading="lazy" />
        
        <div className={styles.badges}>
          {isNew && <Badge variant="new" size="sm">Novo</Badge>}
          {isBestSeller && <Badge variant="promo" size="sm">Best Seller</Badge>}
          {discount && <Badge variant="sale" size="sm">-{discount}%</Badge>}
        </div>

        <div className={styles.actions}>
          {onAddToWishlist && (
            <IconButton
              variant="default"
              size="sm"
              label="Adicionar aos favoritos"
              onClick={(e) => {
                e.preventDefault();
                onAddToWishlist(id);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </IconButton>
          )}
          {onQuickView && (
            <IconButton
              variant="default"
              size="sm"
              label="Visualização rápida"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(id);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </IconButton>
          )}
        </div>

        {!inStock && (
          <div className={styles.outOfStock}>
            <span>Esgotado</span>
          </div>
        )}
      </Link>

      <div className={styles.content}>
        <span className={styles.brand}>{brand}</span>
        <Link to={`/produto/${slug}`} className={styles.name}>
          {name}
        </Link>
        
        <RatingStars rating={rating} size="sm" reviewCount={reviewCount} />

        <div className={styles.priceWrapper}>
          {originalPrice && (
            <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
          )}
          <span className={styles.price}>{formatPrice(price)}</span>
        </div>

        <span className={styles.installments}>
          ou 3x de {formatPrice(price / 3)} sem juros
        </span>
      </div>
    </article>
  );
};
