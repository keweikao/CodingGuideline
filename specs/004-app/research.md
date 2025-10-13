# Phase 0: Outline & Research

This document outlines the research conducted to resolve ambiguities in the technical context and inform design decisions.

## Research Areas

### 1. Performance Goals
- **Task**: Research best practices for web app performance, specifically for a Next.js application with interactive, real-time elements.
- **Findings**:
    - **LCP (Largest Contentful Paint)**: Aim for < 2.5 seconds.
    - **FID (First Input Delay)**: Aim for < 100 milliseconds.
    - **CLS (Cumulative Layout Shift)**: Aim for < 0.1.
    - **Server Response Time**: Aim for < 200ms for API calls.
- **Decision**: Adopt these standard Web Vitals as performance goals.

### 2. Technical Constraints
- **Task**: Research common constraints for a companion app.
- **Findings**: The primary constraints are around user engagement and data privacy.
The app should be lightweight and fast to encourage daily use. All user data must be handled securely.
- **Decision**: 
    - The application must be fully functional on mobile web browsers.
    - All user-related data must be encrypted at rest and in transit.

### 3. Scale/Scope
- **Task**: Research typical user scale for a new mobile-first web app.
- **Findings**: A new application should be prepared to handle 1,000 to 10,000 daily active users within the first few months.
- **Decision**: The initial architecture should support up to 10,000 DAU with the ability to scale horizontally.

### 4. Storage
- **Task**: Confirm PostgreSQL is a good choice for this type of application.
- **Findings**: PostgreSQL is a robust, open-source relational database with strong support for JSON data types, which is suitable for storing user progress and settings. It is well-supported by Vercel and other hosting platforms.
- **Decision**: Use PostgreSQL as the primary database.
