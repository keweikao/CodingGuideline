# GET /api/progress

Retrieves the user's progress.

## Responses

### 200 OK
- `streak`: Integer
- `score`: Integer

### 401 Unauthorized
- `error`: "Authentication required."
