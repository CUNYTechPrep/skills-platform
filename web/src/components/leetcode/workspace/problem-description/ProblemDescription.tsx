import React from 'react';

interface ProblemDescriptionProps {
  selectedQuestion?: {
    title: string;
    titleSlug: string;
    difficulty: string;
    frontendQuestionId: string;
    acRate: number;
    topicTags: {
      name: string;
      slug: string;
    }[];
  };
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ selectedQuestion }) => {
  if (!selectedQuestion) {
    return (
      <div className="p-4">
        <p className="text-gray-500">Select a question to view its description</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          {selectedQuestion.frontendQuestionId}. {selectedQuestion.title}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`px-2 py-1 rounded text-sm ${
              selectedQuestion.difficulty === 'Easy'
                ? 'bg-green-100 text-green-800'
                : selectedQuestion.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {selectedQuestion.difficulty}
          </span>
          <span className="text-sm text-gray-600">
            Acceptance Rate: {(selectedQuestion.acRate * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          {selectedQuestion.topicTags.map((tag) => (
            <span
              key={tag.slug}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      
      {/* Placeholder for problem description - you'll need to fetch this from LeetCode API */}
      
      <div className="prose max-w-none">
        <p>Problem description will be loaded here...</p>
      </div>
    </div>
  );
};

export default ProblemDescription;
