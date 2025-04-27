import React from "react";
import { problems } from "../mock-problems/problems"; // Import the problems array

const ProblemsTable: React.FC = () => {
  return (
    <table className="w-full text-left border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-300">Order</th>
          <th className="px-4 py-2 border border-gray-300">Title</th>
          <th className="px-4 py-2 border border-gray-300">Difficulty</th>
          <th className="px-4 py-2 border border-gray-300">Category</th>
          <th className="px-4 py-2 border border-gray-300">Video</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem, idx) => (
          <tr
            key={problem.id}
            className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
          >
            <td className="px-4 py-2 border border-gray-300">
              {problem.order}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              <a
                href={`https://leetcode.com/problems/${problem.id}`}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {problem.title}
              </a>
            </td>
            <td className="px-4 py-2 border border-gray-300">
              {problem.difficulty}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              {problem.category}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              {problem.videoId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${problem.videoId}`}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video
                </a>
              ) : (
                <span className="text-gray-500">No Video</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProblemsTable;
