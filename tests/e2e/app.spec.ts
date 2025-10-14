// tests/e2e/app.spec.ts
import { test, expect } from '@playwright/test';

const userEmail = `testuser_${Date.now()}@example.com`;
const userPassword = 'password123';

test('Full user journey: registration, start challenge, and complete day 1', async ({ page }) => {
  // 1. Go to the app and get redirected to auth
  await page.goto('/');
  await expect(page).toHaveURL('/auth');

  // 2. Register a new user
  await page.getByRole('button', { name: 'Need an account? Register' }).click();
  await page.getByLabel('Email').fill(userEmail);
  await page.getByLabel('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Register' }).click();

  // 3. Log in
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await page.getByLabel('Email').fill(userEmail);
  await page.getByLabel('Password').fill(userPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  // 4. Start a new challenge
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('button', { name: 'Start 21-Day Challenge' })).toBeVisible();
  await page.getByRole('button', { name: 'Start 21-Day Challenge' }).click();
  await expect(page.getByRole('heading', { name: 'Day 1 Challenge' })).toBeVisible();

  // 5. Verify 3 activities are present
  const activities = await page.getByLabel(/text-lg/).all();
  expect(activities.length).toBe(3);

  // 6. Complete all activities
  for (const activity of activities) {
    await activity.click();
  }

  // 7. Verify advancement to Day 2
  // After completing the last activity, the state re-fetches and should show Day 2
  await expect(page.getByRole('heading', { name: 'Day 2 Challenge' })).toBeVisible();

  // 8. Check progress screen
  await page.getByRole('link', { name: 'Progress' }).click();
  await expect(page).toHaveURL('/progress');
  await expect(page.getByRole('heading', { name: 'Your Journey' })).toBeVisible();
  const day1Node = page.locator('.flex.flex-wrap .w-12.h-12').first();
  await expect(day1Node).toHaveClass(/bg-green-500/);
  const day2Node = page.locator('.flex.flex-wrap .w-12.h-12').nth(1);
  await expect(day2Node).toHaveClass(/bg-blue-500/);
});
