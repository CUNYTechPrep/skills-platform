import { useState, useEffect } from "react";
import ProblemDescription from "./components/leetcode/workspace/problem-description/ProblemDescription";
import CodeEditor from "./components/leetcode/editor";
import Output from "./components/leetcode/output";
import QuestionList from "./components/leetcode/QuestionList";
import { getRandomQuestion } from "./services/leetcodeApi";

function Leetcode() {
  // Centralized state management
  const [code, setCode] = useState<string>(""); // Shared state for user input
  const [output, setOutput] = useState<string | null>(null); // Shared state for backend response
  const [error, setError] = useState<string | null>(null); // Shared state for errors
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Function to handle random question selection
  const handleRandomQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const question = await getRandomQuestion();
      console.log('Random question fetched:', question); // Debug log
      if (!question) {
        throw new Error('No question received from API');
      }
      setSelectedQuestion(question);
    } catch (err) {
      console.error('Error in handleRandomQuestion:', err); // Debug log
      setError("Failed to fetch random question");
    } finally {
      setLoading(false);
    }
  };

  // Load a random question on component mount
  useEffect(() => {
    handleRandomQuestion();
  }, []);

  return (
    <section className="w-full h-full p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          {/* Left panel - Problem Description */}
          <div className="w-1/3 min-h-0 rounded-md border border-gray-200">
            <div className="flex justify-between items-center mb-2 p-4 border-b border-gray-200">
              <p className="text-lg font-semibold">Problem Description</p>
              <button 
                onClick={handleRandomQuestion}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'New Random Question'}
              </button>
            </div>
            {error && (
              <div className="p-4 text-red-500 bg-red-50 border-b border-red-200">
                {error}
              </div>
            )}
            {loading ? (
              <div className="p-4 text-gray-500">Loading question...</div>
            ) : (
              <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <ProblemDescription selectedQuestion={selectedQuestion} />
              </div>
            )}
          </div>

          {/* Middle panel - Code Editor */}
          <div className="w-1/3 min-h-0 rounded-md border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <p className="text-lg font-semibold">Editor</p>
            </div>
            <CodeEditor code={code} setCode={setCode} />
          </div>

          {/* Right panel - Output */}
          <div className="w-1/3 min-h-0 rounded-md border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <p className="text-lg font-semibold">Output</p>
            </div>
            <Output
              code={code}
              output={output}
              setOutput={setOutput}
              error={error}
              setError={setError}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leetcode;
