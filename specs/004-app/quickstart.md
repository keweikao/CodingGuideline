# Quickstart

This guide provides a quick way to test the core functionality of the '21天愛自己計劃' feature.

## 1. Register a new user

- **Action**: Send a `POST` request to `/api/auth/register`.
- **Body**: 
```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```
- **Expected Result**: `201 Created` with a user ID and JWT token.

## 2. Get today's tasks

- **Action**: Send a `GET` request to `/api/tasks/today` with the JWT token.
- **Expected Result**: `200 OK` with an array of three tasks.

## 3. Complete a task

- **Action**: Take the ID of the first task from the previous step and send a `POST` request to `/api/tasks/{id}/complete` with the JWT token.
- **Expected Result**: `200 OK`.

## 4. Check progress

- **Action**: Send a `GET` request to `/api/progress` with the JWT token.
- **Expected Result**: `200 OK` with an updated score.

## 5. Set reminder time

- **Action**: Send a `PUT` request to `/api/users/me/settings` with the JWT token.
- **Body**:
```json
{
  "reminder_time": "10:00"
}
```
- **Expected Result**: `200 OK`.
