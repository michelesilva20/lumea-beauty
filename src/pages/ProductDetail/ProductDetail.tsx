import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Button, 
  Breadcrumb, 
  Badge, 
  RatingStars, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanel,
  IconButton 
} from '@components/ui';
import { QuantitySelector, PriceBlock, ProductGrid } from '@components/ecommerce';
import { products } from '@data/products';
import styles from './ProductDetail.module.scss';

export const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Produto não encontrado</h1>
        <Link to="/">Voltar para Home</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: product.category, href: `/categoria/${product.categorySlug}` },
    { label: product.name },
  ];

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />

        <div className={styles.main}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                loading="eager"
              />
              {product.isNew && (
                <Badge variant="new" className={styles.badge}>Novo</Badge>
              )}
              {product.discount && (
                <Badge variant="sale" className={styles.badge}>-{product.discount}%</Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} - ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <span className={styles.brand}>{product.brand}</span>
            <h1 className={styles.name}>{product.name}</h1>
            
            <div className={styles.rating}>
              <RatingStars 
                rating={product.rating} 
                showValue 
                reviewCount={product.reviewCount} 
              />
            </div>

            <PriceBlock
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              size="lg"
              className={styles.price}
            />

            <p className={styles.shortDescription}>{product.shortDescription}</p>

            <div className={styles.tags}>
              {product.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.actions}>
              <div className={styles.quantityWrapper}>
                <label>Quantidade</label>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={10}
                />
              </div>

              <div className={styles.buttons}>
                <Button size="lg" fullWidth disabled={!product.inStock}>
                  {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                </Button>
                <IconButton variant="outline" size="lg" label="Adicionar aos favoritos">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </IconButton>
              </div>
            </div>

            {/* Shipping */}
            <div className={styles.shipping}>
              <h4>Calcular Frete</h4>
              <div className={styles.shippingForm}>
                <input type="text" placeholder="Digite seu CEP" maxLength={9} />
                <Button variant="outline">Calcular</Button>
              </div>
              <a href="https://buscacepinter.correios.com.br" target="_blank" rel="noopener noreferrer">
                Não sei meu CEP
              </a>
            </div>

            {/* Benefits */}
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Frete grátis acima de R$199</span>
              </div>
              <div className={styles.benefitItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>Troca grátis em 30 dias</span>
              </div>
              <div className={styles.benefitItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.details}>
          <Tabs defaultTab="description">
            <TabList>
              <Tab id="description">Descrição</Tab>
              <Tab id="ingredients">Ingredientes</Tab>
              <Tab id="howToUse">Como Usar</Tab>
              <Tab id="reviews">Avaliações ({product.reviewCount})</Tab>
            </TabList>

            <TabPanel id="description">
              <div className={styles.tabContent}>
                <p>{product.description}</p>
                
                <h4>Benefícios</h4>
                <ul>
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>

                <h4>Indicado para</h4>
                <p>Pele {product.skinType.join(', ')}</p>
              </div>
            </TabPanel>

            <TabPanel id="ingredients">
              <div className={styles.tabContent}>
                <h4>Ingredientes Principais</h4>
                <ul>
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </TabPanel>

            <TabPanel id="howToUse">
              <div className={styles.tabContent}>
                <p>{product.howToUse}</p>
              </div>
            </TabPanel>

            <TabPanel id="reviews">
              <div className={styles.tabContent}>
                <div className={styles.reviewsSummary}>
                  <div className={styles.reviewsOverall}>
                    <span className={styles.reviewsScore}>{product.rating.toFixed(1)}</span>
                    <RatingStars rating={product.rating} size="lg" />
                    <span className={styles.reviewsCount}>{product.reviewCount} avaliações</span>
                  </div>
                </div>

                <div className={styles.reviewsList}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <RatingStars rating={5} size="sm" />
                        <span className={styles.reviewDate}>há {i * 2} dias</span>
                      </div>
                      <h5>Excelente produto!</h5>
                      <p>Estou amando os resultados. Minha pele ficou muito mais bonita e hidratada. Super recomendo!</p>
                      <span className={styles.reviewAuthor}>Cliente verificada</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline">Ver todas as avaliações</Button>
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <h2>Produtos Relacionados</h2>
            <ProductGrid 
              products={relatedProducts} 
              columns={4}
              onAddToWishlist={(id) => console.log('Wishlist:', id)}
            />
          </section>
        )}
      </div>
    </div>
  );
};
