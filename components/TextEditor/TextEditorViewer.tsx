import { useEffect } from "react";
export default function TextEditorViewer({ value = "" }) {
    return (
        <div
            className="tiptap-wrapper-div text-editor-viewer tiptap-viewer whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: value ?? "" }}
        />
    );
}
