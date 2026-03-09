import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@components/shared';
import styles from './PublicLayout.module.scss';

export const PublicLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
