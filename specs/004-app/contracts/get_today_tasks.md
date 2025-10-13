# GET /api/tasks/today

Retrieves the tasks for the current day.

## Responses

### 200 OK
- `tasks`: Array of UserTask objects
  - `id`: UUID
  - `task`: SelfLoveTask object
    - `id`: UUID
    - `content`: String
    - `category`: String
  - `completed_at`: Timestamp (nullable)

### 401 Unauthorized
- `error`: "Authentication required."
