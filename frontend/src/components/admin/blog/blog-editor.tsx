"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import {
  Bold,
  Heading2,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  Table2,
  Undo,
} from "lucide-react";

type BlogEditorProps = {
  name: string;
  defaultValue?: string;
};

export default function BlogEditor({
  name,
  defaultValue = "",
}: BlogEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] rounded-b-2xl border border-t-0 border-border bg-background px-5 py-4 text-sm leading-7 text-foreground outline-none prose prose-sm dark:prose-invert max-w-none [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3",
      },
    },
  });

  if (!editor) return null;

  function setLink() {
    const url = window.prompt("Enter URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  }

  function setImage() {
    const url = window.prompt("Enter image URL");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  function insertTable() {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }

  return (
    <div>
      <input type="hidden" name={name} value={editor.getHTML()} readOnly />

      <div className="flex flex-wrap gap-2 rounded-t-2xl border border-border bg-muted/40 p-3">
        <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold />} label="Bold" />
        <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic />} label="Italic" />
        <ToolbarButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={<Heading2 />} label="Heading" />
        <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List />} label="Bullet List" />
        <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered />} label="Number List" />
        <ToolbarButton active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote />} label="Quote" />
        <ToolbarButton active={editor.isActive("link")} onClick={setLink} icon={<Link />} label="Link" />
        <ToolbarButton active={false} onClick={setImage} icon={<Image />} label="Image" />
        <ToolbarButton active={editor.isActive("table")} onClick={insertTable} icon={<Table2 />} label="Table" />
        <ToolbarButton active={false} onClick={() => editor.chain().focus().undo().run()} icon={<Undo />} label="Undo" />
        <ToolbarButton active={false} onClick={() => editor.chain().focus().redo().run()} icon={<Redo />} label="Redo" />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition [&_svg]:h-4 [&_svg]:w-4 ${
        active
          ? "border-[#EBCB4C] bg-[#EBCB4C] text-black"
          : "border-border bg-background text-muted-foreground hover:border-[#EBCB4C]/50 hover:text-[#EBCB4C]"
      }`}
    >
      {icon}
    </button>
  );
}