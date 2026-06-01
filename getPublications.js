const fs = require('fs');

const contentRaw = fs.readFileSync('./src/components/research-innovation/staticData.ts', 'utf8');
const match = contentRaw.match(/"research-publications":\s*\{\s*"title":\s*".*?",\s*"content":\s*"(.*?)"\s*,\s*"images"/s);

if (match) {
  console.log(match[1].substring(0, 1000));
}
