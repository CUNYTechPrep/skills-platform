// Define the props for the Output component
interface OutputProps {
  code: string; // Add the missing 'code' prop
  output: string | null;
  setOutput: React.Dispatch<React.SetStateAction<string | null>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Output: React.FC<OutputProps> = ({ code, output, setOutput, error, setError }) => {
  const PORT = 8080; // Default port for the backend

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Please enter some code before running.");
      setOutput(null);
      return;
    }
    
    console.log("Submitting code:", code); // Log the code to be submitted
    try {
      // Wrap the code in a solution function if it's not already wrapped
      const wrappedCode = code.includes('function solution') 
        ? code 
        : `function solution(input) {\n${code}\n}`;
        
      const requestBody = {
        code: wrappedCode,
        input: [2, 7, 11, 15], // Example input
      };

      console.log("Request body:", requestBody); // Log the request body for debugging

      const response = await fetch(`http://localhost:${PORT}/api/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setOutput(data.result); // Display the result
        setError(null); // Clear any previous errors
      } else {
        setError(data.error || "An error occurred while executing the code."); // Display backend error
        setOutput(null);
      }
    } catch (err) {
      setError("Failed to connect to the backend."); // Display connection error
      setOutput(null);
    }
  };

  return (
    <div className="modal-container w-full h-full max-w-3xl mx-auto text-xl md:text-2xl p-32 md:p-0 whitespace-nowrap flex flex-col gap-4">
      <button
        className="w-[20vh] h-[40px] bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => handleSubmit()}
      >
        Run Code
      </button>

      <section className="w-full border rounded bg-gray-100 min-h-[150px] p-4">
        {/* Display error if present */}
        {error && (
          <div className="text-red-600 mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        {/* Display output if present */}
        {output && (
          <div className="text-black">
            <strong>Output:</strong>
            <pre className="whitespace-pre-wrap mt-2">{output}</pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default Output;


