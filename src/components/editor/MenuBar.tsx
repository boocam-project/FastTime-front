import { Editor } from '@tiptap/react';
import { ChangeEvent, useEffect, useState } from 'react';

import { PiTextItalicLight, PiTextStrikethroughLight, PiTextUnderlineLight } from 'react-icons/pi';
import { BsCode, BsCardImage } from 'react-icons/bs';
import { AiOutlineUnorderedList, AiOutlineOrderedList, AiOutlineBold } from 'react-icons/ai';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { MdHorizontalRule, MdFormatColorText } from 'react-icons/md';
import useBlobUrl from '../../hooks/useBlobUrl';
import { TextSelection } from '@tiptap/pm/state';

interface Props {
  editor: Editor;
}

const MenuBar = ({ editor }: Props) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const { url, createBlobUrl } = useBlobUrl();

  useEffect(() => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();

      const { to } = editor.state.selection;
      const tr = editor.state.tr.insert(to, editor.schema.nodes.paragraph.create());
      editor.view.dispatch(tr.setSelection(TextSelection.create(tr.doc, to + 1)));

      editor.view.focus();
    }
  }, [url, editor]);

  const handleMenuSelect = (selectedMenu: string) => {
    if (menuOpen === selectedMenu) {
      setMenuOpen(null);
    } else {
      setMenuOpen(selectedMenu);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    createBlobUrl(file);

    e.target.value = '';
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

      <div className="divider"></div>
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

      <div className="divider"></div>
      {/* 인풋 컴포넌트에서 따로 조작 가능하도록 */}
      <button>
        <label
          style={{ display: 'flex', alignContent: 'center', cursor: 'pointer' }}
          htmlFor="image"
        >
          <BsCardImage />
        </label>
        <input
          style={{ display: 'none' }}
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </button>
    </div>
  );
};

export default MenuBar;
