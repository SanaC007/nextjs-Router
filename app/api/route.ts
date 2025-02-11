import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'user.json');

// Create user function
interface User {
  name: string;
  email: string;
  [key: string]: unknown;
}

interface Request {
  json: () => Promise<User>;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body: User = await req.json(); // Read request body
    const existingData: string = await readFile(filePath, 'utf8').catch(
      () => '[]'
    );
    const users: User[] = JSON.parse(existingData);

    users.push(body); // Add new user

    await writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

    return new Response(JSON.stringify({ message: 'User added', user: body }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save user' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

// Read user function
export async function GET() {
  try {
    const data = await readFile(filePath, 'utf8');
    const user = JSON.parse(data);
    return new Response(
      JSON.stringify({ message: 'User data retrieved successfully', user }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to read user data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
