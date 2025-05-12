import { useState } from "react";
import ProblemDescription from "./components/leetcode/workspace/problem-description/ProblemDescription";
import CodeEditor from "./components/leetcode/editor";
import Output from "./components/leetcode/output";

function Leetcode() {
  // Centralized state management
  const [code, setCode] = useState<string>(""); // Shared state for user input
  const [output, setOutput] = useState<string | null>(null); // Shared state for backend response
  const [error, setError] = useState<string | null>(null); // Shared state for errors

  
  return (
    <section className="w-full h-full p-4">
      <div className="flex flex-row gap-4">
        {/* Left panel - Problem Description */}
        <div className="w-1/3 min-h-0 rounded-md">
          <p>Problem Description</p>
          <ProblemDescription />
        </div>

        {/* Middle panel - Code Editor */}
        <div className="w-1/3 min-h-0 rounded-md">
          <p>Editor</p>
          <CodeEditor code={code} setCode={setCode} />
        </div>

        {/* Right panel - Output */}
        <div className="w-1/3 min-h-0 rounded-md">
          <p>Output</p>
          <Output
            code={code}
            output={output}
            setOutput={setOutput}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </section>
  );
}

export default Leetcode;
