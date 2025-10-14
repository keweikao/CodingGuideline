# Tasks: 21-Day Self-Love Challenge App

This document breaks down the development work for the feature into actionable, ordered tasks based on the design artifacts.

## Phase 1: Project Setup & Backend Foundation

- [X] **T001**: **[Setup]** Initialize Prisma client and define database schema in `prisma/schema.prisma` based on `data-model.md`.
- [X] **T002**: **[Setup]** Configure Next.js project to be a PWA by creating a `manifest.json` file and setting up a basic service worker in `public/`.
- [X] **T003**: **[Setup]** Add required dependencies: `pnpm add prisma @prisma/client` and `pnpm add -D bcryptjs jsonwebtoken`.
- [X] **T004**: **[Backend]** Implement user registration logic in `app/api/auth/register/route.ts` including password hashing with bcrypt.
- [X] **T005**: **[Backend]** Implement user login logic in `app/api/auth/login/route.ts` including password verification and JWT generation.
- [X] **T006**: **[Backend]** Create authentication middleware in `middleware.ts` to protect routes using JWT.

## Phase 2: Core Challenge Logic (Backend)

- [X] **T007**: **[Backend]** Implement the service logic for starting a new challenge in `lib/services/challengeService.ts`. This includes creating the `Challenge` and initial `DailyActivity` records.
- [X] **T008**: **[Backend]** Implement the API route `app/api/challenge/route.ts` (POST and GET) to connect the service logic from T007.
- [X] **T009**: **[Backend]** Implement the service logic for fetching activity content from the remote JSON file.
- [X] **T010**: **[Backend]** Implement the service logic for completing an activity and updating its status in the database.
- [X] **T011**: **[Backend]** Implement the service logic for the self-paced progression: checking if a day is complete and advancing the user's `currentDay`.
- [X] **T012**: **[Backend]** Implement the API routes for activities in `app/api/activities/...` (PATCH for complete, PUT for custom update).
- [X] **T012a**: **[Backend]** Implement a service and API endpoint (e.g., POST /api/challenge/restart) to handle resetting a user's current challenge.

## Phase 3: Frontend UI & Components

- [X] **T013**: **[P] [UI]** Create the main 3-page layout structure (`app/layout.tsx`, `app/(main)/page.tsx`, `app/progress/page.tsx`, `app/profile/page.tsx`) with a shared bottom tab navigator.
- [X] **T014**: **[P] [UI]** Implement the `GrowthPartner` component (`components/app/GrowthPartner.tsx`) including the **state machine logic** for its evolution (e.g., idle, happy, growing states). Use placeholder assets initially.
- [X] **T015**: **[P] [UI]** Implement the `DailyActivityList` component (`components/app/DailyActivityList.tsx`) to display the 3 daily tasks with checkboxes.
- [X] **T016**: **[P] [UI]** Implement the `JourneyMap` component (`components/app/JourneyMap.tsx`) to display the 21-day visual path.
- [X] **T017**: **[UI]** Implement the Home screen (`app/(main)/page.tsx`), composing the `GrowthPartner` and `DailyActivityList` components.
- [X] **T018**: **[UI]** Implement the Progress screen (`app/progress/page.tsx`), using the `JourneyMap` component.
- [ ] **T019**: **[UI]** Implement the Profile screen (`app/profile/page.tsx`) with user info, a logout button, and a **'Restart Challenge' button**.
- [ ] **T019a**: **[UI]** Create a dedicated authentication page (`app/auth/page.tsx`) with forms for user login and registration.

## Phase 4: Frontend Logic & Integration

- [ ] **T020**: **[Integration]** Implement frontend state management for user authentication (e.g., using React Context or Zustand).
- [ ] **T021**: **[Integration]** Connect the Home screen to the backend: fetch challenge state, handle activity completion/customization API calls.
- [ ] **T022**: **[Integration]** Implement the state logic for the `GrowthPartner` component, making it react to activity completion events.
- [ ] **T023**: **[Integration]** Connect the Progress screen to fetch and display the user's overall journey status.
- [ ] **T024**: **[Integration]** Connect the Profile screen to display user data and handle logout.
- [ ] **T024a**: **[Integration]** Implement a redirect in the Home page to push unauthenticated users to the `/auth` page.

## Phase 5: Deepening & Polish

- [ ] **T025**: **[P] [Tests]** Write an **end-to-end (E2E) UI test** using Playwright that **automates the manual validation steps** in quickstart.md (covers registration, login, completing Day 1, and verifying UI state changes).
- [ ] **T026**: **[P] [PWA]** Enhance the PWA service worker (`public/sw.js`) with a proper caching strategy for offline support.
- [ ] **T027**: **[P] [Observability]** Set up a basic logging service (e.g., Logtail or Sentry) to capture frontend and backend errors.
- [ ] **T028**: **[DevOps]** Create a basic CI/CD pipeline using GitHub Actions (`.github/workflows/ci.yml`) to run linting, testing, and building on every push.
- [ ] **T029**: **[Design]** **Finalize the visual design and evolution path** for the Growth Partner (e.g., from sprout to flower).
- [ ] **T030**: **[Design]** **Create and export all required assets** (SVGs, Lottie files, or image sprites) for the Growth Partner's states.
- [ ] **T031**: **[UI]** **Integrate the final assets** from T030 into the GrowthPartner component, replacing the placeholders.

## Dependencies

- **Phase 1** must be completed before **Phase 2** and **Phase 4**.
- **Phase 2** and **Phase 3** can be worked on in parallel to a large extent.
- **Phase 4** depends on the completion of both **Phase 2** and **Phase 3**.
- **Phase 5** tasks can be started once their related features are stable.
