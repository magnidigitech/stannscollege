const fs = require('fs');

const file = 'src/components/research-innovation/staticData.ts';
let content = fs.readFileSync(file, 'utf8');

const mapping = {
  "research-development-cell": "1.research_development_celle_policy.pdf",
  "research-publications": "2.research_publications.pdf",
  "research-supervisors-scholars": "3.research_supervisors_-scholars.pdf",
  "research-infrastructure": "4.research_infrastructure.pdf",
  "patents-startups-innovations": "5.patents.pdf",
  "funded-projects-consultancy": "6.funded_projects.pdf",
  "centres-of-excellence-research-chairs": "7.centres_of_excellence.pdf",
  "intellectual-property-rights-cell": "8.intellectual_property_rights_ipr_policy_-_committee.pdf",
  "institution-innovation-cell": "9.institution_innovation_council.pdf",
  "entrepreneurship-development-cell": "entrepreurship_policy.pdf"
};

for (const [slug, pdf] of Object.entries(mapping)) {
  const regex = new RegExp(`("${slug}":\\s*{\\s*"title":\\s*".*?",\\s*"content":\\s*"(.*?))"(?=\\s*,\\s*"images")`, 's');
  content = content.replace(regex, (match, p1, p2) => {
    // If it already has a Link:, we might want to replace it or append
    let newP2 = p2;
    if (newP2.includes('Link:')) {
      newP2 = newP2.replace(/\\n\\nLink:.*?(?=\\n|$)/g, '');
    }
    return `${p1}\\n\\nLink: /documents/research/${pdf}"`;
  });
}

fs.writeFileSync(file, content);
console.log("Done");
