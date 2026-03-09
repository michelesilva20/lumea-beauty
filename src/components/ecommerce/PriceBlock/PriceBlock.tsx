import styles from './PriceBlock.module.scss';

export interface PriceBlockProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: 'sm' | 'md' | 'lg';
  showInstallments?: boolean;
  installments?: number;
  className?: string;
}

export const PriceBlock = ({
  price,
  originalPrice,
  discount,
  size = 'md',
  showInstallments = true,
  installments = 3,
  className = '',
}: PriceBlockProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const installmentValue = price / installments;

  return (
    <div className={`${styles.priceBlock} ${styles[size]} ${className}`}>
      {originalPrice && (
        <div className={styles.originalWrapper}>
          <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
          {discount && <span className={styles.discount}>-{discount}%</span>}
        </div>
      )}
      <span className={styles.price}>{formatPrice(price)}</span>
      {showInstallments && (
        <span className={styles.installments}>
          ou {installments}x de {formatPrice(installmentValue)} sem juros
        </span>
      )}
    </div>
  );
};
