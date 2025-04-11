import React from "react";
import { problemsDescriptions } from "../../../mock-problems/problems-descriptions";
import "./problem-description.css"; // <-- import the CSS

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
  const problem = problemsDescriptions[0]; // Placeholder for now

  return (
    <div className="problem-description-container">
      <h1 className="problem-title">{problem.title}</h1>
      <p className="problem-description-text">{problem.description}</p>
      <pre className="problem-example">
        <code>{problem.example}</code>
      </pre>
    </div>
  );
};

export default ProblemDescription;
