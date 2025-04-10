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
      const solution = ${code};
      solution(input);
    `);

    res.json({ result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});