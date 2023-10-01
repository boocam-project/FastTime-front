// import { TextSelection } from '@tiptap/pm/state';
// import { Editor } from '@tiptap/react';
// import { MouseEvent } from 'react';

// interface ToCItem {
//   id: string;
//   level: number;
//   itemIndex: number;
//   textContent: string;
//   isActive: boolean;
//   isScrolledOver: boolean;
// }

// interface ToCItemProps {
//   item: ToCItem;
//   onItemClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
// }

// export const ToCItem = ({ item, onItemClick }: ToCItemProps) => {
//   return (
//     <div
//       className={`toc--item toc--item--level_${item.level}`}
//       style={{
//         '--level': item.level,
//       }}
//     >
//       <a
//         style={{
//           display: 'block',
//           backgroundColor: item.isActive ? 'rgba(0, 0, 0, .05)' : 'transparent',
//           color: item.isScrolledOver && !item.isActive ? '#888' : '#000',
//           borderRadius: '4px',
//         }}
//         href={`#${item.id}`}
//         onClick={(e) => onItemClick(e, item.id)}
//       >
//         {item.itemIndex}. {item.textContent}
//       </a>
//     </div>
//   );
// };

// export const ToCEmptyState = () => {
//   return (
//     <div className="toc--empty_state">
//       <p>Start editing your document to see the outline.</p>
//     </div>
//   );
// };

// interface ToCProps {
//   items: ToCItem[];
//   editor: Editor;
// }

// export const ToC = ({ items = [], editor }: ToCProps) => {
//   if (items.length === 0) {
//     return <ToCEmptyState />;
//   }

//   const onItemClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
//     e.preventDefault();

//     if (editor) {
//       const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
//       const pos = editor.view.posAtDOM(element as Node, 0);

//       const tr = editor.view.state.tr;
//       tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
//       editor.view.dispatch(tr);
//       editor.view.focus();

//       if (history.pushState) {
//         history.pushState(null, '', `#${id}`);
//       }

//       if (!element) return;

//       window.scrollTo({
//         top: element.getBoundingClientRect().top + window.scrollY,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <div className="toc--list">
//       {items.map((item) => (
//         <ToCItem onItemClick={onItemClick} key={item.id} item={item} />
//       ))}
//     </div>
//   );
// };
