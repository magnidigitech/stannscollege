const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let buildDate = new Date();

try {
  // Check if working tree has uncommitted modifications
  const status = execSync('git status --porcelain', { timeout: 3000, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  if (!status) {
    // Clean repo, use the latest commit timestamp
    const gitDate = execSync('git log -1 --format=%cI', { timeout: 3000, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    if (gitDate) {
      const parsed = new Date(gitDate);
      if (!isNaN(parsed.getTime())) {
        buildDate = parsed;
      }
    }
  } else {
    // Uncommitted changes currently in development
    buildDate = new Date();
  }
} catch {
  buildDate = new Date();
}

// Format date in formal academic style: "11 September 2026"
const day = buildDate.getDate();
const month = buildDate.toLocaleString('en-US', { month: 'long' });
const year = buildDate.getFullYear();
const formattedDate = `${day} ${month} ${year}`;

const buildInfo = {
  timestamp: buildDate.toISOString(),
  formattedDate,
  generatedAt: new Date().toISOString()
};

const targetDir = path.join(__dirname, '..', 'src', 'lib');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(
  path.join(targetDir, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2),
  'utf8'
);

console.log('Generated build-info.json with date:', formattedDate);
