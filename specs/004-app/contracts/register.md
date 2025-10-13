# POST /api/auth/register

Registers a new user.

## Request Body

- `email`: String (required, valid email format)
- `password`: String (required, min 8 characters)

## Responses

### 201 Created
- `user_id`: UUID
- `token`: JWT

### 400 Bad Request
- `error`: "Invalid email or password format."

### 409 Conflict
- `error`: "User with this email already exists."
