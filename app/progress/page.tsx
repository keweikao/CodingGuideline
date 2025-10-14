// app/progress/page.tsx
'use client';

import { JourneyMap } from "@/components/app/JourneyMap";
import { useAuth } from "@/components/app/AuthProvider";
import { useEffect, useState } from "react";

interface ChallengeState {
  currentDay: number;
  status: 'ongoing' | 'completed';
}

export default function ProgressPage() {
  const { token, isLoading } = useAuth();
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);

  useEffect(() => {
    const fetchChallengeState = async () => {
      if (!token) return;
      try {
        const res = await fetch('/api/challenge', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setChallenge(data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchChallengeState();
  }, [token]);

  if (isLoading || !challenge) {
    // You can add a more sophisticated skeleton loader here
    return <div>Loading journey...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Your Journey</h1>
      <JourneyMap currentDay={challenge.currentDay} challengeStatus={challenge.status} />
    </div>
  );
}
