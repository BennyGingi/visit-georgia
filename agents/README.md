# QA Agent System

Automated bug finding and fixing system using two AI agents that work sequentially.

## 📁 Files

- **`agent1-bugfinder.md`** - QA Bug Finder agent instructions
- **`agent2-autofixer.md`** - Auto Fixer agent instructions
- **`run-qa.sh`** - Shell script that runs both agents sequentially
- **`qa-log.txt`** - Generated log file (created when run-qa.sh executes)

## 🚀 Quick Start

### Run the entire QA system:
```bash
cd /home/benny/projects/visit-georgia
./agents/run-qa.sh
```

This will:
1. ✅ Run Agent 1 (Bug Finder) - Scans entire codebase
2. ✅ Create `/BUGS.md` with all findings
3. ✅ Run Agent 2 (Auto Fixer) - Fixes issues automatically
4. ✅ Update BUGS.md with fix status
5. ✅ Generate final summary

### Run in background:
```bash
nohup ./agents/run-qa.sh > agents/qa-output.log 2>&1 &
```

Then monitor progress:
```bash
tail -f agents/qa-output.log
# or
tail -f agents/qa-log.txt
```

## 🤖 Agent 1: Bug Finder

### What it does:
- ✅ Runs `npx tsc --noEmit` for TypeScript errors
- ✅ Runs `npm run build` for compilation errors
- ✅ Checks ALL components for missing translations (EN/HE/RU)
- ✅ Verifies WhatsApp links and internal routes
- ✅ Checks accessibility (alt tags, aria-labels, keyboard nav)
- ✅ Finds unused imports and dead code
- ✅ Checks mobile responsiveness
- ✅ Verifies all pages load correctly

### Output:
Creates `/BUGS.md` with severity levels:
- 🔴 **CRITICAL** - Build failures, broken core features
- 🟠 **HIGH** - Missing translations, accessibility issues
- 🟡 **MEDIUM** - Code quality, minor issues
- 🔵 **LOW** - Style, optimizations

### Example BUGS.md entry:
```markdown
### CRITICAL: TypeScript error in BookingForm
- **File**: `components/BookingForm.tsx:123`
- **Severity**: 🔴 CRITICAL
- **Issue**: Property 'foo' does not exist on type 'Bar'
- **Impact**: Breaks production build
- **Suggested Fix**: Add 'foo' property to Bar interface
- **Status**: 🔴 Open
```

## 🔧 Agent 2: Auto Fixer

### What it does:
- ✅ Reads all issues from `/BUGS.md`
- ✅ Fixes issues by priority: CRITICAL → HIGH → MEDIUM → LOW
- ✅ Updates BUGS.md status after each fix
- ✅ Runs `npm run build` to verify fixes
- ✅ Generates fix summary

### What it fixes automatically:
- ✅ TypeScript errors (adds types, fixes mismatches)
- ✅ Missing translations (adds translation keys)
- ✅ Unused imports (removes them)
- ✅ Missing alt tags (adds descriptive text)
- ✅ Missing aria-labels (adds appropriate labels)
- ✅ Dead code (removes unused code)
- ✅ Console.log statements (removes debug logs)
- ✅ Simple accessibility fixes

### What it WON'T fix:
- ❌ Major architectural changes
- ❌ Business logic decisions
- ❌ Significant behavior changes
- ❌ Anything uncertain

Issues it can't fix are marked as "Needs Manual Review"

### Updated BUGS.md entry after fix:
```markdown
### CRITICAL: TypeScript error in BookingForm
- **File**: `components/BookingForm.tsx:123`
- **Severity**: 🔴 CRITICAL
- **Issue**: Property 'foo' does not exist on type 'Bar'
- **Impact**: Breaks production build
- **Suggested Fix**: Add 'foo' property to Bar interface
- **Status**: 🟢 Fixed
- **Fixed By**: Agent 2 - Added 'foo: string' to Bar interface
- **Fixed At**: 2024-03-15 14:30:22
```

## 📊 Output Files

### `/BUGS.md`
Complete bug report with:
- Summary of all issues by severity
- Detailed issue descriptions
- Fix status for each issue
- Final summary with statistics

### `/agents/qa-log.txt`
Complete execution log with:
- Timestamps
- Agent outputs
- Build results
- Error messages

## 🎯 Usage Scenarios

### Scenario 1: Before Deployment
```bash
# Run full QA check
./agents/run-qa.sh

# Review BUGS.md
cat BUGS.md

# If critical issues remain, fix manually
# Then redeploy
```

### Scenario 2: After Major Changes
```bash
# Make your code changes
git add .
git commit -m "feat: new feature"

# Run QA check
./agents/run-qa.sh

# Review and fix any issues
cat BUGS.md

# Commit fixes if needed
git add .
git commit -m "fix: address QA issues"
```

### Scenario 3: Scheduled QA
```bash
# Add to crontab for daily runs
# crontab -e
0 2 * * * cd /home/benny/projects/visit-georgia && ./agents/run-qa.sh >> agents/cron.log 2>&1
```

### Scenario 4: CI/CD Integration
```yaml
# .github/workflows/qa-check.yml
name: QA Check
on: [push, pull_request]
jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: ./agents/run-qa.sh
      - run: cat BUGS.md
```

## 🔍 Manual Agent Runs

### Run only Agent 1 (Bug Finder):
```bash
claude --print "You are Agent 1: QA Bug Finder. Read /agents/agent1-bugfinder.md and execute all instructions."
```

### Run only Agent 2 (Auto Fixer):
```bash
# Make sure BUGS.md exists first!
claude --print "You are Agent 2: Auto Fixer. Read /agents/agent2-autofixer.md and execute all instructions."
```

## 📝 Customizing Agents

### Add custom checks to Agent 1:
Edit `agent1-bugfinder.md` and add new steps under "Execution Steps"

### Customize fix behavior in Agent 2:
Edit `agent2-autofixer.md` and update "Fixing Guidelines"

### Modify the runner script:
Edit `run-qa.sh` to change execution flow, logging, or add hooks

## 🐛 Troubleshooting

### "claude command not found"
```bash
# Install Claude Code CLI
# Follow instructions at: https://claude.com/code
```

### Agent 1 doesn't create BUGS.md
- Check if TypeScript/build commands work: `npx tsc --noEmit`
- Review `agents/qa-log.txt` for errors
- Run Agent 1 manually to see detailed output

### Agent 2 doesn't fix issues
- Verify BUGS.md exists: `ls -la BUGS.md`
- Check if issues are marked as fixable (not too complex)
- Review `agents/qa-log.txt` for error messages

### Build fails after fixes
- Agent 2 should revert bad fixes automatically
- Check `BUGS.md` for "Attempted - Failed" status
- Manually review recent changes in git

### Script permission denied
```bash
chmod +x agents/run-qa.sh
```

## 📈 Best Practices

1. **Run regularly**: Run QA checks before commits and deployments
2. **Review fixes**: Always review what Agent 2 changed
3. **Manual review**: Check issues marked "Needs Manual Review"
4. **Version control**: Commit BUGS.md to track issues over time
5. **Iterate**: Fix critical issues first, then re-run for lower priorities

## 🎓 Example Workflow

```bash
# 1. Make changes to your code
vim components/BookingForm.tsx

# 2. Run QA system
./agents/run-qa.sh

# 3. Review findings
cat BUGS.md | grep "🔴 CRITICAL"

# 4. If critical issues remain, fix manually
vim components/BookingForm.tsx

# 5. Re-run to verify
./agents/run-qa.sh

# 6. Commit when clean
git add .
git commit -m "fix: resolved all critical issues"
```

## 📚 Additional Resources

- Agent 1 Details: See `agent1-bugfinder.md`
- Agent 2 Details: See `agent2-autofixer.md`
- Script Source: See `run-qa.sh`
- Execution Logs: See `qa-log.txt` (generated)

---

**Happy Bug Hunting! 🐛🔍🔧**
