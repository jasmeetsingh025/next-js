'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

export default function ProfilePage({ params }: any) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id: userId } = React.use<{ id: string }>(params);

  useEffect(() => {
    // Simulate fetching profile data
    setTimeout(() => {
      setProfile({
        name: 'John Doe',
        bio: 'Software developer passionate about web technologies',
        avatar:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0 items-center justify-center flex pl-2">
            {profile?.avatar && (
              <div className="h-48 w-48 relative">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name}'s profile picture`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-xl text-gray-800 font-bold">{profile?.name}</h1>
            <p className="text-gray-700">User ID: {userId}</p>
            <p className="mt-2 text-gray-500">{profile?.bio}</p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
