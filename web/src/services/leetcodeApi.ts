// leetcode api url for fetching questions 
const API_BASE_URL = 'http://localhost:8080/api';

// interface for the question object
interface Question {
  title: string;
  titleSlug: string;
  difficulty: string;
  questionId: string;
  acRate: number;
  content: string;
  topicTags: {
    name: string;
    slug: string;
  }[];
  exampleTestcases?: string;
  sampleTestCase?: string;
}

// interface for the response from the leetcode api
interface QuestionListResponse {
  problemsetQuestionList: {
    total: number;
    questions: Question[];
  };
}

// interface for test case result
interface TestCaseResult {
  input: any;
  output?: any;
  error?: string;
  passed: boolean;
}

// interface for execution summary
interface ExecutionSummary {
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
  successRate: number;
}

// interface for execution response
interface ExecutionResponse {
  results: TestCaseResult[];
  summary: ExecutionSummary;
}

// a function to fetch questions from the leetcode api
export const fetchQuestions = async (limit: number = 50, skip: number = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/question?random=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.data || !data.data.data || !data.data.data.problemsetQuestionList) {
      throw new Error('Invalid response format from API');
    }

    return data.data.data as QuestionListResponse;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// get a random question from the questions list
export const getRandomQuestion = async() => {
    try {
        console.log('Getting random question...');
        const response = await fetchQuestions();
        console.log('Question response:', response);
        
        if (!response.problemsetQuestionList || !response.problemsetQuestionList.questions[0]) {
            throw new Error('Invalid response format from API');
        }

        return response.problemsetQuestionList.questions[0];
    } catch (error){
        console.error('Error fetching random question:', error);
        throw error;
    }
};

// execute code and verify results
export const executeCode = async (code: string, testCases: string | any[]): Promise<ExecutionResponse> => {
    try {
        console.log('Executing code with test cases...');
        const response = await fetch(`${API_BASE_URL}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                testCases,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Execution response:', data);
        return data;
    } catch (error) {
        console.error('Error executing code:', error);
        throw error;
    }
};