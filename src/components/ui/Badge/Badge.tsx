import { ReactNode } from 'react';
import styles from './Badge.module.scss';

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'promo' | 'new' | 'sale';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

export const Badge = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}: BadgeProps) => {
  const classNames = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
};
