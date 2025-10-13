# PUT /api/users/me/settings

Updates user settings.

## Request Body

- `reminder_time`: String (optional, format 'HH:MM')

## Responses

### 200 OK
- `message`: "Settings updated successfully."

### 400 Bad Request
- `error`: "Invalid time format."

### 401 Unauthorized
- `error`: "Authentication required."
