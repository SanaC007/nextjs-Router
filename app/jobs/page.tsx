// import styles from '../page.module.css';
import Link from 'next/link';
import UserCard from './components/user-card';

type Repository = {
  name: string;
  birthday: string;
  age: number;
  user: { name: string; birthday: string }[];
};

export default async function Page() {
  const res = await fetch('http://localhost:3000/api');
  const data: Repository = await res.json();

  const user = { ...data.user[0], age: data.age };
  console.log(user);

  return (
    <div>
      <h1>Users List</h1>
      <Link href={'/users'}>Go to Users Page</Link>
      <div>
        {data.user.map((user, index) => (
          <UserCard key={index} user={{ ...user, age: data.age }} />
        ))}
      </div>
    </div>
  );
}
