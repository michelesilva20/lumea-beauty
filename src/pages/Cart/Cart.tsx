import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, EmptyState } from '@components/ui';
import { QuantitySelector, ProductCard } from '@components/ecommerce';
import { products } from '@data/products';
import styles from './Cart.module.scss';

interface CartItem {
  productId: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { productId: '1', quantity: 2 },
  { productId: '2', quantity: 1 },
  { productId: '6', quantity: 1 },
];

export const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  })).filter((item) => item.product);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 199 ? 0 : 19.90;
  const total = subtotal - discount + shipping;

  const recommendedProducts = products.filter(
    (p) => !cartItems.some((item) => item.productId === p.id)
  ).slice(0, 4);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'LUMEA10') {
      setAppliedCoupon(couponCode);
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.container}>
          <h1 className={styles.title}>Carrinho</h1>
          <EmptyState
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
            title="Seu carrinho está vazio"
            description="Explore nossa loja e encontre os produtos perfeitos para sua rotina de cuidados."
            actionLabel="Continuar Comprando"
            onAction={() => window.location.href = '/'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <h1 className={styles.title}>Carrinho ({cartProducts.length} itens)</h1>

        <div className={styles.content}>
          <div className={styles.items}>
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.id} className={styles.item}>
                <Link to={`/produto/${product.slug}`} className={styles.itemImage}>
                  <img src={product.images[0]} alt={product.name} />
                </Link>

                <div className={styles.itemInfo}>
                  <span className={styles.itemBrand}>{product.brand}</span>
                  <Link to={`/produto/${product.slug}`} className={styles.itemName}>
                    {product.name}
                  </Link>
                  
                  <div className={styles.itemPricing}>
                    {product.originalPrice && (
                      <span className={styles.itemOriginalPrice}>
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <span className={styles.itemPrice}>{formatPrice(product.price)}</span>
                  </div>
                </div>

                <div className={styles.itemActions}>
                  <QuantitySelector
                    value={quantity}
                    onChange={(q) => updateQuantity(product.id, q)}
                    size="sm"
                  />
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(product.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Remover
                  </button>
                </div>

                <span className={styles.itemTotal}>
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}

            <div className={styles.couponSection}>
              <h3>Cupom de desconto</h3>
              <div className={styles.couponForm}>
                <Input
                  placeholder="Digite seu cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline" onClick={applyCoupon}>
                  Aplicar
                </Button>
              </div>
              {appliedCoupon && (
                <p className={styles.couponApplied}>
                  Cupom "{appliedCoupon}" aplicado! 10% de desconto
                </p>
              )}
              <p className={styles.couponHint}>Teste: LUMEA10</p>
            </div>
          </div>

          <aside className={styles.summary}>
            <h2>Resumo do Pedido</h2>

            <div className={styles.summaryLines}>
              <div className={styles.summaryLine}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {appliedCoupon && (
                <div className={`${styles.summaryLine} ${styles.discount}`}>
                  <span>Desconto (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className={styles.summaryLine}>
                <span>Frete</span>
                <span className={shipping === 0 ? styles.free : ''}>
                  {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                </span>
              </div>

              {subtotal < 199 && (
                <p className={styles.freeShippingHint}>
                  Faltam {formatPrice(199 - subtotal)} para frete grátis!
                </p>
              )}
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <div>
                <span className={styles.totalValue}>{formatPrice(total)}</span>
                <span className={styles.installments}>
                  ou 3x de {formatPrice(total / 3)}
                </span>
              </div>
            </div>

            <Button size="lg" fullWidth>
              Finalizar Compra
            </Button>

            <Link to="/" className={styles.continueLink}>
              Continuar Comprando
            </Link>

            <div className={styles.guarantees}>
              <div className={styles.guarantee}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Compra Segura</span>
              </div>
              <div className={styles.guarantee}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>Troca em 30 dias</span>
              </div>
            </div>
          </aside>
        </div>

        {recommendedProducts.length > 0 && (
          <section className={styles.recommendations}>
            <h2>Complete sua compra</h2>
            <div className={styles.recommendationsGrid}>
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
