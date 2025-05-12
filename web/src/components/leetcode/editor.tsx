import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import * as monaco from "monaco-editor";

// defines code and setCode as props 
type CodeEditorProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

// renders a Monarco Editor 
const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-[900px] overflow-hidden">
      <Editor
          height="100%"
          width="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          defaultValue={`// Write your solution here\nfunction solution(input) {\n\n}`}
          options={{
            minimap: { enabled: false },
          }}
        />
    </div>
  );
};

export default CodeEditor;


