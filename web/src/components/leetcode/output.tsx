
import {useState } from 'react';


const Output: React.FC = () => {
    const [output, setOutput] = useState<string>("");
    const handleRunCode = () => {
        setOutput("Code is running...");
    };

  return (

    
    <div className="mt-6 text-xl md:text-2xl p-2 md:p-0 whitespace-nowrap">
        <button className = "bg-blue-600 text-white px-4 py-2 rounded hover: bg-blue700 transition"
        onClick={() => handleRunCode()}>
            Run Code
        </button>
        <section className = "mt-4 p-4 border rounded bg-gray-100 min-h-[150px]">
            {/* editor output */}
            <pre className ="whitespace-pre-wrap text-black">{output}</pre>

        </section>
        
    </div>

  );
};

export default Output;


