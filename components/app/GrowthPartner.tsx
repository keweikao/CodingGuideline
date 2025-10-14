// components/app/GrowthPartner.tsx
'use client';

import { useState, useEffect } from 'react';

// This component will receive props to determine its state
interface GrowthPartnerProps {
  totalTasks: number;
  completedTasks: number;
  currentDay: number;
}

type PartnerState = 'IDLE' | 'ACTIVE' | 'HAPPY' | 'EVOLVING';

export function GrowthPartner({ totalTasks, completedTasks, currentDay }: GrowthPartnerProps) {
  const [state, setState] = useState<PartnerState>('IDLE');

  useEffect(() => {
    if (completedTasks === 0) {
      setState('IDLE');
    } else if (completedTasks > 0 && completedTasks < totalTasks) {
      setState('ACTIVE');
    } else if (completedTasks === totalTasks) {
      setState('HAPPY');
    }
    // A more complex evolution logic could be added here based on currentDay
  }, [completedTasks, totalTasks, currentDay]);

  const renderState = () => {
    switch (state) {
      case 'IDLE':
        return <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">Idle Partner</div>;
      case 'ACTIVE':
        return <div className="w-40 h-40 bg-yellow-300 rounded-full flex items-center justify-center">Working on it!</div>;
      case 'HAPPY':
        return <div className="w-40 h-40 bg-green-300 rounded-full flex items-center justify-center">Day Complete!</div>;
      case 'EVOLVING':
        return <div className="w-40 h-40 bg-blue-300 rounded-full flex items-center justify-center">Evolving!</div>;
      default:
        return null;
    }
  };

  return (
    <div className="my-8 flex flex-col items-center gap-4">
      {renderState()}
      <p className="text-sm text-muted-foreground">Day {currentDay}</p>
    </div>
  );
}
