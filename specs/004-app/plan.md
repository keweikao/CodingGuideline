# Implementation Plan: 21天愛自己計劃

**Branch**: `004-app` | **Date**: 2025-09-26 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `/Users/stephen/Desktop/retro-ui-template-nextjs/specs/004-app/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
   → Verify PNPM usage requirement (Principle I)
   → Confirm CLI script availability (Principle II)
   → Check Next.js framework adherence (Principle III)
   → Validate modern JavaScript standards (Principle IV)
   → Ensure component-driven UI approach (Principle V)
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

## Summary
The feature is a "21-Day Self-Love Plan" companion app. It's a web application built with Next.js, TypeScript, and PostgreSQL. The core experience revolves around a user completing three daily "self-love" tasks, receiving feedback from a virtual character, and tracking their progress over a 21-day cycle. The technical approach will involve a standard Next.js frontend and backend structure, with a RESTful API for handling user data, tasks, and progress.

## Technical Context
**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React, Next.js, Radix UI, Tailwind CSS
**Storage**: PostgreSQL
**Testing**: Jest, Playwright, Testing Library
**Target Platform**: Web browsers, Vercel
**Project Type**: Web application
**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1, API response < 200ms
**Constraints**: Must be mobile-first; all user data encrypted.
**Scale/Scope**: Initial architecture to support 10,000 DAU.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: PNPM-Exclusive CLI Operations**: PASS
- **Principle II: CLI-First Development**: PASS
- **Principle III: Next.js Framework Adherence**: PASS
- **Principle IV: Modern JavaScript Standards**: PASS
- **Principle V: Component-Driven UI Development**: PASS

## Project Structure

### Documentation (this feature)
```
specs/004-app/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
│   ├── register.md
│   ├── login.md
│   ├── get_today_tasks.md
│   ├── complete_task.md
│   ├── get_progress.md
│   ├── use_streak_freeze.md
│   └── update_settings.md
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Web application structure will be used.

app/
├── api/
│   ├── auth/
│   ├── tasks/
│   ├── progress/
│   ├── streak-freeze/
│   └── users/
├── (pages)/
└── ...

components/

hooks/

lib/

__tests__/
├── api/
├── components/
└── integration/
```

**Structure Decision**: Option 2: Web application

## Phase 0: Outline & Research
Completed. See `research.md`.

## Phase 1: Design & Contracts
Completed. See `data-model.md`, `contracts/`, and `quickstart.md`.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base.
- Generate tasks from the design documents (`data-model.md`, `contracts/`, `quickstart.md`).
- For each API contract, create a corresponding API route in Next.js and a contract test.
- For each entity in the data model, create database migration and model implementation tasks.
- For each user scenario in `quickstart.md`, create an integration test.
- Create frontend component and page implementation tasks based on the user stories and functional requirements.

**Ordering Strategy**:
- **Backend First**: Implement database models and migrations, then services, then API endpoints.
- **TDD for Backend**: Write contract and unit tests before implementing the API routes.
- **Frontend after Backend**: Implement frontend components and pages once the backend APIs are available.
- Mark tasks that can be done in parallel with [P].

**Estimated Output**: 30-40 numbered, ordered tasks in `tasks.md`.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.1 - See `/.specify/memory/constitution.md`*