# Feature Specification: 21-Day Self-Love Challenge App

**Feature Branch**: `005-app-21-3`  
**Created**: 2025-10-13
**Status**: Draft  
**Input**: User description: "我想建立一個簡單的 App 主要目的是協助使用者建議愛自己的計畫，持續 21 天，每天使用者要完成 3 個愛自己的事項，你會需要哪些資訊來協助你更清楚我想做什麼呢"

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors (user), actions (start challenge, complete tasks, track progress), data (plan, tasks, progress), constraints (21 days, 3 tasks/day)
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a user seeking to improve my well-being, I want to participate in a guided 21-day self-love challenge. Each day, I want the app to suggest three simple activities for me to complete, so that I can build a consistent habit of self-care and track my journey.

### Acceptance Scenarios
1. **Given** a new user opens the app for the first time, **When** they decide to start the challenge, **Then** the app presents them with Day 1 and three suggested activities.
2. **Given** a user is on Day X of the challenge, **When** they complete an activity, **Then** the app allows them to mark that activity as "done".
3. **Given** a user has completed all 3 activities for Day X, **When** they confirm completion, **Then** the app immediately presents them with the option to start Day X+1.
4. **Given** a user has completed the full 21-day challenge, **When** they open the app after completing Day 21, **Then** the app displays a congratulatory message and a summary of their achievement.

### Edge Cases
- The concept of "missing a day" does not apply. The challenge is self-paced and will wait indefinitely for the user to complete the current day's tasks before advancing to the next day.
- How does the system handle a user wanting to restart the challenge midway through?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST provide a 21-day challenge structure.
- **FR-002**: System MUST suggest 3 unique "self-love" activities to the user for each day of the challenge.
- **FR-003**: Users MUST be able to view their activities for the current day.
- **FR-004**: Users MUST be able to mark individual activities as complete.
- **FR-005**: System MUST track the user's progress throughout the 21-day period (e.g., which days and activities were completed).
- **FR-007**: System MUST fetch the list of self-love activities from a predefined remote JSON file URL.
- **FR-008**: System MUST require users to create an account and log in to start the challenge.
- **FR-009**: System MUST persist all user progress (e.g., current day, completed activities) to a cloud backend, associated with the user's account.
- **FR-010**: The challenge MUST be self-paced. It should only advance to the next day's activities after the user has completed all activities for the current day, regardless of how many calendar days have passed.
- **FR-011**: Users MUST be able to edit the text of a suggested activity.
- **FR-012**: Users MUST be able to replace a suggested activity with a new, custom-written activity.

### Key Entities *(include if feature involves data)*
- **User**: Represents an individual with an account. Key attributes: UserID, Authentication details, Progress, Current Day.
- **Challenge**: Represents the 21-day plan. Key attributes: Start Date, End Date, Status (Ongoing, Completed).
- **Daily Plan**: Represents a single day within the challenge. Key attributes: Day Number (1-21), Associated Activities.
- **Activity**: Represents a single self-love task. Key attributes: Description, Status (Pending, Completed), IsCustom (boolean).

---

## Clarifications

### Session 2025-10-13
- Q: 使用者進度應如何保存？ → A: 雲端帳號
- Q: 每天的建議活動從哪裡來？ → A: 方案 C (混合式): 使用遠端 JSON 檔案
- Q: 如果使用者錯過一天，應如何處理？ → A: 採用「自我進度」模式。挑戰不會因日期自動前進，而是等待使用者完成當前天的所有活動後，才進入下一天。
- Q: 使用者可以自訂或替換建議的活動嗎？ → A: 可以

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [X] No implementation details (languages, frameworks, APIs)
- [X] Focused on user value and business needs
- [X] Written for non-technical stakeholders
- [X] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [X] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [X] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [X] User description parsed
- [X] Key concepts extracted
- [X] Ambiguities marked
- [X] User scenarios defined
- [X] Requirements generated
- [X] Entities identified
- [ ] Review checklist passed

---
