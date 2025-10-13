# POST /api/tasks/{id}/complete

Marks a task as complete.

## Parameters

- `id`: UUID (required, from UserTask)

## Responses

### 200 OK
- `message`: "Task marked as complete."

### 401 Unauthorized
- `error`: "Authentication required."

### 404 Not Found
- `error`: "Task not found."
