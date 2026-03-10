import { useState } from 'react';
import { Button, Input, Modal } from '@components/ui';
import styles from './Pagamento.module.scss';

interface Card {
  id: string;
  brand: string;
  lastFour: string;
  holder: string;
  isDefault: boolean;
}

const mockCards: Card[] = [
  { id: '1', brand: 'Visa', lastFour: '4242', holder: 'MARIA SILVA', isDefault: true },
  { id: '2', brand: 'Mastercard', lastFour: '5555', holder: 'MARIA SILVA', isDefault: false },
];

export const AccountPagamento = () => {
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ number: '', holder: '', expiry: '', cvv: '' });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const lastFour = form.number.slice(-4);
    setCards((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        brand: form.number.startsWith('4') ? 'Visa' : 'Mastercard',
        lastFour,
        holder: form.holder,
        isDefault: prev.length === 0,
      },
    ]);
    setForm({ number: '', holder: '', expiry: '', cvv: '' });
    setModalOpen(false);
  };

  const setDefault = (id: string) => {
    setCards((prev) =>
      prev.map((c) => ({ ...c, isDefault: c.id === id }))
    );
  };

  const remove = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Métodos de Pagamento</h1>
        <Button onClick={() => setModalOpen(true)}>Adicionar cartão</Button>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <div key={card.id} className={`${styles.card} ${card.isDefault ? styles.default : ''}`}>
            <div className={styles.cardHeader}>
              <span className={styles.brand}>{card.brand}</span>
              {card.isDefault && <span className={styles.badge}>Padrão</span>}
            </div>
            <p className={styles.cardNumber}>**** **** **** {card.lastFour}</p>
            <p className={styles.holder}>{card.holder}</p>
            <div className={styles.actions}>
              {!card.isDefault && (
                <button className={styles.link} onClick={() => setDefault(card.id)}>
                  Definir como padrão
                </button>
              )}
              <button className={styles.linkDanger} onClick={() => remove(card.id)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Adicionar cartão" size="md">
        <form onSubmit={handleAddCard} className={styles.form}>
          <Input
            label="Número do cartão"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value.replace(/\D/g, '').slice(0, 16) })}
            placeholder="0000 0000 0000 0000"
            fullWidth
            required
          />
          <Input
            label="Nome no cartão"
            value={form.holder}
            onChange={(e) => setForm({ ...form, holder: e.target.value.toUpperCase() })}
            fullWidth
            required
          />
          <div className={styles.row}>
            <Input
              label="Validade"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              placeholder="MM/AA"
              fullWidth
              required
            />
            <Input
              label="CVV"
              type="password"
              value={form.cvv}
              onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              placeholder="123"
              fullWidth
              required
            />
          </div>
          <div className={styles.formActions}>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
