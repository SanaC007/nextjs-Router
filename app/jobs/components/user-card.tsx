type User = {
  name: string;
  birthday: string;
  age: number;
};

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p>Birthday: {user.birthday}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}
