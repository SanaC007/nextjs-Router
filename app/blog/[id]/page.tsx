// import { title } from 'process';
import styles from '../../page.module.css';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Sana ${params}`,
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>ID: {params.id}</h1>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
