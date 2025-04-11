import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./code-editor.css";

type CodeEditorProps = {};
const CodeEditor: React.FC<CodeEditorProps> = () => {
  const [code, setCode] = useState<string>(""); // store user input
  const [output, setOutput] = useState<string | null>(null); // State to store the backend response
  const [error, setError] = useState<string | null>(null); // State to store errors
  const PORT = 8080; // Default port for the backend
  const handleSubmit = async () => {
    try {
      const wrappedCode = `${code}`;
      const response = await fetch(`http://localhost:${PORT}/api/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: wrappedCode,
          input: [2, 7, 11, 15],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOutput(data.result); // Display the result
        setError(null); // Clear any previous errors
      } else {
        setError(data.error || "An error occurred while executing the code."); // Display backend error
        setOutput(null);
      }
    } catch (err) {
      setError("Failed to connect to the backend."); // Display connection error
      setOutput(null);
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
            <strong>Output:</strong> {output}
          </div>
        )}
        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </>
  );
};

export default CodeEditor;
