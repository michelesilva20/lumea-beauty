import styles from './QuantitySelector.module.scss';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className = '',
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={`${styles.selector} ${styles[size]} ${className}`}>
      <button
        type="button"
        className={styles.button}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        className={styles.input}
        aria-label="Quantidade"
      />
      <button
        type="button"
        className={styles.button}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
};
