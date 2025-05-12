import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../services/leetcodeApi';

interface Question {
  title: string;
  titleSlug: string;
  difficulty: string;
  frontendQuestionId: string;
  acRate: number;
  topicTags: {
    name: string;
    slug: string;
  }[];
}

interface QuestionListProps {
  onSelectQuestion: (question: Question) => void;
  selectedQuestionId?: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ onSelectQuestion, selectedQuestionId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestions();
        setQuestions(response.problemsetQuestionList.questions);
        setLoading(false);
      } catch (err) {
        setError('Failed to load questions');
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">LeetCode Questions</h2>
      <div className="grid gap-4">
        {questions.map((question) => (
          <div
            key={question.frontendQuestionId}
            className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              selectedQuestionId === question.frontendQuestionId
                ? 'border-blue-500 bg-blue-50'
                : ''
            }`}
            onClick={() => onSelectQuestion(question)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {question.frontendQuestionId}. {question.title}
                </h3>
                <div className="flex gap-2 mt-2">
                  {question.topicTags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  question.difficulty === 'Easy'
                    ? 'bg-green-100 text-green-800'
                    : question.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {question.difficulty}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Acceptance Rate: {(question.acRate * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;