import express, { Request, Response } from "express";
import cors from "cors";
import { VM } from "vm2";
import dotenv from "dotenv";
import fetch from "node-fetch";

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

// Get total number of questions
const getTotalQuestions = async (): Promise<number> => {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            problemsetQuestionList: questionList(
              categorySlug: ""
              limit: 1
              skip: 0
              filters: {}
            ) {
              total: totalNum
            }
          }
        `
      })
    });

    const data = await response.json();
    return data.data.problemsetQuestionList.total;
  } catch (error) {
    console.error('Error getting total questions:', error);
    throw error;
  }
};

// Get question by index
const getQuestionByIndex = async (index: number): Promise<any> => {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            problemsetQuestionList: questionList(
              categorySlug: ""
              limit: 1
              skip: ${index}
              filters: {}
            ) {
              total: totalNum
              questions: data {
                title
                titleSlug
                difficulty
                content
                questionId
                acRate
                topicTags {
                  name
                  slug
                }
                exampleTestcases
                sampleTestCase
              }
            }
          }
        `
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting question:', error);
    throw error;
  }
};

// LeetCode API endpoint with randomization
app.get("/api/question", async (req: Request, res: Response) => {
  try {
    const { random } = req.query;
    let skip = 0;

    if (random === 'true') {
      // Get total number of questions
      const totalQuestions = await getTotalQuestions();
      // Generate random index
      skip = Math.floor(Math.random() * totalQuestions);
      console.log(`Fetching random question at index ${skip} of ${totalQuestions}`);
    }

    const data = await getQuestionByIndex(skip);
    console.log('LeetCode API response:', data);
    
    res.json({
      status: 200,
      data: data
    });
  } catch (error) {
    console.error('Error in LeetCode API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch question from LeetCode API',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// (Optional) Logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Helper function to parse test cases
const parseTestCases = (testCases: string): any[] => {
  try {
    // Split multiple test cases if they exist
    const cases = testCases.split('\n\n');
    return cases.map(testCase => {
      // Try to parse as JSON first
      try {
        return JSON.parse(testCase);
      } catch {
        // If not JSON, return as is
        return testCase;
      }
    });
  } catch (error) {
    console.error('Error parsing test cases:', error);
    return [];
  }
};

// POST endpoint for code execution and verification
app.post("/api/execute", async (req: Request, res: Response) => {
  const { code, testCases, expectedOutput } = req.body;

  if (!code || !testCases) {
    res.status(400).json({ 
      error: "Invalid request: 'code' and 'testCases' are required." 
    });
    return;
  }
  
  try {
    const results = [];
    const parsedTestCases = Array.isArray(testCases) ? testCases : parseTestCases(testCases);

    for (const testCase of parsedTestCases) {
      try {
        const vm = new VM({
          timeout: 1000,
          sandbox: { 
            input: testCase,
            console: {
              log: (...args: any[]) => results.push({ type: 'log', value: args.join(' ') })
            }
          },
        });

        const result = vm.run(`
          ${code}
          solution(input);
        `);

        results.push({
          input: testCase,
          output: result,
          passed: expectedOutput ? result === expectedOutput : true
        });
      } catch (error) {
        results.push({
          input: testCase,
          error: error instanceof Error ? error.message : 'Unknown error',
          passed: false
        });
      }
    }

    // Calculate overall result
    const allPassed = results.every(r => r.passed);
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;

    res.status(200).json({ 
      results,
      summary: {
        allPassed,
        passedCount,
        totalCount,
        successRate: (passedCount / totalCount) * 100
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Unknown error occurred" });
    }
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Test the server by visiting: http://localhost:${PORT}/api/question?random=true`);
});
