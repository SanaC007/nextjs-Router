import styles from './page.module.css';
import Link from 'next/link';

type Repository = {
  id: number;
  name: string;
  full_name: string;
};

type Time = {
  datetime: string;
};

async function getTime(): Promise<Time> {
  const res = await fetch(
    'http://worldtimeapi.org/api/timezone/America/Chicago',
    {
      next: { revalidate: 5 },
    }
  );
  return res.json();
}

async function getRepo(): Promise<Repository> {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  return res.json();
}

export default async function Page() {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js');
  // const data: Repository = await res.json();

  const [data, time] = await Promise.all([getRepo(), getTime()]);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{data.full_name}</h1>
        <p>Updated at: {time.datetime}</p>
        <Link href="/about">About</Link>
        <Link href="/blog/123">Blog Post - Blog</Link>
        <Link href="/repo/turborepo">Repo Post - Repo</Link>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
