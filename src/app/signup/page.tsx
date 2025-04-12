'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { on } from 'events';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Sign up response:', response.data);
      if (response.data.status == 201) {
        toast.success('Sign up successful! Redirecting...');
        router.push('/login');
      }
      setUser({ username: '', password: '', email: '' });
    } catch (error: any) {
      console.error('Error during sign up:', error);
      setError(error.response.data.message || 'An error occurred');
      toast.error(error.response.data.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Processing the Data...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-white min-h-screen">
      <h1 className="text-2xl font-mono pb-3 text-yellow-800">
        Sign Up here to join us!
      </h1>
      <form onSubmit={onSignUp} className="flex flex-col gap-4 m-4">
        <input
          className="hover:border-1 hover:border-white border-1 border-transparent transition ease-in rounded py-2 px-3 w-80"
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <input
          className="hover:border-1 hover:border-white border-1 border-transparent transition ease-in rounded py-2 px-3 w-80"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          className="hover:border-1 hover:border-white border-1 border-transparent transition ease-in rounded py-2 px-3 w-80"
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button
          className="hover:bg-amber-900 rounded-lg px-4 py-2 transition ease-in"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <h2>
        If you already have an account{' '}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </h2>
    </div>
  );
}
