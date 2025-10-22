// components/app/GrowthPartner.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// This component will receive props to determine its state
interface GrowthPartnerProps {
  totalTasks: number;
  completedTasks: number;
  currentDay: number;
}

type PartnerState = 'IDLE' | 'ACTIVE';

export function GrowthPartner({ totalTasks, completedTasks, currentDay }: GrowthPartnerProps) {
  const [state, setState] = useState<PartnerState>('IDLE');

  useEffect(() => {
    if (completedTasks === 0) {
      setState('IDLE');
    } else {
      setState('ACTIVE');
    }
    // A more complex evolution logic could be added here based on currentDay
  }, [completedTasks, totalTasks, currentDay]);

  const renderState = () => {
    switch (state) {
      case 'IDLE':
        return <Image src="/partner-idle.png" alt="Idle Growth Partner" width={160} height={160} />;
      case 'ACTIVE':
        return <Image src="/partner-active.png" alt="Active Growth Partner" width={160} height={160} />;
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
