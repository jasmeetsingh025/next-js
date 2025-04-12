'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function verifyEmailPage() {
  const [token, setToken] = useState<string | null>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(`/api/users/verifyEmail`, { token });
      if (response.data.status === 200) {
        setVerified(true);
      }
    } catch (error: any) {
      console.error('Error during email verification:', error);
      seterror(true);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    setToken(tokenParam || '');
  }, []);
  useEffect(() => {
    if (token && token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  if (verified) {
    return (
      <div className="flex flex-col items-center justify-center text-white min-h-screen">
        <h1 className="text-2xl font-mono pb-3 text-yellow-800">
          Email verified successfully!
        </h1>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Login
        </Link>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-white min-h-screen">
        <h1 className="text-2xl font-mono pb-3 text-yellow-800">
          Email verification failed!
        </h1>
        <Link
          href="/signup"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Sign Up
        </Link>
      </div>
    );
  }
}
