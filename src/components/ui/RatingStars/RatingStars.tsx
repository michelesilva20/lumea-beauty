import styles from './RatingStars.module.scss';

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  interactive = false,
  onChange,
  className = '',
}: RatingStarsProps) => {
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
    
    return (
      <button
        key={index}
        type="button"
        className={`${styles.star} ${interactive ? styles.interactive : ''}`}
        onClick={() => handleClick(index)}
        disabled={!interactive}
        aria-label={`${index + 1} estrela${index > 0 ? 's' : ''}`}
      >
        <svg viewBox="0 0 24 24" className={styles.starBg}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={styles.starFill}
          style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    );
  });

  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      <div className={styles.stars}>{stars}</div>
      {showValue && <span className={styles.value}>{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className={styles.count}>({reviewCount})</span>
      )}
    </div>
  );
};
