const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, 'Content/8.Research & Innovation');
const targetDataPath = path.join(__dirname, 'src/components/research-innovation/staticData.ts');
const documentsPublicDir = path.join(__dirname, 'public/documents/research');
const imagesPublicDir = path.join(__dirname, 'public/images/research');

// Ensure directories exist
[path.dirname(targetDataPath), documentsPublicDir, imagesPublicDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Map of the 10 sections based on user's prompt
const sectionMapping = {
    "1": "research-development-cell",
    "2": "research-publications",
    "3": "research-supervisors-scholars",
    "4": "research-infrastructure",
    "5": "patents-innovations",
    "6": "funded-projects",
    "7": "centres-of-excellence",
    "8": "ipr-cell",
    "9": "institution-innovation-cell",
    "10": "entrepreneurship-development"
};

const extractedData = {};

function cleanHtml(html) {
    let text = html
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<\/p>/g, '\n\n')
        .replace(/<p[^>]*>/g, '')
        .replace(/<strong>(.*?)<\/strong>/g, '__$1__')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<li>(.*?)<\/li>/g, '- $1\n')
        .replace(/<ul[^>]*>/g, '\n')
        .replace(/<\/ul>/g, '\n')
        .replace(/<ol[^>]*>/g, '\n')
        .replace(/<\/ol>/g, '\n')
        .replace(/<tr[^>]*>/g, '<tr>')
        .replace(/<\/tr>/g, '</tr>\n')
        .replace(/<td[^>]*>/g, '<td>')
        .replace(/<\/td>/g, '</td>')
        .replace(/<table[^>]*>/g, '<table>\n')
        .replace(/<\/table>/g, '\n</table>\n')
        .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');

    return text
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
}

async function processFile(filePath, id) {
    console.log(`Processing file: ${filePath}`);
    const slug = sectionMapping[id];
    
    try {
        const result = await mammoth.convertToHtml({ path: filePath }, {
            ignoreEmptyParagraphs: true,
            styleMap: [
                "p[style-name='Heading 1'] => h1:fresh",
                "p[style-name='Heading 2'] => h2:fresh"
            ]
        });
        
        let content = cleanHtml(result.value);
        if (!extractedData[slug]) {
            extractedData[slug] = {
                title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                content: content,
                images: []
            };
        } else {
            extractedData[slug].content += "\n\n" + content;
        }
    } catch (e) {
        console.error(`Failed processing ${filePath}: ${e.message}`);
    }
}

async function main() {
    console.log('Starting Phase 8 extraction...');
    
    // Process files in the root of 8.Research & Innovation
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
        if (!file.endsWith('.docx') || file.startsWith('~')) continue;
        
        const match = file.match(/^(\d+)\./);
        if (match) {
            const id = match[1];
            if (sectionMapping[id]) {
                await processFile(path.join(sourceDir, file), id);
            }
        }
    }

    // Process policies mapping to respective sections (IPR=8, Entrepreneurship=10, IIC=9, RDC=1)
    const policiesDir = path.join(sourceDir, 'Policieis');
    if (fs.existsSync(policiesDir)) {
        const policies = fs.readdirSync(policiesDir);
        for (const file of policies) {
            if (!file.endsWith('.docx') || file.startsWith('~')) continue;
            let id = null;
            if (file.includes('Research Development Celle')) id = "1";
            else if (file.includes('Entrepreurship Policy')) id = "10";
            else if (file.includes('Institution Innovation Cell')) id = "9";
            else if (file.includes('Intellectual Property Rights')) id = "8";
            
            if (id) {
                await processFile(path.join(policiesDir, file), id);
            }
        }
    }

    // Process Word Research files (these seem to belong to Research Publications=2 and Patents=5)
    const wordResearchDir = path.join(sourceDir, 'Word Research');
    if (fs.existsSync(wordResearchDir)) {
        const wordFiles = fs.readdirSync(wordResearchDir);
        for (const file of wordFiles) {
            if (!file.endsWith('.docx') || file.startsWith('~')) continue;
            let id = null;
            if (file.includes('Patents')) id = "5";
            else if (file.includes('Publications') || file.includes('Research Books') || file.includes('COnfenrece')) id = "2";
            
            if (id) {
                await processFile(path.join(wordResearchDir, file), id);
            }
        }
    }
    
    // Copy PDFs to public documents and append links to the respective sections
    const pdfs = files.filter(f => f.endsWith('.pdf'));
    for (const pdf of pdfs) {
        const targetPdfPath = path.join(documentsPublicDir, pdf);
        fs.copyFileSync(path.join(sourceDir, pdf), targetPdfPath);
        
        let id = null;
        if (pdf.includes('Patents')) id = "5";
        else if (pdf.includes('Publications') || pdf.includes('Books') || pdf.includes('COnfenrece')) id = "2";
        
        if (id) {
            const slug = sectionMapping[id];
            const pdfUrl = `/documents/research/${encodeURIComponent(pdf)}`;
            if (extractedData[slug]) {
                extractedData[slug].content += `\n\nLink: ${pdfUrl}`;
            }
        }
    }

    // Write output to staticData.ts
    const fileContent = `export const staticResearchSections: Record<string, any> = ${JSON.stringify(extractedData, null, 2)};\n`;
    fs.writeFileSync(targetDataPath, fileContent);
    console.log('Extraction complete. Data written to staticData.ts.');
}

main().catch(console.error);
