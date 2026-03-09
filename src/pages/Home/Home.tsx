import { Link } from 'react-router-dom';
import { Button, Badge } from '@components/ui';
import { ProductCard, CategoryCard } from '@components/ecommerce';
import { products, categories } from '@data/products';
import styles from './Home.module.scss';

export const Home = () => {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Badge variant="promo" size="md">Novidades de Março</Badge>
            <h1 className={styles.heroTitle}>
              Desperte sua
              <span className={styles.heroAccent}> luminosidade</span> natural
            </h1>
            <p className={styles.heroDescription}>
              Descubra nossa nova linha de skincare com vitamina C e ácido
              hialurônico. Resultados visíveis em 14 dias.
            </p>
            <div className={styles.heroActions}>
              <Button size="lg">Explorar Coleção</Button>
              <Button variant="outline" size="lg">Descobrir Rotina</Button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800"
              alt="Produtos Luméa Beauty"
              loading="eager"
            />
            <div className={styles.heroFloat}>
              <div className={styles.floatCard}>
                <span className={styles.floatIcon}>✨</span>
                <div>
                  <strong>+50.000</strong>
                  <span>Clientes satisfeitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <div>
                <strong>Frete Grátis</strong>
                <span>Acima de R$199</span>
              </div>
            </div>
            <div className={styles.benefit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <strong>Compra Segura</strong>
                <span>Dados protegidos</span>
              </div>
            </div>
            <div className={styles.benefit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              <div>
                <strong>Troca Fácil</strong>
                <span>30 dias para trocar</span>
              </div>
            </div>
            <div className={styles.benefit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <div>
                <strong>Parcelamento</strong>
                <span>Até 3x sem juros</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore por Categoria</h2>
            <p className={styles.sectionDescription}>
              Encontre os produtos perfeitos para sua rotina de cuidados
            </p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.slice(0, 4).map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                slug={category.slug}
                image={category.image}
                productCount={category.productCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Mais Vendidos</h2>
              <p className={styles.sectionDescription}>
                Os favoritos das nossas clientes
              </p>
            </div>
            <Link to="/mais-vendidos" className={styles.sectionLink}>
              Ver todos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToWishlist={(id) => console.log('Wishlist:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className={styles.editorial}>
        <div className={styles.editorialContainer}>
          <div className={styles.editorialImage}>
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800"
              alt="Rotina de Skincare"
              loading="lazy"
            />
          </div>
          <div className={styles.editorialContent}>
            <span className={styles.editorialLabel}>Nossa Filosofia</span>
            <h2 className={styles.editorialTitle}>
              Beleza que respeita sua pele e o planeta
            </h2>
            <p className={styles.editorialText}>
              Na Luméa Beauty, acreditamos que a verdadeira beleza vem do cuidado
              consciente. Nossos produtos são desenvolvidos com ingredientes de
              alta qualidade, fórmulas veganas e embalagens sustentáveis.
            </p>
            <ul className={styles.editorialList}>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Fórmulas veganas e cruelty-free
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Ingredientes de origem sustentável
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Embalagens recicláveis
              </li>
            </ul>
            <Button variant="secondary">Conheça Nossa História</Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Em Destaque</h2>
              <p className={styles.sectionDescription}>
                Selecionados especialmente para você
              </p>
            </div>
            <Link to="/destaques" className={styles.sectionLink}>
              Ver todos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToWishlist={(id) => console.log('Wishlist:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Routine Section */}
      <section className={styles.routine}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Monte Sua Rotina</h2>
            <p className={styles.sectionDescription}>
              Passos simples para uma pele radiante
            </p>
          </div>
          <div className={styles.routineGrid}>
            <div className={styles.routineStep}>
              <span className={styles.routineNumber}>01</span>
              <h3>Limpeza</h3>
              <p>Remova impurezas com nossa água micelar ou gel de limpeza suave.</p>
              <Link to="/categoria/skincare?filtro=limpeza">Explorar</Link>
            </div>
            <div className={styles.routineStep}>
              <span className={styles.routineNumber}>02</span>
              <h3>Tratamento</h3>
              <p>Potencialize com séruns de vitamina C, retinol ou ácido hialurônico.</p>
              <Link to="/categoria/skincare?filtro=tratamento">Explorar</Link>
            </div>
            <div className={styles.routineStep}>
              <span className={styles.routineNumber}>03</span>
              <h3>Hidratação</h3>
              <p>Sele os benefícios com um hidratante adequado ao seu tipo de pele.</p>
              <Link to="/categoria/skincare?filtro=hidratacao">Explorar</Link>
            </div>
            <div className={styles.routineStep}>
              <span className={styles.routineNumber}>04</span>
              <h3>Proteção</h3>
              <p>Finalize com protetor solar para prevenir o envelhecimento precoce.</p>
              <Link to="/categoria/skincare?filtro=protecao">Explorar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div>
                <Badge variant="new" size="md">Novidades</Badge>
                <h2 className={styles.sectionTitle}>Recém-chegados</h2>
              </div>
              <Link to="/lancamentos" className={styles.sectionLink}>
                Ver todos
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
            <div className={styles.productsGrid}>
              {newProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToWishlist={(id) => console.log('Wishlist:', id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className={styles.reviews}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>O que nossas clientes dizem</h2>
            <p className={styles.sectionDescription}>
              Avaliações reais de quem já experimentou
            </p>
          </div>
          <div className={styles.reviewsGrid}>
            <div className={styles.reviewCard}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>
                "Minha pele nunca esteve tão bonita! O sérum de vitamina C fez
                milagres nas minhas manchas. Super recomendo!"
              </p>
              <div className={styles.reviewAuthor}>
                <span className={styles.reviewName}>Marina S.</span>
                <span className={styles.reviewProduct}>Sérum Vitamina C</span>
              </div>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>
                "Apaixonada pelo hidratante! Textura leve, absorve rápido e deixa
                a pele maravilhosa. Virou item obrigatório."
              </p>
              <div className={styles.reviewAuthor}>
                <span className={styles.reviewName}>Carla M.</span>
                <span className={styles.reviewProduct}>Hidratante Ácido Hialurônico</span>
              </div>
            </div>
            <div className={styles.reviewCard}>
              <div className={styles.reviewStars}>★★★★★</div>
              <p className={styles.reviewText}>
                "O protetor solar é o melhor que já usei! Não deixa a pele
                oleosa e funciona muito bem como base de maquiagem."
              </p>
              <div className={styles.reviewAuthor}>
                <span className={styles.reviewName}>Fernanda R.</span>
                <span className={styles.reviewProduct}>Protetor Solar FPS 60</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className={styles.instagram}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>@lumeabeauty</h2>
            <p className={styles.sectionDescription}>
              Siga-nos no Instagram e compartilhe sua rotina com #LumeaGlow
            </p>
          </div>
          <div className={styles.instagramGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a key={i} href="#" className={styles.instagramItem}>
                <img
                  src={`https://images.unsplash.com/photo-${1570172619644 + i * 1000}-dfd03ed5d881?w=300`}
                  alt={`Instagram post ${i}`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
