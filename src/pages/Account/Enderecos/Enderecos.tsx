import { useState } from 'react';
import { Button, Input, Modal } from '@components/ui';
import styles from './Enderecos.module.scss';

interface Address {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    label: 'Casa',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 42',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Trabalho',
    street: 'Av. Paulista',
    number: '1000',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: false,
  },
];

export const AccountEnderecos = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Address>>({});

  const openNew = () => {
    setEditingId(null);
    setForm({});
    setModalOpen(true);
  };

  const openEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm(addr);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } as Address : a))
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { ...form, id: String(Date.now()), isDefault: prev.length === 0 } as Address,
      ]);
    }
    setModalOpen(false);
  };

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const remove = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Endereços</h1>
        <Button onClick={openNew}>Adicionar endereço</Button>
      </div>

      <div className={styles.grid}>
        {addresses.map((addr) => (
          <div key={addr.id} className={`${styles.card} ${addr.isDefault ? styles.default : ''}`}>
            <div className={styles.cardHeader}>
              <span className={styles.label}>{addr.label}</span>
              {addr.isDefault && <span className={styles.badge}>Padrão</span>}
            </div>
            <p className={styles.address}>
              {addr.street}, {addr.number}
              {addr.complement && ` - ${addr.complement}`}
              <br />
              {addr.neighborhood}, {addr.city} - {addr.state}
              <br />
              CEP: {addr.zipCode}
            </p>
            <div className={styles.actions}>
              {!addr.isDefault && (
                <button className={styles.link} onClick={() => setDefault(addr.id)}>
                  Definir como padrão
                </button>
              )}
              <button className={styles.link} onClick={() => openEdit(addr)}>
                Editar
              </button>
              {!addr.isDefault && (
                <button className={styles.linkDanger} onClick={() => remove(addr.id)}>
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Editar endereço' : 'Novo endereço'}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Apelido (ex: Casa, Trabalho)"
            value={form.label ?? ''}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            fullWidth
            required
          />
          <div className={styles.row}>
            <Input
              label="CEP"
              value={form.zipCode ?? ''}
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
              placeholder="00000-000"
              fullWidth
              required
            />
            <Input
              label="Rua"
              value={form.street ?? ''}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              fullWidth
              required
            />
          </div>
          <div className={styles.row}>
            <Input
              label="Número"
              value={form.number ?? ''}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              fullWidth
              required
            />
            <Input
              label="Complemento"
              value={form.complement ?? ''}
              onChange={(e) => setForm({ ...form, complement: e.target.value })}
              fullWidth
            />
          </div>
          <Input
            label="Bairro"
            value={form.neighborhood ?? ''}
            onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
            fullWidth
            required
          />
          <div className={styles.row}>
            <Input
              label="Cidade"
              value={form.city ?? ''}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              fullWidth
              required
            />
            <Input
              label="Estado"
              value={form.state ?? ''}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="SP"
              fullWidth
              required
            />
          </div>
          <div className={styles.formActions}>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{editingId ? 'Salvar' : 'Adicionar'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
