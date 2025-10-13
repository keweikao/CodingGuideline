
# Feature Specification: 21天愛自己計劃

**Feature Branch**: `004-app`  
**Created**: 2025-09-26  
**Status**: Draft  
**Input**: User description: "打造一個每日陪伴的App，透過可愛角色傳遞「愛自己小任務」，讓使用者在簡單行動中累積幸福感，並提升自我認同感，核心體驗需要具備「提醒 → 行動 → 回饋 → 累積」，使用者每天有三次愛自己的任務。專案名稱：21天愛自己計劃"

## Clarifications

### Session 2025-09-26
- Q: 使用者是否需要註冊帳號來保存他們的長期進度？ → A: 是，強制註冊帳號才能使用 App。
- Q: 每日任務的內容來源是什麼？ → A: 混合模式：主要來自題庫，但會動態調整。
- Q: 21 天計畫結束後，使用者可以做什麼？ → A: 進入一個「持續模式」，每天仍有任務但沒有特定終點。
- Q: 如果使用者中斷了連續紀錄（例如，一天沒有完成任務），應該如何處理？ → A: 寬鬆模式：提供「凍結紀錄」的道具，讓使用者可以偶爾暫停一天而不會中斷連續紀錄。
- Q: 關於每日的任務提醒，使用者偏好哪種方式？ → A: 可自訂時間：使用者可以自行設定偏好的提醒時間。

---

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
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
作為一個希望提升自我認同感與幸福感的使用者，我想要參與一個為期 21 天的「愛自己計畫」。我將使用一個 App，裡面會有一個可愛的虛擬角色，每天提醒我完成三個簡單的「愛自己小任務」。每當我完成任務後，我會收到正向回饋，並能看到我的進度累積，從而在 21 天的旅程中，感覺到自己的進步和價值。

### Acceptance Scenarios
1. **Given** 使用者是第一次開啟 App，**When** 看到註冊畫面並完成註冊，**Then** 看到「21天愛自己計劃」的介紹，並開始第一天的挑戰。
2. **Given** 使用者設定了每日提醒時間，**When** 時間到達，**Then** 收到任務提醒。
3. **Given** 使用者完成一個任務，**When** 在 App 內標示完成，**Then** 收到即時的正面回饋（例如：動畫、鼓勵的話語）且幸福感指標增加。
4. **Given** 使用者完成今日所有任務，**When** 回到主畫面，**Then** 看到角色表達開心的情緒，並顯示今日的成就總結。
5. **Given** 使用者連續多天完成任務，**When** 查看進度頁面，**Then** 能夠看到自己在 21 天計畫中的進度、連續紀錄和累積的幸福感分數。
6. **Given** 使用者完成 21 天計畫，**When** 進入 App，**Then** 收到一份特別的成就報告與角色的祝賀，並可選擇進入「持續模式」。

### Edge Cases
- 如果使用者未使用「凍結紀錄」且一天未完成任務，則連續紀錄歸零，但 21 天計畫的總進度不受影響（即計畫不會延長）。
- 當使用者在離線狀態下完成任務時，系統應如何同步進度？
- 使用者可以透過「凍結紀錄」道具來避免因單日未完成任務而中斷連續紀錄。
- [NEEDS CLARIFICATION: 任務的難易度或類型是否需要個人化設定？]

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: 系統 MUST 提供一個虛擬角色作為使用者的數位夥伴。
- **FR-002**: 系統 MUST 要求使用者註冊帳號才能使用。
- **FR-003**: 系統 MUST 以一個 21 天的週期來組織核心體驗。
- **FR-004**: 系統 MUST 在 21 天計畫的每一天產生三個「愛自己小任務」。
- **FR-005**: 系統 MUST 使用混合模式產生任務：主要來自固定題庫，並根據使用者進度進行動態調整。
- **FR-006**: 系統 MUST 允許使用者自訂每日任務的提醒時間。
- **FR-007**: 使用者 MUST 能夠將任務標示為「已完成」。
- **FR-008**: 系統 MUST 在使用者完成任務後提供即時的正面回饋。
- **FR-009**: 系統 MUST 記錄並展示使用者在 21 天計畫中的進度、任務完成歷史與累積的成就。
- **FR-010**: 虛擬角色的狀態或反應 MUST 能反映使用者的任務完成進度。
- **FR-011**: 系統 MUST 在 21 天計畫結束後，為使用者生成一份成就總結報告。
- **FR-012**: 系統 MUST 在 21 天計畫結束後，提供一個「持續模式」，讓使用者可以繼續接收每日任務。
- **FR-013**: 系統 MUST 提供「凍結紀錄」道具，允許使用者在特定條件下維持連續紀錄，即使某天未完成任務。
- **FR-014**: 虛擬角色的狀態 MUST 根據當日任務完成情況改變：完成 0 個任務為「悲傷」，1-2 個為「中性」，全部完成為「開心」。

### Key Entities *(include if feature involves data)*
- **使用者 (User)**: App 的主要操作者，擁有個人進度與設定。
- **虛擬角色 (Character)**: 陪伴使用者、傳遞任務與回饋的數位夥伴。
- **愛自己小任務 (Self-Love Task)**: 每日生成的具體行動指令。
- **21天計畫 (21-Day Plan)**: 核心的使用者體驗週期，包含每日任務與最終的成就。
- **使用者進度 (User Progress)**: 記錄使用者在計畫中的任務完成歷史、連續紀錄、累積的幸福感等數據。

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [ ] Review checklist passed

---
