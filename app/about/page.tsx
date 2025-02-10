import styles from '../page.module.css';
import Link from 'next/link';

export default function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hello, About!</h1>
        <Link href="/">Home</Link>
        <Link href="/blog/432">Repo</Link>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
