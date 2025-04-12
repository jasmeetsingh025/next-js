'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
  });

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

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/userId');
    console.log('User details:', res.data);
    setUserData({
      id: res.data.user._id,
      name: res.data.user.name,
    });
  };

  useEffect(() => {
    getUserDetails();
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
          <div className="md:shrink-0 items-center justify-center flex p-3">
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
            <h1 className="text-xl font-bold">{profile?.name}</h1>
            <p className="mt-2 text-gray-500">{profile?.bio}</p>
            <h2 className="mt-4 text-lg font-semibold">
              {userData.id ? (
                <Link href={`/profile/${userData.id}`}>{userData.name}</Link>
              ) : (
                <span className="text-gray-500">No user data available</span>
              )}
            </h2>
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
