import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmptyState } from '@components/ui';
import { ProductGrid } from '@components/ecommerce';
import { products } from '@data/products';
import styles from './Wishlist.module.scss';

export const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState(['1', '3', '5', '8']);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((ids) => ids.filter((id) => id !== productId));
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className={styles.wishlist}>
        <div className={styles.container}>
          <h1 className={styles.title}>Meus Favoritos</h1>
          <EmptyState
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            }
            title="Sua lista de favoritos está vazia"
            description="Salve seus produtos preferidos para encontrá-los facilmente depois."
            actionLabel="Explorar Produtos"
            onAction={() => window.location.href = '/'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wishlist}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meus Favoritos</h1>
          <p className={styles.count}>{wishlistProducts.length} produto{wishlistProducts.length !== 1 ? 's' : ''}</p>
        </div>

        <ProductGrid
          products={wishlistProducts}
          columns={4}
          onAddToWishlist={removeFromWishlist}
        />

        <div className={styles.actions}>
          <Button variant="outline" size="lg">
            Adicionar Todos ao Carrinho
          </Button>
          <Link to="/" className={styles.continueLink}>
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};
