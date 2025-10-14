// app/(main)/page.tsx
'use client';

import { useAuth } from "@/components/app/AuthProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface ChallengeState {
  currentDay: number;
  status: string;
  activities: Activity[];
}

export default function HomePage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChallengeState = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/challenge', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.status === 404) {
        setChallenge(null);
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch challenge state');
      const data = await res.json();
      setChallenge(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/auth');
    }
    if (token) {
      fetchChallengeState();
    }
  }, [token, isLoading, router]);

  const handleStartChallenge = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/challenge', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to start challenge');
      fetchChallengeState(); // Refetch state after starting
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleToggleComplete = async (activityId: string, isCompleted: boolean) => {
    // For simplicity, we only handle completion, not un-completion
    if (isCompleted) {
      await fetch(`/api/activities/${activityId}/complete`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchChallengeState(); // Refetch to get new state (e.g., next day)
    }
  };

  const handleUpdateDescription = async (activityId: string, description: string) => {
    await fetch(`/api/activities/${activityId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      }
    );
    fetchChallengeState();
  };

  if (isLoading || !token) {
    return <div>Loading...</div>; // Or a proper skeleton screen
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!challenge) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Ready to start your journey?</h1>
        <Button onClick={handleStartChallenge}>Start 21-Day Challenge</Button>
      </div>
    );
  }
  
  if (challenge.status === 'completed') {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
        <p>You have completed the 21-Day Self-Love Challenge!</p>
      </div>
    )
  }

  const completedTasks = challenge.activities.filter(a => a.isCompleted).length;

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Day {challenge.currentDay} Challenge</h1>
      <GrowthPartner 
        currentDay={challenge.currentDay} 
        completedTasks={completedTasks}
        totalTasks={challenge.activities.length} 
      />
      <DailyActivityList 
        activities={challenge.activities} 
        onToggleComplete={handleToggleComplete} 
        onUpdateDescription={handleUpdateDescription}
      />
    </div>
  );
}
