// import { title } from 'process';
import styles from '../../page.module.css';
import Link from 'next/link';

type Repository = {
  id: number;
  name: string;
  full_name: string;
};

async function getRepo(name: string): Promise<Repository> {
  const res = await fetch(`https://api.github.com/repos/vercel/${name}`);
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const repo = await getRepo(params.name);

  return {
    title: repo.full_name,
  };
}

export default async function Page({ params }: { params: { name: string } }) {
  const repo = await getRepo(params.name);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Names: {repo.full_name}</h1>
        <Link href="/about">About</Link>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
