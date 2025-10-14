// app/profile/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/app/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface UserProfile {
  email: string;
}

export default function ProfilePage() {
  const { token, setToken } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      const res = await fetch('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUser(await res.json());
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    router.push('/'); // Redirect to home, which will show login prompt
  };

  const handleRestart = async () => {
    if (!confirm('Are you sure you want to restart? All your progress will be lost.')) {
      return;
    }
    await fetch('/api/challenge/restart', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    // Navigate to home to see the "Start Challenge" button again
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <div className="text-center">
        <p className="text-lg">Welcome back,</p>
        <p className="text-lg font-medium text-muted-foreground">
          {user ? user.email : 'Loading...'}
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button variant="destructive" onClick={handleRestart}>Restart Challenge</Button>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
