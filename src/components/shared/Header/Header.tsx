import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconButton, Drawer } from '@components/ui';
import { useAuth } from '@contexts/AuthContext';
import styles from './Header.module.scss';

const navigation = [
  { name: 'Skincare', href: '/categoria/skincare' },
  { name: 'Body Care', href: '/categoria/body-care' },
  { name: 'Maquiagem', href: '/categoria/maquiagem' },
  { name: 'Cabelos', href: '/categoria/cabelos' },
  { name: 'Kits', href: '/categoria/kits' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const cartItemsCount = 3;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.container}>
            <span>Frete grátis acima de R$199 | Até 3x sem juros</span>
          </div>
        </div>

        <div className={styles.mainHeader}>
          <div className={styles.container}>
            <button
              className={styles.menuButton}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <Link to="/" className={styles.logo}>
              <span className={styles.logoText}>Luméa</span>
              <span className={styles.logoAccent}>Beauty</span>
            </Link>

            <nav className={styles.nav}>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className={styles.actions}>
              <IconButton
                variant="ghost"
                label="Buscar"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </IconButton>

              <Link
                to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/conta') : '/login'}
                className={styles.iconLink}
              >
                <span className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
              </Link>

              <Link to="/favoritos" className={styles.iconLink}>
                <span className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </span>
              </Link>

              <Link to="/carrinho" className={styles.cartLink}>
                <span className={styles.iconWrapper}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </span>
                {cartItemsCount > 0 && (
                  <span className={styles.cartBadge}>{cartItemsCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className={styles.searchBar}>
            <div className={styles.container}>
              <div className={styles.searchWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  placeholder="O que você está procurando?"
                  className={styles.searchInput}
                  autoFocus
                />
                <button
                  className={styles.searchClose}
                  onClick={() => setSearchOpen(false)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        position="left"
        title="Menu"
      >
        <nav className={styles.mobileNav}>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
          <hr className={styles.divider} />
          {isAuthenticated ? (
            <>
              <NavLink
                to={user?.role === 'admin' ? '/admin' : '/conta'}
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {user?.role === 'admin' ? 'Painel Admin' : 'Minha Conta'}
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Entrar
            </NavLink>
          )}
          <NavLink
            to="/favoritos"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Favoritos
          </NavLink>
          <NavLink
            to="/carrinho"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Carrinho ({cartItemsCount})
          </NavLink>
        </nav>
      </Drawer>
    </>
  );
};
