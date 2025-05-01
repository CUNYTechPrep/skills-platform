// route to editor.tsx

import Editor from "./components/leetcode/editor";
import Output from "./components/leetcode/output";

function Leetcode() {
  return (
    <section className="w-full h-full p-4">
      <div className="flex flex-row gap-4">
        <div className="w-1/2 min-h-0 rounded-md">
          <p>Editor</p>
          <Editor />
        </div>
        <div className="w-1/2  min-h-0 rounded-md">
          <p>Output</p>
          <Output />
        </div>
      </div>
    </section>

  );
}

export default Leetcode;
