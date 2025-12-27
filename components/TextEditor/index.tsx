"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import TextAlign from "@tiptap/extension-text-align";
import { BiAlignLeft, BiAlignMiddle } from "react-icons/bi";
import { FONT_FAMILIES, FONT_SIZES } from "@/config/constants";
interface TextEditorProps {
  editContent: string;
  setEditContent: (content: string) => void;
}

export default function TextEditor({ editContent, setEditContent }: TextEditorProps) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      TextAlign.configure({
        alignments: ['left', 'center', 'right', 'justify'],
        types: ["heading", "paragraph"],
      }),
    ],
    content: editContent,
    onUpdate: ({ editor }) => {
      setEditContent(editor.getHTML());
    },
  });

  // Handle external content changes
  useEffect(() => {
    if (editor && editContent !== editor.getHTML()) {
      editor.commands.setContent(editContent, false);
    }
  }, [editContent, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="space-y-4 tiptap-wrapper-div">
      {/* Toolbar */}
      <div className="tiptap-menu-topbar">
        {/* Font Family */}
        <select
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          className="cursor-pointer rounded-full bg-gray-200 px-3 py-1"
          defaultValue="Arial"
        >
          {FONT_FAMILIES.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>

        {/* Font Size */}
        <select
          onChange={(e) =>
            editor.chain().focus().setFontSize(e.target.value).run()
          }
          className="border px-2 py-1 rounded-full"
          defaultValue="16px"
        >
          {FONT_SIZES.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="cursor-pointer font-bold px-2 py-1"
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="cursor-pointer italic font-bold px-2 py-1"
        >
          i
        </button>

        {/* Text Align Left */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className="cursor-pointer text-xl px-2 py-1"
        >
          <BiAlignLeft />
        </button>

        {/* Text Align Center */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className="cursor-pointer text-xl px-2 py-1"
        >
          <BiAlignMiddle />
        </button>

        {/* Text Color */}
        <label className="color-picker">
          <input
            type="color"
            onInput={(e) =>
              editor.chain().focus().setColor(e.currentTarget.value).run()
            }
            className=""
          />
        </label>
      </div>

      {/* Editor */}
      <div className="editor-tiptap-wrapper">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
