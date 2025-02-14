'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Info, X } from 'lucide-react';

interface TagStats {
  questions: number;
  askedToday: number;
  thisWeek: number;
  followers: number;
}

interface Tag {
  name: string;
  description: string;
  stats: TagStats;
  trending?: boolean;
}

type SortOption = 'popular' | 'name' | 'new';

interface TagTooltipProps {
  tag: Tag;
}

export const TagList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [showTooltip, setShowTooltip] = useState<string>('');

  const tags: Tag[] = useMemo(() => [
    {
      name: 'javascript',
      description: 'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript).',
      stats: {
        questions: 2537757,
        askedToday: 48,
        thisWeek: 436,
        followers: 12453
      },
      trending: true
    },
    {
      name: 'python',
      description: 'Python is a dynamically typed, multi-purpose programming language designed to be quick to learn, understand, and use, with a clean and readable syntax.',
      stats: {
        questions: 2221047,
        askedToday: 113,
        thisWeek: 951,
        followers: 10234
      },
      trending: true
    },
    {
      name: 'java',
      description: 'Java is a high-level object-oriented programming language. Use this tag when you\'re having problems using or understanding the language itself.',
      stats: {
        questions: 1923600,
        askedToday: 52,
        thisWeek: 416,
        followers: 8965
      }
    },
    {
      name: 'c#',
      description: 'C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft.',
      stats: {
        questions: 1626882,
        askedToday: 46,
        thisWeek: 416,
        followers: 7832
      }
    },
    {
      name: 'php',
      description: 'PHP is an open-source, multi-paradigm, dynamically-typed, and interpreted scripting language designed initially for server-side web development.',
      stats: {
        questions: 1469800,
        askedToday: 18,
        thisWeek: 212,
        followers: 5643
      }
    },
    {
        name: 'android',
        description: 'Android is Google, used for programming or developing digital devices.',
        stats: {
          questions: 2537757,
          askedToday: 48,
          thisWeek: 436,
          followers: 12453
        },
        trending: true
      },
      {
        name: 'html',
        description: "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser",
        stats: {
          questions: 1278456,
          askedToday: 98,
          thisWeek: 436,
          followers: 12453
        },
        trending: true
      },
  ], []);

  useEffect(() => {
    const sorted = [...tags].filter(tag =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'new':
        sorted.sort((a, b) => b.stats.askedToday - a.stats.askedToday);
        break;
      default:
        sorted.sort((a, b) => b.stats.followers - a.stats.followers);
    }

    setFilteredTags(sorted);
  }, [searchTerm, sortBy, tags]);

  const TagTooltip: React.FC<TagTooltipProps> = ({ tag }) => (
    <div className="absolute z-10 bg-black text-white p-3 rounded shadow-lg text-sm w-64">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold">{tag.name}</h4>
        <button 
          onClick={() => setShowTooltip('')}
          className="text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
      <p className="text-gray-300 text-xs mb-2">{tag.description}</p>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{tag.stats.followers.toLocaleString()} followers</span>
        <span>{tag.stats.questions.toLocaleString()} questions</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tags</h1>
          <button className="bg-[#0A95FF] text-white px-4 py-2 rounded-md hover:bg-[#0074CC] transition-colors">
            Create Tag
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          A tag is a keyword or label that categorizes your question with other, similar questions. Using
          the right tags makes it easier for others to find and answer your question.
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Show all tag synonyms
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            placeholder="Filter by tag name"
            className="w-full p-2 pl-10 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(['popular', 'name', 'new'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-4 py-2 rounded-md capitalize ${
                sortBy === sort
                  ? 'bg-[#E1ECF4] text-[#39739D] font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTags.map((tag) => (
          <div key={tag.name} className="relative border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <a href="#" className="inline-block">
                <span className="bg-[#E1ECF4] text-[#39739D] px-2 py-1 rounded text-sm hover:bg-[#D0E3F1]">
                  {tag.name}
                </span>
              </a>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowTooltip(tag.name)}
                onMouseEnter={() => setShowTooltip(tag.name)}
              >
                <Info size={16} />
              </button>
            </div>
            
            {showTooltip === tag.name && <TagTooltip tag={tag} />}

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{tag.description}</p>
            
            <div className="text-xs text-gray-500">
              <div className="flex justify-between mb-1">
                <span>{tag.stats.questions.toLocaleString()} questions</span>
                {tag.trending && (
                  <span className="text-green-600 font-medium">↑ Trending</span>
                )}
              </div>
              <span>
                {tag.stats.askedToday} asked today, {tag.stats.thisWeek} this week
              </span>
            </div>

            <button className="mt-3 text-xs text-[#39739D] hover:text-[#0074CC] font-medium">
              Watch tag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};