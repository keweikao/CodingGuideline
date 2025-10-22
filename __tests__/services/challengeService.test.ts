// __tests__/services/challengeService.test.ts
import { prisma } from '@/lib/prisma';
import { startNewChallenge, getChallengeState, completeActivity, updateActivityDescription, restartChallenge } from '@/lib/services/challengeService';

jest.mock('@/lib/prisma');

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ activities: ['Mocked Activity 1', 'Mocked Activity 2', 'Mocked Activity 3'] }),
  } as Response)
);

describe('challengeService', () => {
  it('should start a new challenge for a new user', async () => {
    const userId = 'user123';
    
    // Arrange: No existing challenge
    (prisma.challenge.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.challenge.create as jest.Mock).mockResolvedValue({
      id: 'challenge1',
      userId,
      status: 'ongoing',
      currentDay: 1,
      startDate: new Date(),
    });

    // Act
    const result = await startNewChallenge(userId);

    // Assert
    expect(result.currentDay).toBe(1);
    expect(prisma.challenge.create).toHaveBeenCalledWith({
      data: {
        userId,
        status: 'ongoing',
        currentDay: 1,
      },
    });
    expect(prisma.dailyActivity.createMany).toHaveBeenCalled();
  });

  it('should not start a new challenge if one is already ongoing', async () => {
    const userId = 'user123';

    // Arrange: An existing challenge is found
    (prisma.challenge.findFirst as jest.Mock).mockResolvedValue({
      id: 'existingChallenge',
      userId,
      status: 'ongoing',
      currentDay: 5,
      startDate: new Date(),
    });

    // Act & Assert
    await expect(startNewChallenge(userId)).rejects.toThrow('An active challenge already exists for this user.');
  });

  it('should complete an activity and advance the day if all activities for the day are done', async () => {
    const userId = 'user123';
    const challengeId = 'challenge1';
    const activityId = 'activity1';

    // Arrange: Mock the activity being completed
    (prisma.dailyActivity.findUnique as jest.Mock).mockResolvedValue({
      id: activityId,
      challengeId,
      dayNumber: 1,
      description: 'Test activity',
      isCompleted: false,
      isCustom: false,
      challenge: { userId } as any,
    });
    (prisma.dailyActivity.update as jest.Mock).mockResolvedValue({ id: activityId, isCompleted: true } as any);

    // Arrange: Mock the state AFTER completion, where no incomplete activities are found for day 1
    (prisma.challenge.findUnique as jest.Mock).mockResolvedValue({
      id: challengeId,
      currentDay: 1,
      activities: [], // No more incomplete activities for day 1
    } as any);

    // Act
    await completeActivity(userId, activityId);

    // Assert: Check if the challenge day was advanced
    expect(prisma.challenge.update).toHaveBeenCalledWith({
      where: { id: challengeId },
      data: { currentDay: 2 },
    });
    // Assert: Check if new activities for day 2 were created
    expect(prisma.dailyActivity.createMany).toHaveBeenCalled();
  });

  it('should return the current challenge state', async () => {
    const userId = 'user123';
    const challenge = {
      id: 'challenge1',
      userId,
      status: 'ongoing',
      currentDay: 3,
      startDate: new Date(),
    };
    const activities = [
      { id: 'act1', description: 'Activity 1', isCompleted: false, dayNumber: 3, challengeId: 'challenge1', isCustom: false },
      { id: 'act2', description: 'Activity 2', isCompleted: false, dayNumber: 3, challengeId: 'challenge1', isCustom: false },
    ];

    // Arrange: Mock the challenge and its activities
    (prisma.challenge.findFirst as jest.Mock).mockResolvedValue(challenge);
    (prisma.dailyActivity.findMany as jest.Mock).mockResolvedValue(activities);

    // Act
    const result = await getChallengeState(userId);

    // Assert
    expect(result).toBeDefined();
    expect(result?.currentDay).toBe(3);
    expect(result?.activities).toHaveLength(2);
    expect(result?.activities[0].description).toBe('Activity 1');
    expect(prisma.challenge.findFirst).toHaveBeenCalledWith({
      where: { userId, status: 'ongoing' },
    });
    expect(prisma.dailyActivity.findMany).toHaveBeenCalledWith({
      where: { challengeId: 'challenge1', dayNumber: 3 },
    });
  });

  it('should not advance the day if activities are still pending', async () => {
    const userId = 'user123';
    const challengeId = 'challenge1';
    const activityId = 'activity1';

    // Arrange: Mock the activity being completed
    (prisma.dailyActivity.findUnique as jest.Mock).mockResolvedValue({
      id: activityId,
      challengeId,
      dayNumber: 1,
      description: 'Test activity',
      isCompleted: false,
      isCustom: false,
      challenge: { userId } as any,
    });
    (prisma.dailyActivity.update as jest.Mock).mockResolvedValue({ id: activityId, isCompleted: true } as any);

    // Arrange: Mock the state AFTER completion, where one incomplete activity still exists for day 1
    (prisma.challenge.findUnique as jest.Mock).mockResolvedValue({
      id: challengeId,
      currentDay: 1,
      activities: [{ id: 'activity2', dayNumber: 1, isCompleted: false }], // One activity left
    } as any);

    // Act
    await completeActivity(userId, activityId);

    // Assert: Check that the challenge day was NOT advanced
    expect(prisma.challenge.update).not.toHaveBeenCalledWith(
      expect.objectContaining({
        data: { currentDay: 2 },
      })
    );
  });

  it('should update an activity description', async () => {
    const userId = 'user123';
    const activityId = 'activity1';
    const newDescription = 'A new custom activity';

    // Arrange: Mock the activity to be updated
    (prisma.dailyActivity.findUnique as jest.Mock).mockResolvedValue({
      id: activityId,
      challengeId: 'challenge1',
      dayNumber: 1,
      description: 'Old description',
      isCompleted: false,
      isCustom: false,
      challenge: { userId } as any,
    });

    // Act
    await updateActivityDescription(userId, activityId, newDescription);

    // Assert
    expect(prisma.dailyActivity.update).toHaveBeenCalledWith({
      where: { id: activityId },
      data: { description: newDescription, isCustom: true },
    });
  });

  it('should restart a challenge by deleting the old one', async () => {
    const userId = 'user123';
    const challengeId = 'challenge1';

    // Arrange: Mock an existing challenge
    (prisma.challenge.findFirst as jest.Mock).mockResolvedValue({
      id: challengeId,
      userId,
      status: 'ongoing',
      currentDay: 5,
      startDate: new Date(),
    });

    // Act
    await restartChallenge(userId);

    // Assert
    expect(prisma.dailyActivity.deleteMany).toHaveBeenCalledWith({
      where: { challengeId },
    });
    expect(prisma.challenge.delete).toHaveBeenCalledWith({
      where: { id: challengeId },
    });
  });
});
