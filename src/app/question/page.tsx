
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Author {
  name: string;
  reputation: number;
  imageUrl?: string;
}

interface Question {
  id: string;
  title: string;
  description: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: Author;
  timeAgo: string;
}

const Questions = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Newest');

  const questions: Question[] = [
    {
      id: '1',
      title: 'Running react native CLI on actual android device without installing android SDK in windows',
      description: 'How to run my react native project in an actual android device without installing android sdk in my windows. My device is recognised when I type adb devices in the terminal.',
      votes: 0,
      answers: 0,
      views: 3,
      tags: ['android', 'react-native', 'android-studio', 'command-line-interface'],
      author: {
        name: 'Labani Das',
        reputation: 409
      },
      timeAgo: '1 min ago'
    },
    {
      id: '2',
      title: "Can't display user data from database",
      description: 'I want to get data from database and display it in html code through <%= %> tag. // index.js const express = require(\'express\'); const router = express.Router();',
      votes: 0,
      answers: 0,
      views: 2,
      tags: ['node.js', 'mongoose', 'mongodb-atlas'],
      author: {
        name: 'Stefan',
        reputation: 1
      },
      timeAgo: '1 min ago'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-normal">Newest Questions</h1>
        <button className="px-4 py-2 bg-[#0A95FF] text-white rounded hover:bg-[#0074CC]">
          Ask Question
        </button>
      </div>

      <div className="mb-4 text-[#6A737C]">
        24,255,749 questions
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex border rounded">
          {['Newest', 'Active', 'Bountied', 'Unanswered'].map((filter, index) => (
            <button
              key={filter}
              className={`px-3 py-1.5 ${
                activeFilter === filter
                  ? 'bg-[#E3E6E8]'
                  : 'hover:bg-[#F8F9F9]'
              } ${
                index !== 0 ? 'border-l' : ''
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
              {filter === 'Bountied' && (
                <span className="ml-1 bg-[#0074CC] text-white px-1.5 rounded">
                  57
                </span>
              )}
            </button>
          ))}
        </div>
        <button className="px-3 py-1.5 border rounded hover:bg-[#F8F9F9]">
          More
        </button>
        <button className="px-3 py-1.5 border rounded hover:bg-[#F8F9F9] ml-auto">
          Filter
        </button>
      </div>

      <div className="border-t">
        {questions.map((question) => (
          <div key={question.id} className="py-5 border-b flex">
            <div className="flex flex-col items-end text-sm text-[#6A737C] w-[108px] mr-4">
              <span>{question.votes} votes</span>
              <span>{question.answers} answers</span>
              <span>{question.views} views</span>
            </div>
            
            <div className="flex-1">
              <Link 
                href={`/questions/${question.id}`}
                className="text-[#0074CC] hover:text-[#0A95FF] text-lg mb-2 block"
              >
                {question.title}
              </Link>
              
              <p className="text-sm text-[#3B4045] mb-4 line-clamp-2">
                {question.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#E1ECF4] text-[#39739D] text-sm rounded hover:bg-[#D0E3F1] cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="text-[#6A737C]">asked {question.timeAgo}</span>
                  <Link
                    href={`/users/${question.author.name}`}
                    className="ml-2 text-[#0074CC] hover:text-[#0A95FF]"
                  >
                    {question.author.name}
                  </Link>
                  <span className="ml-1 text-[#6A737C]">
                    {question.author.reputation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;