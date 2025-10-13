# Tasks: 21天愛自己計劃

**Input**: Design documents from `/Users/stephen/Desktop/retro-ui-template-nextjs/specs/004-app/`

## Phase 3.1: Setup
- [ ] T001: Set up database connection and ORM (Prisma) in a new `lib/db.ts` file.
- [ ] T002: [P] Install dependencies: `pnpm add bcrypt jsonwebtoken` and `pnpm add -D @types/bcrypt @types/jsonwebtoken`.
- [ ] T003: [P] Configure authentication middleware to protect routes in `middleware.ts`.

## Phase 3.2: Backend Tests (TDD)
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T004: [P] Write contract test for `POST /api/auth/register` in `__tests__/api/auth/register.test.ts`.
- [ ] T005: [P] Write contract test for `POST /api/auth/login` in `__tests__/api/auth/login.test.ts`.
- [ ] T006: [P] Write contract test for `GET /api/tasks/today` in `__tests__/api/tasks/today.test.ts`.
- [ ] T007: [P] Write contract test for `POST /api/tasks/{id}/complete` in `__tests__/api/tasks/complete.test.ts`.
- [ ] T008: [P] Write contract test for `GET /api/progress` in `__tests__/api/progress/get.test.ts`.
- [ ] T009: [P] Write contract test for `POST /api/streak-freeze/use` in `__tests__/api/streak-freeze/use.test.ts`.
- [ ] T010: [P] Write contract test for `PUT /api/users/me/settings` in `__tests__/api/users/settings.test.ts`.

## Phase 3.3: Backend Implementation
- [ ] T011: [P] Define database schema in `prisma/schema.prisma` based on `data-model.md` and run `pnpm prisma migrate dev`.
- [ ] T012: [P] Implement User model functions in `lib/models/user.ts`.
- [ ] T013: [P] Implement Task models (SelfLoveTask, UserTask) in `lib/models/task.ts`.
- [ ] T014: [P] Implement Progress models (UserProgress, StreakFreeze) in `lib/models/progress.ts`.
- [ ] T015: Implement authentication service in `lib/services/authService.ts` for registration and login logic.
- [ ] T016: Implement API route for `POST /api/auth/register` in `app/api/auth/register/route.ts`.
- [ ] T017: Implement API route for `POST /api/auth/login` in `app/api/auth/login/route.ts`.
- [ ] T018: Implement task service in `lib/services/taskService.ts` to manage daily tasks.
- [ ] T019: Implement API route for `GET /api/tasks/today` in `app/api/tasks/today/route.ts`.
- [ ] T020: Implement API route for `POST /api/tasks/[id]/complete` in `app/api/tasks/[id]/complete/route.ts`.
- [ ] T021: Implement progress service in `lib/services/progressService.ts`.
- [ ] T022: Implement API route for `GET /api/progress` in `app/api/progress/route.ts`.
- [ ] T023: Implement API route for `POST /api/streak-freeze/use` in `app/api/streak-freeze/use/route.ts`.
- [ ] T024: Implement user service in `lib/services/userService.ts` for settings.
- [ ] T025: Implement API route for `PUT /api/users/me/settings` in `app/api/users/me/settings/route.ts`.
- [ ] T042: Implement the end-of-plan summary report generation and display logic.
- [ ] T043: Implement the "continuous mode" where users continue to receive daily tasks after the initial 21-day plan is complete.

## Phase 3.4: Frontend Tests (TDD)
- [ ] T026: [P] Write integration test for user registration and login flow in `__tests__/integration/auth.test.ts`.
- [ ] T027: [P] Write integration test for viewing and completing tasks in `__tests__/integration/tasks.test.ts`.

## Phase 3.5: Frontend Implementation
- [ ] T028: [P] Create registration form component in `components/auth/RegisterForm.tsx`.
- [ ] T029: [P] Create login form component in `components/auth/LoginForm.tsx`.
- [ ] T030: [P] Create a `TaskCard.tsx` component in `components/tasks/` to display a single task.
- [ ] T031: [P] Create a `TaskList.tsx` component in `components/tasks/` to display the list of daily tasks.
- [ ] T032: [P] Create a `ProgressView.tsx` component in `components/progress/`.
- [ ] T033: [P] Create a `VirtualCharacter.tsx` component in `components/character/`.
- [ ] T034: Implement the main dashboard page at `app/dashboard/page.tsx` combining the above components.
- [ ] T035: Implement state management for the application using React Context or a similar library in `hooks/useAppContext.ts`.
- [ ] T036: Implement the settings page at `app/settings/page.tsx`.
- [ ] T040: [P] Implement character state change logic in the `components/character/VirtualCharacter.tsx` component based on daily task completion status.
- [ ] T041: [P] Design and implement animations and encouraging messages for the instant positive feedback when a task is completed.

## Phase 3.6: Polish
- [ ] T037: [P] Add unit tests for services in `__tests__/lib/services/`.
- [ ] T038: [P] Add documentation to the README.md for the new feature.
- [ ] T039: Run `pnpm build`, `pnpm lint`, and `pnpm type-check` to ensure code quality and fix any issues.

## Dependencies
- Backend tests (T004-T010) must be completed before backend implementation (T011-T025).
- Backend implementation (T011-T025) must be completed before frontend implementation (T028-T036).
- Frontend tests (T026-T027) must be completed before frontend implementation (T028-T036).

## Parallel Example
```
# Launch backend test creation tasks together:
Task: "T004 [P] Write contract test for POST /api/auth/register in __tests__/api/auth/register.test.ts."
Task: "T005 [P] Write contract test for POST /api/auth/login in __tests__/api/auth/login.test.ts."
Task: "T006 [P] Write contract test for GET /api/tasks/today in __tests__/api/tasks/today.test.ts."

# Launch backend model creation tasks together:
Task: "T011 [P] Define database schema in prisma/schema.prisma..."
Task: "T012 [P] Implement User model functions in lib/models/user.ts."
```
