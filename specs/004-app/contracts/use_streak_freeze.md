# POST /api/streak-freeze/use

Uses a streak freeze item.

## Responses

### 200 OK
- `message`: "Streak freeze used successfully."

### 400 Bad Request
- `error`: "No streak freezes available."

### 401 Unauthorized
- `error`: "Authentication required."
