import { useState } from 'react';
import { Button, Input } from '@components/ui';
import styles from './Cupons.module.scss';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  minOrder?: number;
  validUntil: string;
  isUsed?: boolean;
}

const mockCoupons: Coupon[] = [
  { id: '1', code: 'BEMVINDA15', discount: '15%', minOrder: 150, validUntil: '31/12/2026' },
  { id: '2', code: 'FRETE50', discount: 'R$ 50', minOrder: 300, validUntil: '15/04/2026', isUsed: true },
  { id: '3', code: 'LUMEA10', discount: '10%', validUntil: '30/06/2026' },
];

export const AccountCupons = () => {
  const [coupons] = useState<Coupon[]>(mockCoupons);
  const [newCode, setNewCode] = useState('');
  const [message, setMessage] = useState('');

  const validCoupons = coupons.filter((c) => !c.isUsed);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setMessage('Cupom aplicado com sucesso!');
    setNewCode('');
  };

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Meus Cupons</h1>

      <form onSubmit={handleAddCoupon} className={styles.addForm}>
        <Input
          placeholder="Digite o código do cupom"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value.toUpperCase())}
          fullWidth
        />
        <Button type="submit">Aplicar cupom</Button>
      </form>

      {message && <p className={styles.message}>{message}</p>}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cupons disponíveis</h2>
        {validCoupons.length > 0 ? (
          <div className={styles.grid}>
            {validCoupons.map((coupon) => (
              <div key={coupon.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.discount}>{coupon.discount}</span>
                  <span className={styles.code}>{coupon.code}</span>
                </div>
                <p className={styles.details}>
                  {coupon.minOrder && (
                    <>
                      Compra mínima de {formatPrice(coupon.minOrder)}
                      <br />
                    </>
                  )}
                  Válido até {coupon.validUntil}
                </p>
                <Button variant="outline" size="sm" className={styles.copyBtn}>
                  Copiar código
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nenhum cupom disponível no momento.</p>
        )}
      </section>

      {coupons.some((c) => c.isUsed) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cupons utilizados</h2>
          <div className={styles.grid}>
            {coupons
              .filter((c) => c.isUsed)
              .map((coupon) => (
                <div key={coupon.id} className={`${styles.card} ${styles.used}`}>
                  <span className={styles.code}>{coupon.code}</span>
                  <span className={styles.badge}>Utilizado</span>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};
