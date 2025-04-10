import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./code-editor.css";

type CodeEditorProps = {};
const CodeEditor: React.FC<CodeEditorProps> = () => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null); // State to store the backend response
  const [error, setError] = useState<string | null>(null); // State to store errors

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: `function solution(input) { return input * 2; }`,
          input: [2, 7, 11, 15],
        }),
      });

      const data = await response.json();
      console.log("Result:", data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="monaco-editor-container">
        <MonacoEditor
          height="100%"
          width="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          defaultValue={`// Write your solution here\nfunction solution() {\n\n}`}
          options={{
            minimap: { enabled: false },
          }}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div className="output-container">
        {output && (
          <div className="output">
            <strong>Ouput:</strong>
            {output}
          </div>
        )}
        {error && (
          <div className="error">
            <strong>Error:</strong>
            {error}
          </div>
        )}
      </div>
    </>
  );
};
export default CodeEditor;
