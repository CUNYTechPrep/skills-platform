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
}

// interface for the response from the leetcode api
interface QuestionListResponse {
  problemsetQuestionList: {
    total: number;
    questions: Question[];
  };
}

// a function to fetch questions from the leetcode api
export const fetchQuestions = async (limit: number = 50, skip: number = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/question`, {
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
        const response = await fetchQuestions(1,0);
        console.log('Initial response:', response);
        
        if (!response.problemsetQuestionList || !response.problemsetQuestionList.total) {
            throw new Error('Invalid response format from API');
        }

        const totalQuestions = response.problemsetQuestionList.total;
        console.log('Total questions:', totalQuestions);

        // generate a random index
        const randomIndex = Math.floor(Math.random()* totalQuestions);
        console.log('Random index:', randomIndex);

        // fetch the random question
        const randomQuestionResponse = await fetchQuestions(1, randomIndex);
        console.log('Random question response:', randomQuestionResponse);

        if (!randomQuestionResponse.problemsetQuestionList.questions[0]) {
            throw new Error('No question found at random index');
        }

        return randomQuestionResponse.problemsetQuestionList.questions[0];
    } catch (error){
        console.error('Error fetching random question:', error);
        throw error;
    }
};