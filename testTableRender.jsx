import React from 'react';
import { renderToString } from 'react-dom/server';
import { ContentRenderer } from './src/components/research-innovation/ContentRenderer.tsx';

try {
  const html = renderToString(<ContentRenderer slug="research-development-cell" />);
  console.log("SUCCESS:", html.substring(0, 100));
} catch (e) {
  console.error("ERROR:", e.message);
}
