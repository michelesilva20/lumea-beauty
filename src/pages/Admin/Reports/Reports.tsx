import styles from './Reports.module.scss';

export const AdminReports = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Relatórios</h1>
        <p>Análise de vendas e desempenho da loja</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Vendas por período</h3>
          <p>Selecione o intervalo de datas para gerar o relatório de vendas.</p>
          <button type="button" className={styles.btn}>Gerar relatório</button>
        </div>
        <div className={styles.card}>
          <h3>Produtos mais vendidos</h3>
          <p>Ranking dos produtos com maior volume de vendas.</p>
          <button type="button" className={styles.btn}>Ver ranking</button>
        </div>
        <div className={styles.card}>
          <h3>Relatório de clientes</h3>
          <p>Análise de comportamento e recência dos clientes.</p>
          <button type="button" className={styles.btn}>Gerar relatório</button>
        </div>
      </div>
    </div>
  );
};
