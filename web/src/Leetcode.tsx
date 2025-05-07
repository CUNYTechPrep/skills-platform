// route to editor.tsx

import ProblemDescription from "./components/leetcode/workspace/problem-description/ProblemDescription";
import Editor from "./components/leetcode/editor";
import Output from "./components/leetcode/output";

function Leetcode() {
  return (
    <section className="w-full h-full p-4">
      <div className="flex flex-row gap-4">
        <div className="w-1/2 min-h-0 rounded-md">
          {/* left panel - problem description */}
          <p>Problem Description</p>
          <ProblemDescription />
        </div>

        <div className="w-1/2 min-h-0 rounded-md">
          {/* middle panel - editor */}
          <p>Editor</p>
          <Editor />
        </div>
        <div className="w-1/2 min-h-0 rounded-md">
          {/* right panel - output */}
          <p>Output</p>
          <Output />
        </div>
      </div>
    </section>
  );
}

export default Leetcode;
