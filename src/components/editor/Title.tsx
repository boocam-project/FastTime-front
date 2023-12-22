import { mergeAttributes, Node } from '@tiptap/core';

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps {
  level: Level;
  HTMLAttributes: Record<string, any>;
}

const Title = Node.create<TitleProps>({
  name: 'title',

  addOptions() {
    return {
      level: 1,
      HTMLAttributes: {},
    };
  },

  content: 'text*',

  marks: '',

  group: 'block',

  defining: true,

  renderHTML({ HTMLAttributes }) {
    const level = this.options.level;

    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

export default Title;

// const Title = Heading.extend({
//   name: 'title',
//   group: 'title',
//   parseHTML: () => [{ tag: 'h1:first-child' }],
// }).configure({ levels: [1] });
