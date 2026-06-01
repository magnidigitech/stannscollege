const fs = require('fs');

const contentRaw = fs.readFileSync('./src/components/research-innovation/staticData.ts', 'utf8');
const match = contentRaw.match(/"research-development-cell":\s*\{\s*"title":\s*".*?",\s*"content":\s*"(.*?)"\s*,\s*"images"/s);

if (match) {
  const content = match[1].replace(/\\n/g, '\n');
  const lines = content.split("\n");
  const nodes = [];
  let i = 0;

  while (i < lines.length) {
    const chunk = lines[i].trim();
    if (!chunk) {
      i++;
      continue;
    }

    if (chunk.startsWith("<table>") || chunk.includes("<table>")) {
      let tableHtml = chunk;
      if (!chunk.includes("</table>")) {
        i++;
        while (i < lines.length && !lines[i].includes("</table>")) {
          tableHtml += "\n" + lines[i];
          i++;
        }
        if (i < lines.length) {
          tableHtml += "\n" + lines[i];
        }
      }
      nodes.push({ type: 'table', text: tableHtml });
      i++;
      continue;
    }

    nodes.push({ type: 'paragraph', text: chunk });
    i++;
  }

  // Find paragraph nodes that might contain HTML tags
  nodes.filter(n => n.type === 'paragraph').forEach(n => {
    if (n.text.includes('<thead') || n.text.includes('<th') || n.text.includes('<td') || n.text.includes('<tr')) {
      console.log("FOUND HTML TAGS IN PARAGRAPH:", n.text);
    }
  });
  
  // Find table nodes
  nodes.filter(n => n.type === 'table').forEach(n => {
    console.log("FOUND TABLE NODE. Length:", n.text.length);
  });
}
