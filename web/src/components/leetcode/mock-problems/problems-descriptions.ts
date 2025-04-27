export type ProblemDesc = {
  id: string;
  title: string;
  description: string;
  example: string;
};

export const problemsDescriptions: ProblemDesc[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    example: `Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]`,
  },
]