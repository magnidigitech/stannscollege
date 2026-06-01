const fs = require('fs');
let content = fs.readFileSync('./src/components/research-innovation/staticData.ts', 'utf8');

// The erroneous pattern is `."\n\nLink:` where it should be `.\n\nLink:`
// But wait, some might not have `.` before `"`
content = content.replace(/"\\n\\nLink: \/documents\/research\/(.*?)"/g, '\\n\\nLink: /documents/research/$1"');

fs.writeFileSync('./src/components/research-innovation/staticData.ts', content);
console.log("Fixed quotes");
