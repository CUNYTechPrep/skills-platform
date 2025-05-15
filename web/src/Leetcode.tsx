import { useState, useEffect } from "react";
import ProblemDescription from "./components/leetcode/workspace/problem-description/ProblemDescription";
import CodeEditor from "./components/leetcode/editor";
import Output from "./components/leetcode/output";
import QuestionList from "./components/leetcode/QuestionList";
import { getRandomQuestion, executeCode } from "./services/leetcodeApi";

function Leetcode() {
  // Centralized state management
  const [code, setCode] = useState<string>(""); // Shared state for user input
  const [output, setOutput] = useState<string | null>(null); // Shared state for backend response
  const [error, setError] = useState<string | null>(null); // Shared state for errors
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [testResults, setTestResults] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Function to handle random question selection
  const handleRandomQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      setOutput(null);
      setCode("");
      setTestResults(null);
      setDebugInfo("Fetching question...");
      
      const question = await getRandomQuestion();
      console.log('Random question fetched:', question);
      
      if (!question) {
        throw new Error('No question received from API');
      }
      
      setDebugInfo(JSON.stringify({
        title: question.title,
        difficulty: question.difficulty,
        questionId: question.questionId,
        hasContent: !!question.content,
        hasTopicTags: !!question.topicTags,
        hasTestCases: !!(question.exampleTestcases || question.sampleTestCase),
        apiUrl: 'http://localhost:8080/api/question'
      }, null, 2));
      
      setSelectedQuestion(question);
      setRetryCount(0);
    } catch (err) {
      console.error('Error in handleRandomQuestion:', err);
      setError("Failed to fetch random question. Please try again.");
      setDebugInfo(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => {
          handleRandomQuestion();
        }, 1000 * (retryCount + 1));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle code execution
  const handleExecuteCode = async () => {
    if (!selectedQuestion) {
      setError("No question selected");
      return;
    }

    try {
      setIsExecuting(true);
      setError(null);
      setTestResults(null);

      // Get test cases from the question
      const testCases = selectedQuestion.exampleTestcases || selectedQuestion.sampleTestCase;
      if (!testCases) {
        throw new Error("No test cases available for this question");
      }

      const results = await executeCode(code, testCases);
      setTestResults(results);

      // Update output with summary
      const summary = results.summary;
      setOutput(
        `Execution Results:\n` +
        `Passed: ${summary.passedCount}/${summary.totalCount} test cases\n` +
        `Success Rate: ${summary.successRate.toFixed(1)}%\n\n` +
        `Detailed Results:\n` +
        results.results.map((result, index) => 
          `Test Case ${index + 1}:\n` +
          `Input: ${JSON.stringify(result.input)}\n` +
          `Output: ${result.error ? `Error: ${result.error}` : JSON.stringify(result.output)}\n` +
          `Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`
        ).join('\n')
      );
    } catch (err) {
      console.error('Error executing code:', err);
      setError(err instanceof Error ? err.message : 'Failed to execute code');
    } finally {
      setIsExecuting(false);
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
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">Problem Description</p>
                {selectedQuestion && (
                  <span className={`px-2 py-1 text-sm rounded ${
                    selectedQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    selectedQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedQuestion.difficulty}
                  </span>
                )}
              </div>
              <button 
                onClick={handleRandomQuestion}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'New Random Question'}
              </button>
            </div>
            {error && (
              <div className="p-4 text-red-500 bg-red-50 border-b border-red-200">
                {error}
                {retryCount > 0 && retryCount < 3 && (
                  <p className="text-sm mt-1">Retrying... (Attempt {retryCount}/3)</p>
                )}
              </div>
            )}
            {/* Debug Information */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <p className="text-sm font-mono text-gray-600">Debug Info:</p>
              <pre className="text-xs mt-2 overflow-auto max-h-32">
                {debugInfo}
              </pre>
            </div>
            {loading ? (
              <div className="p-4 text-gray-500 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
                Loading question...
              </div>
            ) : (
              <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <ProblemDescription selectedQuestion={selectedQuestion} />
              </div>
            )}
          </div>

          {/* Middle panel - Code Editor */}
          <div className="w-1/3 min-h-0 rounded-md border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <p className="text-lg font-semibold">Editor</p>
              <button
                onClick={handleExecuteCode}
                disabled={isExecuting || !selectedQuestion}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExecuting ? 'Running...' : 'Run Code'}
              </button>
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
