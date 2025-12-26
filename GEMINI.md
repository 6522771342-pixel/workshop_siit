# GEMINI.md - AI Assistant Guidelines & Project Context

## 📚 Table of Contents
1. Executive Summary
2. Quick Start Guide
3. Project Context
4. Critical Safety Rules
5. Development Environment
6. Development Workflows
7. Context Management & Short Codes
8. Technical Reference
9. Development Practices
10. Lessons Learned
11. Troubleshooting

## Executive Summary
This document provides comprehensive guidelines for the AI assistant working on the **Candy Crush Clone** project. It establishes safe, efficient, and well-documented workflows to ensure high-quality contributions.

### Key Responsibilities
• Code development and implementation (React/TypeScript)
• Testing and quality assurance
• Documentation and session retrospectives
• Following safe and efficient development workflows

### Quick Reference - Short Codes
• `ccc` - Create context issue and compact the conversation.
• `nnn` - Smart planning: Auto-runs `ccc` if no recent context → Create a detailed implementation plan.
• `gogogo` - Execute the most recent plan issue step-by-step.
• `lll` - List project status (issues, PRs, commits) ✅
• `rrr` - Create a detailed session retrospective.

## Quick Start Guide

### Prerequisites
```bash
node --version   # Required
npm --version    # Required
git --version    # Required
```

### Initial Setup
```bash
git clone <repo_url>
cd candy-crush-clone
npm install
# Start Dev Server (Exposed for Cloud IDEs)
npm run dev -- --host 0.0.0.0
```

## Project Context

### Project Overview
A web-based Match-3 puzzle game (Candy Crush style) featuring drag-and-drop mechanics, score tracking, and fluid animations.

### Technical Architecture
- **Core Framework:** React 19 (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Utility-first CSS)
- **Animation:** Framer Motion
- **State Management:** Custom `useGame` hook implementing the game loop, gravity, and matching logic.
- **Data Structure:** 1D Array representing the 2D 8x8 grid for performance optimization.

### Current Features
- **Board:** 8x8 grid with 6 candy colors.
- **Interactions:** Drag and drop candies to swap.
- **Game Logic:**
  - Validates moves (must result in a match).
  - Detects Matches (horizontal/vertical, 3+).
  - Gravity (items fall to fill gaps).
  - Auto-refill (new candies generated at top).
- **UI:** Score display, reactive animations.

## 🔴 Critical Safety Rules

### Repository & Git Usage
• **NEVER** use `-f` or `--force` flags with git commands.
• **NEVER** push directly to `main` without confirmation (simulate branch protection).
• **ALWAYS** create a new branch for features/fixes.
• **NEVER** merge PRs yourself unless explicitly instructed.

### File Operations
• **NEVER** use `rm -rf` without extreme caution. Use `rm -i` or verify paths first.
• **ALWAYS** read files before editing to understand context.

## Development Environment

### Environment Variables
*(None currently required for frontend-only prototype)*

## Development Workflows

### Testing Discipline
1. **Manual Verification:**
   - Run `npm run build` to ensure no TypeScript/Compilation errors.
   - Verify UI responsiveness in the browser.
2. **Linting:**
   - Run `npm run lint` to check for code style issues.

### GitHub Workflow
1. **Context:** Understand the task using `ccc` / `nnn` patterns.
2. **Branch:** `git checkout -b feat/feature-name`
3. **Implement:** Code changes.
4. **Verify:** Build & Test.
5. **Commit:** `git commit -m "feat: description"`
6. **Push:** `git push -u origin feat/feature-name`

## Context Management & Short Codes

### Core Short Codes
#### `ccc` - Create Context & Compact
Save current session state to a GitHub Issue (or local file if offline) and compact conversation context.

#### `nnn` - Next Task Planning
Analyze the situation and create a detailed implementation plan *before* coding.

#### `lll` - List Project Status
Run `git status`, check recent commits, and list active tasks.

#### `rrr` - Retrospective
Document the session's learnings. **MANDATORY** for long sessions.

## Technical Reference

### Common Commands
```bash
# Start Server (accessible)
npm run dev -- --host 0.0.0.0

# Build
npm run build

# Lint
npm run lint
```

## Lessons Learned

### Project Specific (Candy Crush Clone)
- **Tailwind CSS Versioning:** Vite templates often default to PostCSS configs incompatible with Tailwind v4. We pinned `tailwindcss@3.4.17` to ensure stability.
- **Cloud IDE Networking:** Background servers (`&`) in Cloud IDEs can be flaky. Always use `--host 0.0.0.0` to ensure ports are reachable from the host machine.
- **React 19 Typing:** Strict TypeScript enforcement in React 19 require careful typing of Event Handlers.
- **Algorithm:** Using a 1D array for the board simplifies serialization and rendering but requires index math (`index % width`, `Math.floor(index / width)`) for neighbor checking.

### Generic AI Patterns
- **Parallel Agents:** Delegating deep analysis to sub-agents saves context window.
- **Phased Implementation:** Breaking complex features (like "Game Logic") into "Board Setup", "Move Validation", and "Gravity" steps prevents code overload.
- **Lockfiles:** Always check `package-lock.json` consistency after installs.

## Troubleshooting

### Common Issues
- **Vite "Network not accessible":** Add `--host` flag.
- **Tailwind classes not applying:** Check `content` array in `tailwind.config.js`.
- **"PostCSS" errors during build:** Ensure `tailwindcss` and `autoprefixer` are installed as dev dependencies and `postcss.config.js` is present.

---
*Last Updated: 2025-12-26*