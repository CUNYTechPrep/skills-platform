import React from 'react';

interface ProblemDescriptionProps {
  selectedQuestion?: {
    title: string;
    titleSlug: string;
    difficulty: string;
    questionId: string;
    acRate: number;
    content: string;
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
          {selectedQuestion.questionId}. {selectedQuestion.title}
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
      
      {/* Problem Description */}
      <div className="prose prose-sm max-w-none">
        {selectedQuestion.content ? (
          <div 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: selectedQuestion.content
                .replace(/<pre>/g, '<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto my-4">')
                .replace(/<code>/g, '<code class="bg-gray-100 px-1 rounded font-mono">')
                .replace(/<p>/g, '<p class="my-4">')
                .replace(/<ul>/g, '<ul class="my-4 pl-6 list-disc">')
                .replace(/<ol>/g, '<ol class="my-4 pl-6 list-decimal">')
                .replace(/<li>/g, '<li class="my-2">')
            }} 
          />
        ) : (
          <p>Problem description not available</p>
        )}
      </div>
    </div>
  );
};

export default ProblemDescription;
