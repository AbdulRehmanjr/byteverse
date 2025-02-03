import React from 'react';
import { Search } from 'lucide-react';

const TagList = () => {
  const tags = [
    {
      name: 'javascript',
      description: 'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript).',
      stats: {
        questions: 2537757,
        askedToday: 48,
        thisWeek: 436
      }
    },
    {
      name: 'python',
      description: 'Python is a dynamically typed, multi-purpose programming language designed to be quick to learn, understand, and use, with a clean and readable syntax.',
      stats: {
        questions: 2221047,
        askedToday: 113,
        thisWeek: 951
      }
    },
    {
      name: 'java',
      description: 'Java is a high-level object-oriented programming language. Use this tag when you\'re having problems using or understanding the language itself.',
      stats: {
        questions: 1923600,
        askedToday: 52,
        thisWeek: 416
      }
    },
    {
      name: 'c#',
      description: 'C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft.',
      stats: {
        questions: 1626882,
        askedToday: 46,
        thisWeek: 416
      }
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Tags</h1>
        <p className="text-gray-600 mb-4">
          A tag is a keyword or label that categorizes your question with other, similar questions. Using
          the right tags makes it easier for others to find and answer your question.
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Show all tag synonyms
        </a>
      </div>

      <div className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by tag name"
            className="w-full p-2 pl-8 border border-gray-300 rounded"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button className="bg-gray-200 px-3 py-1 rounded font-medium">Popular</button>
        <button className="text-gray-600 px-3 py-1 rounded hover:bg-gray-100">Name</button>
        <button className="text-gray-600 px-3 py-1 rounded hover:bg-gray-100">New</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div key={tag.name} className="border border-gray-200 rounded p-4">
            <a href="#" className="inline-block mb-2">
              <span className="bg-[#E1ECF4] text-[#39739D] px-2 py-1 rounded text-sm hover:bg-[#D0E3F1]">
                {tag.name}
              </span>
            </a>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{tag.description}</p>
            <div className="text-xs text-gray-500">
              <span className="block mb-1">
                {tag.stats.questions.toLocaleString()} questions
              </span>
              <span>
                {tag.stats.askedToday} asked today, {tag.stats.thisWeek} this week
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;