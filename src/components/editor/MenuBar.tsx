import { Editor } from '@tiptap/react';
import { useState } from 'react';

import { PiTextItalicLight, PiTextStrikethroughLight, PiTextUnderlineLight } from 'react-icons/pi';
import { BsCode } from 'react-icons/bs';
import { AiOutlineUnorderedList, AiOutlineOrderedList, AiOutlineBold } from 'react-icons/ai';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { MdHorizontalRule, MdFormatColorText } from 'react-icons/md';

interface Props {
  editor: Editor;
}

const MenuBar = ({ editor }: Props) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleMenuSelect = (selectedMenu: string) => {
    if (menuOpen === selectedMenu) {
      setMenuOpen(null);
    } else {
      setMenuOpen(selectedMenu);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="menus">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <AiOutlineBold size={19} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <PiTextItalicLight />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <PiTextUnderlineLight />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <PiTextStrikethroughLight />
      </button>

      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        본문
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        소제목
      </button> */}

      <div className="editor-menu-items-wrapper" onClick={() => handleMenuSelect('listMenu')}>
        <button>
          <AiOutlineUnorderedList />
        </button>
        <div className={`editor-menu-drop ${menuOpen === 'listMenu' ? 'open' : ''}`}>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <AiOutlineUnorderedList />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            <AiOutlineOrderedList />
          </button>
        </div>
      </div>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <BsCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <BiSolidQuoteAltLeft />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <MdHorizontalRule />
      </button>

      {/* TEXT COLORS */}
      <div className="editor-menu-items-wrapper" onClick={() => handleMenuSelect('colorMenu')}>
        <button>
          <MdFormatColorText />
        </button>
        <div className={`editor-menu-drop ${menuOpen === 'colorMenu' ? 'open' : ''}`}>
          <button
            onClick={() => editor.chain().focus().setColor('#fc4c70').run()}
            className={`editor-text-color color-accent ${
              editor.isActive('textStyle', { color: '#fc4c70' }) ? 'is-active' : ''
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor('#0d0d0d').run()}
            className={`editor-text-color color-black ${
              editor.isActive('textStyle', { color: '#0d0d0d' }) ? 'is-active' : ''
            }`}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
