import express, { Request, Response } from "express";
import cors from "cors";
import { VM } from "vm2";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// parse JSON bodies
app.use(express.json());

// Add root route handler
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "LeetCode API server is running" });
});

// (Optional) Logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// POST endpoint
app.post("/api/execute", (req: Request, res: Response): void => {
  const { code, input } = req.body;

  if (!code || !Array.isArray(input)) {
     res.status(400).json({ 
      error: "Invalid request: 'code' must be a string and 'input' must be an array." 
    });
    return;
  }
  

  try {
    const vm = new VM({
      timeout: 1000,
      sandbox: { input },
    });

    const result = vm.run(`
      ${code}
      solution(input);
    `);

    res.status(200).json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
