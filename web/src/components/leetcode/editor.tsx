import Editor, { OnMount } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState("");

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-[900px] overflow-hidden">
        {/* Need to enable multi-language selecting */}
        <button
className="bg-pink-600 text-white px-8 py-2 rounded transition mb-4"
        onClick={() => alert("Selecting language")}
>
            javascript
        </button>
        {/* Use Monaco */}
        <Editor
height="100%" // Ensure the editor takes up the full height of its container
theme="vs-dark" 
        defaultLanguage="javascript" 
        defaultValue={`// Write your solution here\nfunction solution(input) {\n\n}`}
        value={value}
        onChange={(value) => setValue(value || "")}
        onMount={onMount}
options={{
          scrollBeyondLastLine: false, // Prevent scrolling past the last line 
scrollBeyondLastColumn: 5, // Allow slight horizontal scrolling
          wordWrap: "on", // Enable word wrapping
          minimap: { enabled: false }, // Optional: Disable the minimap to save space
        }}
      />
    </div>
  );
};

export default CodeEditor;


