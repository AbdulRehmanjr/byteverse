"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";

interface Question {
  id: string;
  title: string;
  body: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: {
    name: string;
    reputation?: number;
    avatar?: string;
  };
  timeAgo: string;
}

export const QuestionsSection =()=> {
  const [activeTab, setActiveTab] = useState("Newest");
  
  // Sample data matching your image
  const questions: Question[] = [
    {
      id: "1",
      title: "How do I extend CSS font-feature-settings from inherited defaults",
      body: "Suppose I've set the CSS font-feature-settings to some value which makes sense for the bulk of my page. Now, in tables I would like to add the tnum feature, to make sure that the numbers all align...",
      votes: 0,
      answers: 0,
      views: 5,
      tags: ["css", "font-feature-settings"],
      author: {
        name: "sh1",
        reputation: 4751,
      },
      timeAgo: "1 min ago"
    },
    {
      id: "2",
      title: "Merge_asof inside loop",
      body: "for i in range(1, 4): # Find up to 3 closest matches merged = pd.merge_asof( result1, fifth_sorted, on='key', by='usluga', direction='forward'. # Find next ...",
      votes: 0,
      answers: 0,
      views: 2,
      tags: ["python", "pandas", "analytics"],
      author: {
        name: "Anonymous",
        reputation: 1,
      },
      timeAgo: "2 mins ago"
    },
    {
      id: "3",
      title: "Issues with AR Overlay Tracking and Depth Sensing on Windows using OpenCV",
      body: "I'm developing an augmented reality application in Unity that overlays virtual jewellery on users. The mobile version of my application works exceptionally well, offering stable tracking and accurate...",
      votes: 0,
      answers: 0,
      views: 7,
      tags: ["c#", "unity-game-engine", "opencv", "augmented-reality"],
      author: {
        name: "Akash",
        reputation: 11,
      },
      timeAgo: "6 mins ago"
    },
    {
      id: "4",
      title: "Flutter Build Fails: Registrar Not Found in razorpay_flutter & paytm_allinonesdk",
      body: "I'm working on a Flutter project that includes razorpay_flutter and paytm_allinonesdk plugins. When I try to build the project, I get the following errors: error: cannot find symbol import io....",
      votes: 0,
      answers: 1,
      views: 14,
      tags: ["flutter", "dart", "flutter-razorpay"],
      author: {
        name: "Hammad Khan",
        reputation: 51,
      },
      timeAgo: "11 mins ago"
    },
    {
      id: "5",
      title: "Declarations of list or nested lists",
      body: "What is this declaration? lists are declared using [ but there is key value pair is seen with use of {} its confusing. list with {} brackets with a pair of two items forming one. *'players = [ {'...",
      votes: 0,
      answers: 0,
      views: 11,
      tags: ["python", "list"],
      author: {
        name: "MEHUL_PATEL",
        reputation: 1,
      },
      timeAgo: "11 mins ago"
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Newest Questions</h1>
        <Button>Ask Question</Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">24,256,461 questions</p>

      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="Newest" className="w-auto">
          <TabsList>
            <TabsTrigger value="Newest">Newest</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Bountied">
              Bountied
              <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-800">
                73
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="Unanswered">Unanswered</TabsTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  More <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Hot</DropdownMenuItem>
                <DropdownMenuItem>Week</DropdownMenuItem>
                <DropdownMenuItem>Month</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="sm" className="gap-2">
          <Filter size={16} />
          Filter
        </Button>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border-b pb-4">
            <div className="flex gap-4">
              {/* Stats column */}
              <div className="w-16 flex flex-col items-center text-sm text-muted-foreground">
                <div>{question.votes} votes</div>
                <div className={`${question.answers > 0 ? "text-green-600 border border-green-600 px-1 rounded" : ""}`}>
                  {question.answers} {question.answers === 1 ? "answer" : "answers"}
                </div>
                <div>{question.views} views</div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <Link href={`/questions/${question.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {question.title}
                </Link>
                <p className="text-sm text-slate-700 line-clamp-2 mt-1">
                  {question.body}
                </p>
                
                {/* Tags */}
                <div className="flex gap-1 mt-2 flex-wrap">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Author info */}
                <div className="flex justify-end mt-1 text-sm">
                  <div className="flex items-center gap-1">
                    {question.author.avatar ? (
                      <img 
                        src={question.author.avatar} 
                        alt={question.author.name} 
                        className="w-4 h-4 rounded"
                      />
                    ) : (
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    )}
                    <Link href="#" className="text-blue-600 hover:text-blue-800">
                      {question.author.name}
                    </Link>
                    {question.author.reputation && (
                      <span className="text-orange-500 font-medium">{question.author.reputation}</span>
                    )}
                    <span className="text-muted-foreground">asked {question.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}