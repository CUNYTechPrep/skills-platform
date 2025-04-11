import express from "express";
import cors from "cors";
import { VM } from "vm2";

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.options("/api/execute", cors());
// POST endpoint to execute code
app.post("/api/execute", (req, res) => {
  const { code, input } = req.body;
  try {
    const vm = new VM({
      timeout: 1000, // Limit execution time
      sandbox: { input }, // Pass input to the sandbox
    });

    // Run the code
    const result = vm.run(`
      ${code}
      solution(input);
    `);
    console.log("Backend result:", result); // Log the result
    res.status(200).json({ result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});