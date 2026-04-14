# Session Handoff Protocol — Zero-Context-Loss Continuity

> UNIQUE to Vibe Elite. Ensures NOTHING is lost between sessions.

## Trigger
User says: "save progress", "end session", "continue later", "handoff", "session end"
Auto-trigger: After every 8-10 turns in a session.

## The Problem
Claude Code sessions lose ALL context when they end.
Without proper handoff, you waste 20-40% of next session re-explaining.

## Handoff Protocol

### When ENDING a Session
Generate a handoff block and append to progress.md:

```markdown
## Session Handoff — [YYYY-MM-DD HH:MM]

### What Was Done
- [bullet list of completed items with file paths]

### What's In Progress  
- [current task, how far along, what's left]

### Open Decisions
- [any decisions that need to be made]
- [options considered and pros/cons if discussed]

### Current State of Code
- [which files were modified]
- [which tests pass/fail]
- [any temp code or TODOs left]

### Next Session Should
1. [first thing to do — most important]
2. [second thing]
3. [third thing]

### Key Context (saves re-reading files)
- [important variable names, function signatures]
- [architecture decisions made this session]
- [gotchas discovered that aren't obvious from code]

### Files Modified This Session
- `path/to/file1.ts` — [what changed]
- `path/to/file2.ts` — [what changed]
```

### When STARTING a New Session
1. Read CLAUDE.md (project rules)
2. Read progress.md (what was done, what's next)
3. Read latest session handoff block
4. If Graphify available, read GRAPH_REPORT.md
5. Start from "Next Session Should" list

## Auto-Tracking Rules

### During Session (Every 3-5 Turns)
Mentally track and be ready to report:
- Files touched so far
- Tasks completed
- Current task progress
- Any blockers or discoveries

### Session Health Indicators
| Indicator | Healthy | Warning | Split Now |
|-----------|---------|---------|-----------|
| Turn count | 1-8 | 9-15 | 16+ |
| Context depth | Shallow | Growing | Overloaded |
| Token usage | < 100K | 100-200K | 200K+ |
| Task focus | Single feature | 2 features | 3+ features |

### When to Recommend Session Split
- Turn count > 12 AND task not near completion
- Context feels "heavy" (re-reading same files)
- Switching to a different feature
- After a major milestone (tests pass, feature complete)

## Output Format (Session End)
```
📋 SESSION HANDOFF
━━━━━━━━━━━━━━━━━━

Duration: ~[X] turns
Completed: [X] tasks
Status: [MILESTONE_REACHED / IN_PROGRESS / BLOCKED]

✅ Done: [quick summary]
🔄 In Progress: [what's partially done]
📌 Next: [top 3 priorities]

Progress.md has been updated.
Start next session with: "Continue from last session"
```
