#!/bin/bash

#############################################
# QA Agent Runner
# Runs Bug Finder (Agent 1) then Auto Fixer (Agent 2)
# Uses claude -p (non-interactive pipe mode)
#
# Usage:
#   ./agents/run-qa.sh                                          # foreground
#   nohup ./agents/run-qa.sh > agents/qa-output.log 2>&1 &     # background
#############################################

# Set working directory to project root
cd "$(dirname "$0")/.." || exit 1

# Log file
LOG_FILE="agents/qa-log.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Clear previous log
> "$LOG_FILE"

log() {
    echo "$1" | tee -a "$LOG_FILE"
}

log "========================================"
log "QA Agent System - Starting"
log "========================================"
log "Started at: $TIMESTAMP"
log "Working directory: $(pwd)"
log ""

# Check if claude command exists
if ! command -v claude &> /dev/null; then
    log "ERROR: 'claude' command not found. Install Claude Code CLI first."
    exit 1
fi

#############################################
# Phase 1: Run Agent 1 (Bug Finder)
#############################################

log "========================================"
log "Phase 1: Running Bug Finder (Agent 1)"
log "========================================"
log ""

AGENT1_START=$(date +%s)

AGENT1_PROMPT="Read agents/agent1-bugfinder.md and execute ALL instructions. Run npx tsc --noEmit, pnpm run build, check all components for missing translations in EN/HE/RU, check all links, check accessibility, find unused imports and dead code. Write ALL findings to BUGS.md with severity levels (CRITICAL/HIGH/MEDIUM/LOW), file paths, line numbers, issues, suggested fixes, and status 🔴 Open. Be thorough and check every file."

echo "$AGENT1_PROMPT" | env -u CLAUDECODE claude -p \
  --allowedTools "Bash(npx tsc:*)" "Bash(pnpm:*)" "Bash(npm:*)" "Read" "Write" "Edit" "Glob" "Grep" \
  2>&1 | tee -a "$LOG_FILE"

AGENT1_EXIT=${PIPESTATUS[1]}
AGENT1_END=$(date +%s)
AGENT1_DURATION=$(( AGENT1_END - AGENT1_START ))

log ""
log "Agent 1 finished in ${AGENT1_DURATION}s with exit code: $AGENT1_EXIT"

if [ $AGENT1_EXIT -ne 0 ]; then
    log "ERROR: Agent 1 failed"
    exit 1
fi

# Check if BUGS.md was created
if [ ! -f "BUGS.md" ]; then
    log "ERROR: BUGS.md was not created by Agent 1"
    exit 1
fi

log "BUGS.md created successfully"
log ""

# Show summary
if grep -q "CRITICAL\|HIGH\|MEDIUM\|LOW" BUGS.md 2>/dev/null; then
    log "Bug counts:"
    log "  CRITICAL: $(grep -c 'CRITICAL' BUGS.md 2>/dev/null || echo 0)"
    log "  HIGH:     $(grep -c 'HIGH' BUGS.md 2>/dev/null || echo 0)"
    log "  MEDIUM:   $(grep -c 'MEDIUM' BUGS.md 2>/dev/null || echo 0)"
    log "  LOW:      $(grep -c 'LOW' BUGS.md 2>/dev/null || echo 0)"
fi
log ""

# Brief pause between agents
sleep 3

#############################################
# Phase 2: Run Agent 2 (Auto Fixer)
#############################################

log "========================================"
log "Phase 2: Running Auto Fixer (Agent 2)"
log "========================================"
log ""

AGENT2_START=$(date +%s)

AGENT2_PROMPT="Read agents/agent2-autofixer.md and execute ALL instructions. Read BUGS.md, fix all CRITICAL issues first then HIGH issues. After each fix, update BUGS.md status from 🔴 to 🟢 with details of what was changed. Run pnpm run build after fixing to verify. Add a Fix Summary section at the end of BUGS.md."

echo "$AGENT2_PROMPT" | env -u CLAUDECODE claude -p \
  --allowedTools "Bash(npx tsc:*)" "Bash(pnpm:*)" "Bash(npm:*)" "Read" "Write" "Edit" "Glob" "Grep" \
  2>&1 | tee -a "$LOG_FILE"

AGENT2_EXIT=${PIPESTATUS[1]}
AGENT2_END=$(date +%s)
AGENT2_DURATION=$(( AGENT2_END - AGENT2_START ))

log ""
log "Agent 2 finished in ${AGENT2_DURATION}s with exit code: $AGENT2_EXIT"

if [ $AGENT2_EXIT -ne 0 ]; then
    log "ERROR: Agent 2 failed"
    exit 1
fi

#############################################
# Final Summary
#############################################

log ""
log "========================================"
log "QA Agent System - Complete"
log "========================================"

FINISH_TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
TOTAL_DURATION=$(( AGENT2_END - AGENT1_START ))

log "Completed at: $FINISH_TIMESTAMP"
log "Total duration: ${TOTAL_DURATION}s"
log ""
log "Reports:"
log "  Bug Report: BUGS.md"
log "  Full Log:   $LOG_FILE"

exit 0
