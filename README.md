This README documents the following:
○ What was broken
○ What I fixed
○ Any trade-offs or assumptions made
○ Small UX improvements

What Was Broken
Critical Game-Breaking Bugs:
1. Uninitialized Game State
Issue: customer and remainingLives variables were undefined
Impact: Game crashed immediately on start with TypeError: Cannot read properties of undefined
Fix: define and initialise the values

2. Non-Functional SUBMIT Button
Issue: Button calculated change totals but never validated or updated game state
Impact: Game was completely unplayable - no way to submit answers or progress
Fix: Implemented SUBMIT Button Logic:

3. Null Safety Issues
Issue: Direct access to cash[x] without null checks
Impact: Runtime errors during state transitions and hot reloads
Fix: added null safety checks 

UX Improvements:
1.  Enhanced progression and game over experience
Issue: Basic alert() with no replay or proper level progression
Impact: No way to continue playing or advance to next level
Fix: Interactive confirm dialogues that gives users the option to continue playing or to stop

2. Show game instruction only on first game render
Justification: smoother transition to gameplay rather than having to click "start" at the instruction page everytime

3. Layout
Description: single background image in the center of the page
Future improvements: responsive layout

Assumptions made:
1. whether a player can retry a level after failing it, or they return to start from level 1
Chosen game design:
If players successfully complete a level, they can choose to advance to next level or restart
If players fail a level, they have the pption to retry same level
If players completed all levels, they have the option to restart from Level 1
Justification: minimise frustration and maintain high engagement with users, supports learning curve for each level,
matches mordern game design of checkpoint systems 

1. Session-Based Instruction Display
Instructions show once per browser session
Design choice: balance between UX and not overwhelming returning users

Trade-offs:
1. Browser confirm() vs Custom Modal
Chosen: Native confirm() dialog
Trade-off: Less polished UI but simpler and faster implementation
Why: Faster to implement, accessible, works everywhere
Future improvements: Could replace with custom React modal for better UIUX

