# Cashier Chaos - Bug Fixes & Documentation

## Overview
This repository contains the debugged and enhanced version of the **Cashier Chaos** game, a React-based cashier simulation where players must accurately calculate and return change to customers under time pressure.

---

## What This README Documents
- What was broken
- What I fixed
- Trade-offs and assumptions made
- UX improvements

---

## What Was Broken

### Critical Game-Breaking Bugs:

#### 1. Uninitialized Game State
- **Issue:** `customer` and `remainingLives` variables were undefined
- **Impact:** Game crashed immediately on start with `TypeError: Cannot read properties of undefined`
- **Fix:** Defined and initialized the values in `Game.tsx`

#### 2. Non-Functional SUBMIT Button
- **Issue:** Button calculated change totals but never validated or updated game state
- **Impact:** Game was completely unplayable - no way to submit answers or progress
- **Fix:** Implemented SUBMIT button validation logic in `CashierChaos.tsx`

#### 3. Null Safety Issues
- **Issue:** Direct access to `cash[x]` without null checks
- **Impact:** Runtime errors during state transitions and hot reloads
- **Fix:** Added null safety checks using optional chaining (`cash?.[x]`)

---

## UX Improvements

### 1. Enhanced Progression and Game Over Experience
- **Issue:** Basic `alert()` with no replay or proper level progression
- **Impact:** No way to continue playing or advance to next level
- **Fix:** Interactive confirm dialogues that give users the option to continue playing or to stop

### 2. Show Game Instructions Only on First Render
- **Justification:** Smoother transition to gameplay rather than having to click "Start" at the instruction page every time

### 3. Layout Improvements
- **Description:** Single background image centered on the page
- **Future Improvements:** Responsive layout for different screen sizes

---

## Assumptions Made

### 1. Allow Players to Retry the Same Level After Failing

**Chosen Game Design:**
- If players successfully complete a level, they can choose to advance to next level or restart
- If players fail a level, they have the option to retry same level
- If players completed all levels, they have the option to restart from Level 1

**Justification:**
- Minimizes frustration and maintains high engagement with users
- Supports learning curve for each level
- Matches modern game design patterns with checkpoint systems

### 2. Session-Based Instruction Display
- Instructions show once per browser session
- **Design Choice:** Balance between UX and not overwhelming returning users

---

## Trade-offs

### 1. Browser `confirm()` vs Custom Modal
- **Chosen:** Native `confirm()` dialog
- **Trade-off:** Less polished UI but simpler and faster implementation
- **Why:** Faster to implement, accessible, works everywhere
- **Future Improvements:** Could replace with custom React modal for better UI/UX

---

## How to Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000
```
