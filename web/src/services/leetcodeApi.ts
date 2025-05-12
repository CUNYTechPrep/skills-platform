// leetcode api url for fetching questions 
const LEETCODE_API_URL = 'https://leetcode.com/graphql';

// interface for the question object
interface Question {
  title: string;
  titleSlug: string;
  difficulty: string;
  frontendQuestionId: string;
  acRate: number;
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
  const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        total: totalNum
        questions: data {
          acRate
          difficulty
          frontendQuestionId: questionFrontendId
          isFavor
          paidOnly: isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            slug
          }
        }
      }
    }
  `;

  // variables for the query    
  const variables = {
    categorySlug: "",
    skip,
    limit,
    filters: {}
  };

  // get the questions from the leetcode api
  try {
    const response = await fetch(LEETCODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('LeetCode API Response:', data);
    
    if (!data.data || !data.data.problemsetQuestionList) {
      throw new Error('Invalid response format from LeetCode API');
    }

    return data.data as QuestionListResponse;
  } catch (error) {
    console.error('Error fetching LeetCode questions:', error);
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
            throw new Error('Invalid response format from LeetCode API');
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