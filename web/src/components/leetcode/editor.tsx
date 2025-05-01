import Editor, {OnMount} from '@monaco-editor/react';
import { useRef, useState } from 'react';
import * as monaco from 'monaco-editor';



const CodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState("");
  const onMount: OnMount=(editor, monacoInstance) => {
    editorRef.current = editor;
    editor.focus();
  }
  return (
    <div >
        <button className = "bg-pink-600 text-white px-8 py-2 rounded transition mb-4"
        onClick={() => alert("Selecting language")}>
            javascript
        </button>
        {/*  use Monaco */}
        <Editor height="90vh" theme = 'vs-dark' 
        defaultLanguage="javascript" 
        defaultValue={`// Write your solution here\nfunction solution(input) {\n\n}`}
        value = {value}
        onChange={(value) => setValue(value || "")}
        onMount={onMount}
        />
    </div>

  );
};

export default CodeEditor;


