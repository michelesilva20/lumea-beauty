import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Select, Button, Drawer, Checkbox } from '@components/ui';
import { ProductGrid } from '@components/ecommerce';
import { products, categories } from '@data/products';
import styles from './Catalog.module.scss';

const sortOptions = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'newest', label: 'Mais recentes' },
  { value: 'rating', label: 'Melhor avaliados' },
];

const skinTypes = ['Normal', 'Mista', 'Oleosa', 'Seca', 'Sensível'];
const benefits = ['Hidratação', 'Anti-idade', 'Iluminação', 'Controle de oleosidade', 'Limpeza'];
const priceRanges = [
  { value: '0-100', label: 'Até R$100' },
  { value: '100-200', label: 'R$100 - R$200' },
  { value: '200-300', label: 'R$200 - R$300' },
  { value: '300+', label: 'Acima de R$300' },
];

export const Catalog = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const category = categories.find((c) => c.slug === slug);
  const categoryName = category?.name || 'Todos os Produtos';
  const categoryDescription = category?.description || 'Explore nossa coleção completa';

  const filteredProducts = products.filter((p) => {
    if (slug && p.categorySlug !== slug) return false;
    if (selectedSkinTypes.length > 0) {
      if (!p.skinType.some((st) => selectedSkinTypes.includes(st))) return false;
    }
    return true;
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: categoryName },
  ];

  const toggleFilter = (value: string, selected: string[], setSelected: (v: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const FiltersContent = () => (
    <div className={styles.filtersContent}>
      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Tipo de Pele</h4>
        <div className={styles.filterOptions}>
          {skinTypes.map((type) => (
            <Checkbox
              key={type}
              label={type}
              checked={selectedSkinTypes.includes(type)}
              onChange={() => toggleFilter(type, selectedSkinTypes, setSelectedSkinTypes)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Benefícios</h4>
        <div className={styles.filterOptions}>
          {benefits.map((benefit) => (
            <Checkbox
              key={benefit}
              label={benefit}
              checked={selectedBenefits.includes(benefit)}
              onChange={() => toggleFilter(benefit, selectedBenefits, setSelectedBenefits)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Faixa de Preço</h4>
        <div className={styles.filterOptions}>
          {priceRanges.map((range) => (
            <Checkbox key={range.value} label={range.label} />
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4 className={styles.filterTitle}>Avaliação</h4>
        <div className={styles.filterOptions}>
          {[5, 4, 3].map((rating) => (
            <Checkbox key={rating} label={`${rating} estrelas ou mais`} />
          ))}
        </div>
      </div>

      <Button variant="ghost" fullWidth onClick={() => {
        setSelectedSkinTypes([]);
        setSelectedBenefits([]);
      }}>
        Limpar filtros
      </Button>
    </div>
  );

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} />

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>{categoryName}</h1>
            <p className={styles.description}>{categoryDescription}</p>
          </div>
        </header>

        <div className={styles.toolbar}>
          <p className={styles.resultCount}>
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          <div className={styles.toolbarActions}>
            <Button
              variant="outline"
              className={styles.filterButton}
              onClick={() => setFiltersOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              Filtrar
            </Button>

            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            />
          </div>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Filtros</h3>
            <FiltersContent />
          </aside>

          <div className={styles.products}>
            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                columns={3}
                onAddToWishlist={(id) => console.log('Wishlist:', id)}
              />
            ) : (
              <div className={styles.empty}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros ou explore outras categorias.</p>
                <Button onClick={() => {
                  setSelectedSkinTypes([]);
                  setSelectedBenefits([]);
                }}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Drawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        position="left"
        title="Filtros"
        footer={
          <div className={styles.drawerFooter}>
            <Button variant="outline" fullWidth onClick={() => setFiltersOpen(false)}>
              Cancelar
            </Button>
            <Button fullWidth onClick={() => setFiltersOpen(false)}>
              Aplicar
            </Button>
          </div>
        }
      >
        <FiltersContent />
      </Drawer>
    </div>
  );
};
