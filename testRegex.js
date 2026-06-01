let text = "<table>\n<thead><tr><th>__S. No.__\n\n</th><th>__Name__\n\n</th></tr>\n</thead><tbody><tr><td>1\n\n</td><td>Dr. Sr. Sandhya Thumma\n\n</td></tr>\n</tbody>\n</table>";

let processedHtml = text
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

console.log(processedHtml);
