// route to editor.tsx

import Editor from "./components/leetcode/editor";
import Output from "./components/leetcode/output";

function Leetcode() {
  return (
    <section className="w-full h-screen p-4">
      <div className="flex flex-row w-full h-full gap-4">
        <div className="flex-1  rounded-md overflow-hidden">
          <p>Editor</p>
          <Editor />
        </div>
        <div className="w-1/2  rounded-md overflow-hidden">
          <p>Output</p>
          <Output />
        </div>
      </div>
    </section>

  );
}

export default Leetcode;
