'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    birthday: '',
  });
  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  interface ApiResponse {
    ok: boolean;
    error?: string;
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setMessage(''); // Clear previous message

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setMessage('User data saved successfully! ✅');
        setFormData({ name: '', age: '', birthday: '' }); // Clear form
      } else {
        setMessage(data.error || 'Failed to save user data ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while saving data ❌');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <Link href="/jobs">
          <h2 className="text-2xl font-semibold text-center mb-4">User Form</h2>
        </Link>

        {message && (
          <p className="text-center mb-4 text-sm text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="birthday"
            placeholder="Birthday (MM,DD,YYYY)"
            value={formData.birthday}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
