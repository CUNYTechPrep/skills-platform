import {useState } from 'react';


const Output: React.FC = () => {
    const [output, setOutput] = useState<string>("");
    const handleRunCode = () => {
        setOutput("Code is running...");
    };

  return (
    <div className="modal-container w-full h-full max-w-3xl mx-auto text-xl md:text-2xl p-32 md:p-0 whitespace-nowrap flex flex-col gap-4">
        
        <button className="w-[20vh] h-[40px] bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => handleRunCode()}>
            Run Code
        </button>

        <section className="w-full border rounded bg-gray-100 min-h-[150px] ">
            {/* editor output */}
            <pre className="whitespace-pre-wrap text-black">{output}</pre>
        </section>
    </div>
  );
};

export default Output;


