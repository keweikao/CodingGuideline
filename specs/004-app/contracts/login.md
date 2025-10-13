# POST /api/auth/login

Logs in a user.

## Request Body

- `email`: String (required)
- `password`: String (required)

## Responses

### 200 OK
- `user_id`: UUID
- `token`: JWT

### 401 Unauthorized
- `error`: "Invalid credentials."
