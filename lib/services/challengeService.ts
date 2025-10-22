// lib/services/challengeService.ts
import { prisma } from '@/lib/prisma';

// This is a placeholder for fetching activities from the remote JSON.
// This will be properly implemented in task T009.
async function getActivitiesForDay(day: number): Promise<string[]> {
  try {
    // In a real app, this URL should be absolute.
    const response = await fetch(new URL('/activities.json', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }
    const data = await response.json();
    const allActivities: string[] = data.activities;

    // Simple logic to get 3 unique, pseudo-random activities for a day.
    // This ensures the activities are different each day but consistent for the same day.
    const start = (day - 1) * 3 % (allActivities.length - 3);
    return allActivities.slice(start, start + 3);
  } catch (error) {
    console.error("Could not fetch activities, returning fallback:", error);
    // Fallback in case the fetch fails
    return [
      "Take three deep breaths.",
      "Stretch your body for 5 minutes.",
      "Drink a full glass of water."
    ];
  }
}

export async function startNewChallenge(userId: string) {
  const existingChallenge = await prisma.challenge.findFirst({
    where: {
      userId,
      status: 'ongoing',
    },
  });

  if (existingChallenge) {
    throw new Error('An active challenge already exists for this user.');
  }

  const newChallenge = await prisma.challenge.create({
    data: {
      userId,
      status: 'ongoing',
      currentDay: 1,
    },
  });

  const firstDayActivities = await getActivitiesForDay(1);

  await prisma.dailyActivity.createMany({
    data: firstDayActivities.map(desc => ({
      challengeId: newChallenge.id,
      dayNumber: 1,
      description: desc,
    })),
  });

  return newChallenge;
}

export async function getChallengeState(userId: string) {
  const challenge = await prisma.challenge.findFirst({
    where: {
      userId,
      status: 'ongoing',
    },
  });

  if (!challenge) {
    return null;
  }

  const activities = await prisma.dailyActivity.findMany({
    where: {
      challengeId: challenge.id,
      dayNumber: challenge.currentDay,
    },
  });

  return { ...challenge, activities };
}

export async function completeActivity(userId: string, dailyActivityId: string) {
  const activity = await prisma.dailyActivity.findUnique({
    where: { id: dailyActivityId },
    include: { challenge: true },
  });

  if (!activity || activity.challenge.userId !== userId) {
    throw new Error('Activity not found or user does not have permission.');
  }

  const updatedActivity = await prisma.dailyActivity.update({
    where: { id: dailyActivityId },
    data: { isCompleted: true },
  });

  await advanceDayIfNeeded(activity.challengeId);

  return updatedActivity;
}

async function advanceDayIfNeeded(challengeId: string) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    include: {
      activities: {
        where: { isCompleted: false },
      },
    },
  });

  // If there are no incomplete activities for the current day
  if (challenge && challenge.activities.filter(a => a.dayNumber === challenge.currentDay).length === 0) {
    const nextDay = challenge.currentDay + 1;
    if (nextDay > 21) {
      // Challenge complete
      await prisma.challenge.update({
        where: { id: challengeId },
        data: { status: 'completed' },
      });
    } else {
      // Advance to next day
      await prisma.challenge.update({
        where: { id: challengeId },
        data: { currentDay: nextDay },
      });

      // Create activities for the new day
      const nextDayActivities = await getActivitiesForDay(nextDay);
      await prisma.dailyActivity.createMany({
        data: nextDayActivities.map(desc => ({
          challengeId: challengeId,
          dayNumber: nextDay,
          description: desc,
        })),
      });
    }
  }
}

export async function updateActivityDescription(userId: string, dailyActivityId: string, newDescription: string) {
  const activity = await prisma.dailyActivity.findUnique({
    where: { id: dailyActivityId },
    include: { challenge: true },
  });

  if (!activity || activity.challenge.userId !== userId) {
    throw new Error('Activity not found or user does not have permission.');
  }

  // Optionally, you might want to restrict this to only custom activities
  // if (!activity.isCustom) {
  //   throw new Error('Cannot edit a non-custom activity.');
  // }

  return prisma.dailyActivity.update({
    where: { id: dailyActivityId },
    data: { description: newDescription, isCustom: true }, // Mark as custom upon edit
  });
}

export async function restartChallenge(userId: string) {
  const challenge = await prisma.challenge.findFirst({
    where: {
      userId,
      status: 'ongoing',
    },
  });

  if (challenge) {
    // Prisma cascading delete will handle associated DailyActivity records if configured in the schema
    // Let's add it manually for clarity
    await prisma.dailyActivity.deleteMany({
      where: { challengeId: challenge.id },
    });
    await prisma.challenge.delete({
      where: { id: challenge.id },
    });
  }
  // If no challenge exists, we don't need to do anything.
  return { message: 'Challenge restarted successfully.' };
}
