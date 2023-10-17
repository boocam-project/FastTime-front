export function convertNodeToHtml(node: any) {
  if (!node) return;
  let textHtml = node.text;

  switch (node.type) {
    case 'paragraph':
      return `<p>${node.content.map(convertNodeToHtml).join('')}</p>`;
    case 'text':
      if (node.marks) {
        node.marks.forEach((mark: any) => {
          switch (mark.type) {
            case 'bold':
              textHtml = `<strong>${textHtml}</strong>`;
              break;
            case 'italic':
              textHtml = `<em>${textHtml}</em>`;
              break;
            case 'underline':
              textHtml = `<u>${textHtml}</u>`;
              break;
            case 'strike':
              textHtml = `<del>${textHtml}</del>`;
              break;
            default:
              console.warn('Unknown mark type:', mark.type);
          }
        });
      }
      return textHtml;
    case 'codeBlock':
      return `<pre><code>${node.content.map(convertNodeToHtml).join('')}</code></pre>`;
    case 'bulletList':
      return `<ul>${node.content.map(convertNodeToHtml).join('')}</ul>`;
    case 'orderedList':
      return `<ol>${node.content.map(convertNodeToHtml).join('')}</ol>`;
    case 'listItem':
      return `<li>${node.content.map(convertNodeToHtml).join('')}</li>`;
    case 'blockquote':
      return `<blockquote>${node.content.map(convertNodeToHtml).join('')}</blockquote>`;
    case 'horizontalRule':
      return '<hr />';
    case 'image':
      return `<img src="${node.attrs.src}" alt="${node.attrs.alt || ''}" title="${
        node.attrs.title || ''
      }" />`;
    default:
      console.warn('Unknown node type:', node.type);
      return '';
  }
}
