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

- [X] **T007**: **[Backend]** Implement the service logic for starting a new challenge in `lib/services/challengeService.ts`.
- [X] **T008**: **[Backend]** Implement the API route `app/api/challenge/route.ts` (POST and GET).
- [X] **T009**: **[Backend]** Implement the service logic for fetching activity content from the remote JSON file.
- [X] **T010**: **[Backend]** Implement the service logic for completing an activity.
- [X] **T011**: **[Backend]** Implement the service logic for the self-paced progression.
- [X] **T012**: **[Backend]** Implement the API routes for activities in `app/api/activities/...`.
- [X] **T012a**: **[Backend]** Implement a service and API endpoint for resetting a challenge.

## Phase 3: Frontend UI & Components

- [X] **T013**: **[P] [UI]** Create the main 3-page layout structure and bottom navigator.
- [X] **T014**: **[P] [UI]** Implement the `GrowthPartner` component with placeholder assets and state logic.
- [X] **T015**: **[P] [UI]** Implement the `DailyActivityList` component.
- [X] **T016**: **[P] [UI]** Implement the `JourneyMap` component.
- [X] **T017**: **[UI]** Implement the static Home screen composition.
- [X] **T018**: **[UI]** Implement the static Progress screen composition.
- [X] **T019**: **[UI]** Implement the static Profile screen composition.
- [X] **T019a**: **[UI]** Create a dedicated authentication page (`app/auth/page.tsx`) with forms for user login and registration.

## Phase 4: Frontend Logic & Integration

- [X] **T020**: **[Integration]** Implement frontend state management for user authentication.
- [X] **T021**: **[Integration]** Connect the Home screen to the backend.
- [X] **T022**: **[Integration]** Implement state logic for the `GrowthPartner` component.
- [X] **T023**: **[Integration]** Connect the Progress screen to the backend.
- [X] **T024**: **[Integration]** Connect the Profile screen to the backend.
- [X] **T024a**: **[Integration]** Implement a redirect in the Home page to push unauthenticated users to the `/auth` page.

## Phase 4.5: Unit Tests

- [ ] **T025**: **[P] [Tests]** Write unit tests for `lib/services/challengeService.ts` using Jest, mocking the Prisma client.
- [ ] **T026**: **[P] [Tests]** Write unit tests for the `GrowthPartner` component to verify correct state display based on props.
- [ ] **T027**: **[P] [Tests]** Write unit tests for the `DailyActivityList` component to verify item rendering and interaction handlers.

## Phase 5: Deepening & Polish

- [ ] **T028**: **[P] [Tests]** Write an end-to-end (E2E) UI test using Playwright that automates the manual validation steps in `quickstart.md`.
- [ ] **T029**: **[P] [PWA]** Enhance the PWA service worker (`public/sw.js`) with a proper caching strategy for offline support.
- [ ] **T030**: **[P] [Observability]** Set up a basic logging service (e.g., Logtail or Sentry) to capture frontend and backend errors.
- [ ] **T031**: **[DevOps]** Create a basic CI/CD pipeline using GitHub Actions (`.github/workflows/ci.yml`) to run linting, testing, and building on every push.
- [ ] **T032**: **[Design]** Finalize the visual design and evolution path for the Growth Partner.
- [ ] **T033**: **[Design]** Create and export all required assets (SVGs, Lottie files, or image sprites) for the Growth Partner's states.
- [ ] **T034**: **[UI]** Integrate the final assets from T033 into the GrowthPartner component, replacing the placeholders.

## Dependencies

- **Phase 1** must be completed before **Phase 2** and **Phase 4**.
- **Phase 2** and **Phase 3** can be worked on in parallel to a large extent.
- **Phase 4** depends on the completion of both **Phase 2** and **Phase 3**.
- **Phase 4.5** can begin after Phase 4 is complete.
- **Phase 5** tasks can be started once their related features are stable.