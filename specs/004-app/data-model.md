# Data Model

This document defines the data entities for the '21天愛自己計劃' feature.

### User
Represents an application user.

- `id`: UUID (Primary Key)
- `email`: String (Unique, Indexed)
- `password_hash`: String
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Character
Represents the user's virtual companion.

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to User)
- `name`: String
- `state`: String (e.g., 'happy', 'neutral', 'sad')
- `created_at`: Timestamp
- `updated_at`: Timestamp

### SelfLoveTask
Represents a template for a self-love task.

- `id`: UUID (Primary Key)
- `content`: String
- `category`: String (e.g., 'mindfulness', 'activity', 'gratitude')
- `created_at`: Timestamp

### UserTask
Represents a specific task assigned to a user on a specific day.

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to User)
- `task_id`: UUID (Foreign Key to SelfLoveTask)
- `date`: Date
- `completed_at`: Timestamp (nullable)
- `created_at`: Timestamp

### UserProgress
Represents the user's overall progress.

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to User, Unique)
- `streak`: Integer (default: 0)
- `score`: Integer (default: 0)
- `updated_at`: Timestamp

### StreakFreeze
Represents a streak freeze item a user can have.

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to User)
- `quantity`: Integer (default: 1)
- `updated_at`: Timestamp
