import React from "react";
import { staticResearchSections } from "./staticData";

export const ContentRenderer = ({ slug }: { slug: string }) => {
  const data = staticResearchSections[slug];
  if (!data) return <div className="p-8 text-slate-500">Content not found.</div>;

  const content = data.content || "";
  const lines = content.split("\n");
  const nodes: { type: string; text: string }[] = [];
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

    if (chunk.startsWith("Link:")) {
      nodes.push({ type: 'link', text: chunk.replace("Link:", "").trim() });
      i++;
      continue;
    }

    if (chunk.startsWith("<img")) {
      const srcMatch = chunk.match(/src="(.*?)"/);
      const src = srcMatch ? srcMatch[1] : "";
      nodes.push({ type: 'image', text: src });
      i++;
      continue;
    }

    nodes.push({ type: 'paragraph', text: chunk });
    i++;
  }

  const renderText = (text: string) => {
    return text.split(/(__.*?__|\*.*?\*|\[.*?\]\(.*?\))/g).map((part, idx) => {
      if (part.startsWith('__') && part.endsWith('__')) {
        return <strong key={idx} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic text-slate-700">{part.slice(1, -1)}</em>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors">{linkMatch[1]}</a>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-outfit font-black text-[#002147] tracking-tight">
            {data.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mt-4" />
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        {nodes.map((node, idx) => {
          if (node.type === 'table') {
            let processedHtml = node.text
              .replace(/__(.*?)__/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2 transition-colors">$1</a>');

            processedHtml = processedHtml
              .replace('<table>', '<table class="w-full text-left border-collapse">')
              .replace('<thead>', '<thead class="bg-gradient-to-r from-slate-50 to-slate-100/50">')
              .replace(/<th>/g, '<th class="px-6 py-4 font-outfit text-xs md:text-sm uppercase tracking-wider font-bold text-slate-700 border-b border-slate-200">')
              .replace(/<tbody>([\s\S]*?)<\/tbody>/g, (match, tbodyContent) => {
                return '<tbody class="divide-y divide-slate-100">' + 
                  tbodyContent.replace(/<tr>/g, '<tr class="hover:bg-slate-50/50 transition-colors duration-150">')
                              .replace(/<td>/g, '<td class="px-6 py-4 text-sm md:text-base text-slate-600 font-medium leading-relaxed">') + 
                  '</tbody>';
              });

            return (
              <div key={idx} className="my-8 overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
                </div>
              </div>
            );
          }

          if (node.type === 'image') {
            return (
              <div key={idx} className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <img src={node.text} alt="Research content" className="w-full h-auto object-cover" />
              </div>
            );
          }

          if (node.type === 'link') {
            const isPdf = node.text.toLowerCase().endsWith('.pdf');
            
            const formatPdfName = (url: string) => {
              try {
                const filename = url.split('/').pop() || "";
                let name = decodeURIComponent(filename);
                name = name.replace(/\.pdf$/i, '');
                name = name.replace(/_/g, ' ');
                // Remove leading numbers like "1.", "2."
                name = name.replace(/^\d+\./, '');
                name = name.replace(/-/g, ' ');
                name = name.replace(/%26/g, '&');
                // Capitalize properly, handling spaces and ampersands
                name = name.split(' ').filter(Boolean).map(w => {
                  if (w === '&' || w.toLowerCase() === 'and') return '&';
                  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                }).join(' ');
                return name.trim() || "View PDF";
              } catch (e) {
                return "View PDF";
              }
            };
            
            const buttonName = isPdf ? formatPdfName(node.text) : "View Link";

            return (
              <a key={idx} href={node.text} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 mt-4 mr-4 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold transition-all shadow-md hover:shadow-lg w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                <span className="text-sm tracking-wide">{buttonName}</span>
              </a>
            );
          }

          const text = node.text;
          if (text.startsWith('- ') || text.startsWith('* ')) {
            return (
              <div key={idx} className="flex gap-3 my-2 items-start pl-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                <p className="text-slate-600 leading-relaxed text-[15px] md:text-base m-0">
                  {renderText(text.replace(/^[-*]\s/, ''))}
                </p>
              </div>
            );
          }

          if (text.startsWith('__') && text.endsWith('__')) {
            const hText = text.slice(2, -2);
            return (
              <h3 key={idx} className="text-xl md:text-2xl font-outfit font-bold text-slate-800 mt-8 mb-4 tracking-tight flex items-center gap-3">
                {hText}
              </h3>
            );
          }

          return (
            <p key={idx} className="text-slate-600 leading-relaxed text-[15px] md:text-base mb-4">
              {renderText(text)}
            </p>
          );
        })}
      </div>
    </div>
  );
};
