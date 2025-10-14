// components/app/JourneyMap.tsx
'use client';

interface JourneyMapProps {
  currentDay: number;
  challengeStatus: 'ongoing' | 'completed';
}

export function JourneyMap({ currentDay, challengeStatus }: JourneyMapProps) {
  const totalDays = 21;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const getNodeState = (day: number) => {
    if (challengeStatus === 'completed' || day < currentDay) {
      return 'completed';
    }
    if (day === currentDay) {
      return 'active';
    }
    return 'upcoming';
  };

  const stateStyles = {
    completed: 'bg-green-500 text-white',
    active: 'bg-blue-500 text-white ring-4 ring-blue-300',
    upcoming: 'bg-gray-200 text-gray-500',
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {days.map((day) => (
        <div
          key={day}
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${stateStyles[getNodeState(day)]}`}>
          {day}
        </div>
      ))}
    </div>
  );
}
