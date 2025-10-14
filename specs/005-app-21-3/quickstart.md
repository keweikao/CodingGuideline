# Quickstart: End-to-End Feature Validation

This document provides a high-level, end-to-end test scenario to validate the core functionality of the 21-Day Self-Love Challenge App.

## Prerequisites

- The application (frontend and backend) is running.
- You have credentials for a test user or are prepared to register a new one.

## Scenario: A User Completes Their First Day

This scenario follows the primary user story from the specification.

1.  **Register a New User**
    - **Action**: Send a `POST` request to `/api/auth/register` with a new email and password.
    - **Expected Result**: Receive a `201 Created` status.

2.  **Log In**
    - **Action**: Send a `POST` request to `/api/auth/login` with the new credentials.
    - **Expected Result**: Receive a `200 OK` status and a JWT token.

3.  **Start a New Challenge**
    - **Action**: Send a `POST` request to `/api/challenge` with the JWT token.
    - **Expected Result**: Receive a `201 Created` status.

4.  **Get Current Challenge State**
    - **Action**: Send a `GET` request to `/api/challenge` with the JWT token.
    - **Expected Result**: Receive a `200 OK` status with the challenge data. Verify that `currentDay` is `1` and there are 3 activities in the `activities` array.

5.  **Customize an Activity**
    - **Action**: Take the ID of the first activity (`dailyActivityId`) from the previous step. Send a `PUT` request to `/api/activities/{dailyActivityId}` with a new `description`.
    - **Expected Result**: Receive a `200 OK` status.

6.  **Complete All Activities**
    - **Action**: For each of the 3 activities, send a `PATCH` request to `/api/activities/{dailyActivityId}/complete`.
    - **Expected Result**: Receive a `200 OK` status for each request.

7.  **Verify Advancement (Conceptual)**
    - **Action**: In a real-world scenario, completing the last activity should trigger the logic to advance the day. Send a `GET` request to `/api/challenge` again.
    - **Expected Result**: The `currentDay` should now be `2`, and a new set of 3 activities should be present.

## Manual UI Validation

1.  Open the PWA on your device.
2.  Register and log in.
3.  Verify the main screen shows "Day 1" and the growth partner character.
4.  Tap on an activity description, edit it, and save.
5.  Check off all three activities and observe the character's state change.
6.  After completing the third activity, confirm that a celebration animation occurs and the app transitions to show "Day 2".
7.  Navigate to the "Journey" screen and verify that the node for Day 1 is marked as complete.
