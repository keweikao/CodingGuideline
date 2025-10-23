// app/(main)/page.tsx
'use client';

import { GrowthPartner } from "@/components/app/GrowthPartner";
import { DailyActivityList, Activity } from "@/components/app/DailyActivityList";
import { useAuth } from "@/components/app/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/app/ProtectedRoute";

interface ChallengeState {
  currentDay: number;
  status: string;
  activities: Activity[];
}

function HomePageContent() {
  const { token } = useAuth();
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChallengeState = useCallback(async () => {
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
      const data = await res.json() as ChallengeState;
      setChallenge(data);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchChallengeState();
    }
  }, [token, fetchChallengeState]);

  const handleStartChallenge = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/challenge', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to start challenge');
      fetchChallengeState();
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    }
  };
  const handleToggleComplete = async (activityId: string, isCompleted: boolean) => {
    if (isCompleted) {
      await fetch(`/api/activities/${activityId}/complete`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchChallengeState();
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

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomePageContent />
    </ProtectedRoute>
  );
}
