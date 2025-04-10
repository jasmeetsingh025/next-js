'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/users/login', userData);
      if (response.data.status === 200) {
        toast.success('Login successful!');
        router.push('/profile');
        return;
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
      setError(error.response.data.message || 'An error occurred');
    }
    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      Processing the Data...
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center text-white min-h-screen">
      <h1 className="text-2xl font-mono pb-3 text-yellow-800">
        Login here to join us!
      </h1>
      <form onSubmit={onLogin} className="flex flex-col gap-4 m-4">
        <input
          className="hover:border-1 hover:border-white border-1 border-transparent transition ease-in rounded py-2 px-3 w-80"
          type="text"
          name="username"
          placeholder="Username"
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          className="hover:border-1 hover:border-white border-1 border-transparent transition ease-in rounded py-2 px-3 w-80"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button
          className="hover:bg-amber-900 rounded-lg px-4 py-2 transition ease-in"
          type="submit"
        >
          Login
        </button>
      </form>
      <Link
        href="/forgot-password"
        className="hover:underline px-4 py-2 transition ease-in"
      >
        Forgot Password?
      </Link>
      <h2>
        If you don't have an account{' '}
        <Link className="underline" href="/signup">
          Sign Up
        </Link>
      </h2>
    </div>
  );
}
