const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = '/Users/venkatavivek/stanns/Content/7.Placements & Industry Linkages';
const targetImagesDir = '/Users/venkatavivek/stanns/public/images/placements';
const targetDocsDir = '/Users/venkatavivek/stanns/public/documents/placements';

if (!fs.existsSync(targetImagesDir)) fs.mkdirSync(targetImagesDir, { recursive: true });
if (!fs.existsSync(targetDocsDir)) fs.mkdirSync(targetDocsDir, { recursive: true });
if (!fs.existsSync('/Users/venkatavivek/stanns/src/components/placements')) fs.mkdirSync('/Users/venkatavivek/stanns/src/components/placements', { recursive: true });
if (!fs.existsSync('/Users/venkatavivek/stanns/src/app/placements')) fs.mkdirSync('/Users/venkatavivek/stanns/src/app/placements', { recursive: true });

function extractDocx(filePath) {
    if (!fs.existsSync(filePath)) return '';
    try {
        let html = execSync(`npx mammoth "${filePath}"`, { encoding: 'utf-8', stdio: 'pipe' });
        
        // Convert to markdown-like format used in previous phases
        html = html.replace(/<h1>(.*?)<\/h1>/gi, '## $1\n\n');
        html = html.replace(/<h2>(.*?)<\/h2>/gi, '### $1\n\n');
        html = html.replace(/<h3>(.*?)<\/h3>/gi, '#### $1\n\n');
        html = html.replace(/<p>(.*?)<\/p>/gi, '$1\n\n');
        html = html.replace(/<strong>(.*?)<\/strong>/gi, '__$1__');
        html = html.replace(/<b>(.*?)<\/b>/gi, '__$1__');
        html = html.replace(/<ul>/gi, '\n');
        html = html.replace(/<\/ul>/gi, '\n');
        html = html.replace(/<li>(.*?)<\/li>/gi, '- $1\n');
        html = html.replace(/<ol>/gi, '\n');
        html = html.replace(/<\/ol>/gi, '\n');
        
        // Handle tables
        html = html.replace(/<table>/gi, '\n');
        html = html.replace(/<\/table>/gi, '\n');
        html = html.replace(/<tbody>/gi, '');
        html = html.replace(/<\/tbody>/gi, '');
        html = html.replace(/<tr>/gi, '');
        html = html.replace(/<\/tr>/gi, '\n');
        html = html.replace(/<td>(.*?)<\/td>/gi, '$1\t');
        html = html.replace(/<th>(.*?)<\/th>/gi, '$1\t');

        html = html.replace(/<[^>]*>?/gm, ''); // remove remaining html tags
        html = html.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        // Scrub image base64 bloat
        html = html.replace(/!\[[^\]]*\]\([^)]+\)/gi, "");

        return html.trim().replace(/\n{3,}/g, '\n\n').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    } catch (e) {
        console.error(`Error extracting ${filePath}`);
        return '';
    }
}

function run() {
    const outputData = [];

    const categories = [
        { id: 'training-placements', name: 'Training & Placements', folder: 'I. Training & Placements' },
        { id: 'industry-linkages', name: 'Industry Linkages & Employability', folder: 'II Industry Linakges & Employability' },
        { id: 'internationalization', name: 'Internationalization & Global Outreach', folder: 'III Internationalization & Global Outreach' }
    ];

    for (const cat of categories) {
        let catContent = '';
        const dirPath = path.join(contentDir, cat.folder);
        if (fs.existsSync(dirPath)) {
            const items = fs.readdirSync(dirPath).filter(i => !i.startsWith('~$') && !i.startsWith('.'));
            items.sort((a, b) => {
                const numA = parseInt(a.split('.')[0]);
                const numB = parseInt(b.split('.')[0]);
                if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                return a.localeCompare(b);
            });

            for (const item of items) {
                const fullPath = path.join(dirPath, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    catContent += `__${item.replace(/^\d+\./, '').trim()}__\n\n`;
                    const subItems = fs.readdirSync(fullPath).filter(i => !i.startsWith('~$') && !i.startsWith('.'));
                    for(const sub of subItems) {
                        const subPath = path.join(fullPath, sub);
                        if (sub.endsWith('.docx')) {
                            const html = extractDocx(subPath);
                            if (html) catContent += html + '\n\n';
                        } else if (sub.match(/\.(pdf|doc|xls|xlsx|csv)$/i)) {
                             fs.copyFileSync(subPath, path.join(targetDocsDir, sub));
                             catContent += `Link: /documents/placements/${sub}\n\n`;
                        } else if (sub.match(/\.(jpg|jpeg|png|gif)$/i)) {
                             fs.copyFileSync(subPath, path.join(targetImagesDir, sub));
                        }
                    }
                } else if (item.endsWith('.docx')) {
                    const html = extractDocx(fullPath);
                    if (html) catContent += `__${item.replace(/\.docx$/i, '').replace(/^\d+\./, '').trim()}__\n\n` + html + '\n\n';
                } else if (item.match(/\.(pdf|doc|xls|xlsx|csv)$/i)) {
                    fs.copyFileSync(fullPath, path.join(targetDocsDir, item));
                    catContent += `Link: /documents/placements/${item}\n\n`;
                } else if (item.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    fs.copyFileSync(fullPath, path.join(targetImagesDir, item));
                }
            }
        }

        outputData.push(`
  "${cat.id}": {
    id: "${cat.id}",
    title: "${cat.name}",
    content: "${catContent.trim().replace(/\n/g, '\\n')}"
  }`);
    }

    const tsContent = `export interface PlacementSection {
  id: string;
  title: string;
  content: string;
}

export const staticPlacementSections: Record<string, PlacementSection> = {
  ${outputData.join(',\n')}
};
`;

    fs.writeFileSync('/Users/venkatavivek/stanns/src/components/placements/staticData.ts', tsContent, 'utf8');
    console.log("Extraction successful");
}

run();
