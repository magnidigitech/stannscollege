const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = '/Users/venkatavivek/stanns/stannscollegeforwomen.org/public_html';
const destDir = '/Users/venkatavivek/stanns/public/documents/naac';

// Main pages for the 7 criteria
const mainCriteriaPages = [
  { id: 1, file: 'naac.php', title: 'Criterion I - Curricular Aspects' },
  { id: 2, file: 'naac-criterion2.php', title: 'Criterion II - Teaching-Learning and Evaluation' },
  { id: 3, file: 'naac-criterion3.php', title: 'Criterion III - Research, Innovations and Extension' },
  { id: 4, file: 'naac-criterion4.php', title: 'Criterion IV - Infrastructure and Learning Resources' },
  { id: 5, file: 'naac-criterion5.php', title: 'Criterion V - Student Support and Progression' },
  { id: 6, file: 'naac-criterion6.php', title: 'Criterion VI - Governance, Leadership and Management' },
  { id: 7, file: 'naac-criterion7.php', title: 'Criterion VII - Institutional Values and Best Practices' }
];

const visited = new Set();
let subpageCount = 0;

// Helper to strip HTML tags and whitespace
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Clean document path and format it as `/documents/naac/...`
function cleanDocPath(href) {
  if (!href) return '';
  let h = href.trim();
  
  // Strip trailing target_blank attributes, style strings, trailing HTML brackets/quotes cleanly
  h = h.replace(/["'\s]+target=["']?_blank["']?/gi, '');
  h = h.replace(/["'\s]+style=[\s\S]*$/gi, '');
  h = h.replace(/["'>\s]+$/g, ''); // strip trailing quotes, close brackets or spaces
  h = h.replace(/^["']+/g, '');    // strip leading quotes
  h = h.trim();
  
  if (h === '#' || h === '---' || h === '') return '';
  if (h.toLowerCase().endsWith('.php')) return '';
  
  // If it starts with naac/, map it to /documents/naac/...
  if (h.startsWith('naac/')) {
    return '/' + h.replace('naac/', 'documents/naac/');
  }
  
  // If it's relative to root, copy it if needed
  if (!h.startsWith('/') && !h.startsWith('http')) {
    return '/documents/naac/' + h;
  }
  return h;
}

// Check if a link is a subpage (PHP file in same folder)
function isSubpage(href) {
  if (!href) return false;
  const h = href.toLowerCase().trim().split(' ')[0];
  return h.endsWith('.php') && 
         !h.includes('header.php') && 
         !h.includes('footer.php') && 
         !h.includes('naac-left.php') &&
         !h.includes('naac.php') &&
         !h.includes('naac-criterion') &&
         !h.startsWith('http') &&
         !h.startsWith('//');
}

const docKeywords = [
  'upload', 'provide', 'link', 'document', 'list', 'report', 
  'filled-in', 'supporting', 'copy of', 'evidence', 'brochure', 
  'calendar', 'at least 4', 'institutional data', 'feedback analysis',
  'action taken'
];

function isDocumentRow(desc, numCells) {
  if (numCells === 1) return false; // Single cell is always a header
  if (!desc) return false;
  const d = desc.toLowerCase();
  return docKeywords.some(k => d.includes(k));
}

// Recursively crawl a subpage and return its documents
function crawlSubpage(fileName, metricNum = '') {
  const fileKey = fileName.toLowerCase().trim().split(' ')[0];
  if (visited.has(fileKey)) {
    return [];
  }
  visited.add(fileKey);
  subpageCount++;
  
  console.log(`Crawl Subpage [Visited: ${subpageCount}]: ${fileName} (Metric: ${metricNum})`);
  
  const filePath = path.join(srcDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`  Warning: File not found ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);
  const docs = [];
  
  // Find all table rows
  $('tr').each((_, tr) => {
    if ($(tr).find('table').length > 0) return; // Skip layout wrappers
    
    const cells = $(tr).find('td');
    if (cells.length === 0) return;
    
    const cellTexts = [];
    cells.each((_, td) => {
      cellTexts.push(cleanText($(td).text()));
    });
    
    // Find any anchor tags in this row
    let docUrl = '';
    let phpPage = '';
    $(tr).find('a').each((_, a) => {
      const href = $(a).attr('href');
      if (href) {
        if (isSubpage(href)) {
          phpPage = href;
        } else {
          const cleaned = cleanDocPath(href);
          if (cleaned) docUrl = cleaned;
        }
      }
    });
    
    let description = '';
    let year = '';
    
    if (cellTexts.length >= 3) {
      const sNo = cellTexts[0];
      const desc = cellTexts[1];
      
      // If it looks like a header row, ignore
      if (desc === 'DESCRIPTION' || desc === 'DESCRIPRION' || desc === 'Name of Certificate' || desc === 'LINK TO THE RELEVANT DOCUMENT' || desc === 'Programme') {
        return;
      }
      
      if (sNo && desc) {
        description = desc;
        // Check if there is a year cell
        if (cellTexts.length > 3) {
          year = cellTexts[2];
        }
      }
    } else if (cellTexts.length > 0) {
      description = cellTexts.reduce((max, cur) => cur.length > max.length ? cur : max, '');
    }
    
    description = cleanText(description);
    
    // Skip empty items or "back" links
    if (!description || description.toLowerCase().includes('back to') || description.toLowerCase().includes('leftarrow')) {
      return;
    }
    
    if (docUrl || phpPage) {
      const docItem = {
        name: description,
        year: year || undefined,
        url: docUrl || '',
      };
      
      if (phpPage) {
        const nested = crawlSubpage(phpPage, metricNum);
        if (nested && nested.length > 0) {
          docItem.subDocuments = nested;
        }
      }
      
      docs.push(docItem);
    }
  });
  
  return docs;
}

// Crawl a main Criterion page
function crawlCriterion(criterion) {
  console.log(`\n========================================`);
  console.log(`Parsing Criterion: ${criterion.title} (${criterion.file})`);
  console.log(`========================================`);
  
  const filePath = path.join(srcDir, criterion.file);
  if (!fs.existsSync(filePath)) {
    console.log(`Error: File not found ${filePath}`);
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);
  
  const result = {
    id: criterion.id,
    title: criterion.title,
    sections: []
  };
  
  let currentSection = null;
  let currentMetric = null;
  
  $('tr').each((_, tr) => {
    if ($(tr).find('table').length > 0) return; // Skip layout wrappers
    
    const cells = $(tr).find('td');
    if (cells.length === 0) return;
    
    const cellTexts = [];
    cells.each((_, td) => {
      cellTexts.push(cleanText($(td).text()));
    });
    
    const rowText = cleanText($(tr).text());
    
    // Check if it's a Section Header
    const bgcolor = $(tr).attr('bgcolor') || $(cells[0]).attr('bgcolor') || '';
    const hasSectionBg = bgcolor.toLowerCase() === '#bee2ff' || bgcolor.toLowerCase() === 'bee2ff';
    const isSectionMatch = /^\d+\.\d+\s*[:-]/i.test(rowText) && cells.length === 1;
    
    if (hasSectionBg || isSectionMatch) {
      const text = cleanText(rowText);
      const match = text.match(/^(\d+\.\d+)\s*[:-]\s*(.*)$/i) || [null, '', text];
      
      currentSection = {
        number: match[1] || 'Section',
        title: match[2] || text,
        metrics: []
      };
      result.sections.push(currentSection);
      currentMetric = null;
      return;
    }
    
    // Check if it's a Metric Header
    const isMetricMatch = /^\d+\.\d+\.\d+/i.test(rowText);
    const firstCellText = cellTexts[0] || '';
    const isFirstCellMetric = /^\d+\.\d+\.\d+/i.test(firstCellText);
    
    if (isMetricMatch) {
      const text = cleanText(rowText);
      const firstCellNum = firstCellText.replace(/[:-]/g, '').trim();
      
      // Determine if this is a header row or a document row
      const desc = cellTexts[1] || text;
      const isDoc = isDocumentRow(desc, cells.length);
      
      if (!isDoc) {
        const match = text.match(/^(\d+\.\d+\.\d+)\s*[:-]\s*(.*)$/i) || [null, firstCellNum, text];
        currentMetric = {
          number: match[1] || firstCellNum,
          title: match[2] || text,
          documents: []
        };
        
        if (!currentSection) {
          currentSection = {
            number: currentMetric.number.substring(0, 3),
            title: 'General',
            metrics: []
          };
          result.sections.push(currentSection);
        }
        currentSection.metrics.push(currentMetric);
        return;
      }
    }
    
    // If we have an active metric, extract any document rows under it
    if (currentMetric) {
      let docUrl = '';
      let phpPage = '';
      
      $(tr).find('a').each((_, a) => {
        const href = $(a).attr('href');
        if (href) {
          if (isSubpage(href)) {
            phpPage = href;
          } else {
            const cleaned = cleanDocPath(href);
            if (cleaned) docUrl = cleaned;
          }
        }
      });
      
      if (docUrl || phpPage || (cellTexts.length >= 2 && cellTexts[0] === currentMetric.number)) {
        let label = cellTexts[1] || cellTexts[0] || 'Document';
        if (label === currentMetric.number) label = cellTexts[1] || 'Additional Information';
        
        if (label === currentMetric.title) return;
        
        const docItem = {
          label: cleanText(label),
          documentUrl: docUrl || '',
        };
        
        if (phpPage) {
          const nested = crawlSubpage(phpPage, currentMetric.number);
          if (nested && nested.length > 0) {
            docItem.subDocuments = nested;
          }
        }
        
        currentMetric.documents.push(docItem);
      }
    }
  });
  
  return result;
}

// Run crawler for all criteria
const naacData = [];
mainCriteriaPages.forEach(c => {
  const crawled = crawlCriterion(c);
  if (crawled) {
    naacData.push(crawled);
  }
});

// Output summary
console.log(`\n========================================`);
console.log(`CRAWL COMPLETED SUCCESSFULLY!`);
console.log(`========================================`);
console.log(`Total Subpages Visited: ${subpageCount}`);
console.log(`Visited Subpages List:`, Array.from(visited));

// Save JSON data
const outputJsonPath = '/Users/venkatavivek/stanns/src/components/quality-assurance/naac-data.json';
fs.mkdirSync(path.dirname(outputJsonPath), { recursive: true });
fs.writeFileSync(outputJsonPath, JSON.stringify(naacData, null, 2), 'utf8');
console.log(`Saved structured NAAC data to ${outputJsonPath}`);
