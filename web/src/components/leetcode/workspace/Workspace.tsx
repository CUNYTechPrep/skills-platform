import React from "react";
import ProblemDescription from "./problem-description/ProblemDescription";
import "./workspace.css";
import CodeEditor from "./code-editor/CodeEditor";
type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
  return (
    <div className="workspace">
      {/* Left Panel */}
      <div className="problem-description">
        <ProblemDescription />
      </div>

      {/* Right Panel */}
      <div className="editor">
        <CodeEditor />
      </div>
    </div>
  );
};

export default Workspace;
