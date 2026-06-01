const fs = require('fs');

const file = 'src/components/research-innovation/staticData.ts';
let content = fs.readFileSync(file, 'utf8');

const mapping = {
  "patents-innovations": "5.patents.pdf",
  "funded-projects": "6.funded_projects.pdf",
  "centres-of-excellence": "7.centres_of_excellence.pdf",
  "ipr-cell": "8.intellectual_property_rights_ipr_policy_-_committee.pdf",
  "entrepreneurship-development": "entrepreurship_policy.pdf"
};

for (const [slug, pdf] of Object.entries(mapping)) {
  const regex = new RegExp(`("${slug}":\\s*{\\s*"title":\\s*".*?",\\s*"content":\\s*"(.*?))"(?=\\s*,\\s*"images")`, 's');
  content = content.replace(regex, (match, p1, p2) => {
    let newP2 = p2;
    if (newP2.includes('Link:')) {
      newP2 = newP2.replace(/\\n\\nLink:.*?(?=\\n|$)/g, '');
    }
    // ensure p1 is replaced with cleaned p2
    const cleanP1 = match.replace(p2, newP2);
    return `${cleanP1}\\n\\nLink: /documents/research/${pdf}"`;
  });
}

fs.writeFileSync(file, content);
console.log("Done");
