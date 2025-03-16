// app/lib/tags-data.ts
export interface Tag {
    id: string;
    name: string;
    description: string;
    questionsCount: number;
    askedToday: number;
    askedThisWeek: number;
    askedThisMonth?: number;
  }
  
  export async function getTags(): Promise<Tag[]> {
    // In a real app, this would be an API call
    return [
      {
        id: 'javascript',
        name: 'javascript',
        description: 'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript).',
        questionsCount: 2537764,
        askedToday: 44,
        askedThisWeek: 516
      },
      {
        id: 'python',
        name: 'python',
        description: 'Python is a dynamically typed, multi-purpose programming language designed to be quick to learn, understand, and use, with a clean and readable syntax.',
        questionsCount: 2222118,
        askedToday: 87,
        askedThisWeek: 896
      },
      {
        id: 'java',
        name: 'java',
        description: 'Java is a high-level object-oriented programming language. Use this tag when you\'re having problems using or understanding the language itself.',
        questionsCount: 1923985,
        askedToday: 20,
        askedThisWeek: 332
      },
      {
        id: 'csharp',
        name: 'c#',
        description: 'C# (pronounced "see sharp") is a high-level, statically typed, multi-paradigm programming language developed by Microsoft.',
        questionsCount: 1627452,
        askedToday: 29,
        askedThisWeek: 390
      },
      {
        id: 'php',
        name: 'php',
        description: 'PHP is an open-source, multi-paradigm, dynamically-typed, and interpreted scripting language designed initially for server-side web development.',
        questionsCount: 1470099,
        askedToday: 20,
        askedThisWeek: 162
      },
      {
        id: 'android',
        name: 'android',
        description: 'Android is Google\'s mobile operating system, used for programming or developing digital devices.',
        questionsCount: 1422239,
        askedToday: 22,
        askedThisWeek: 283
      },
      {
        id: 'html',
        name: 'html',
        description: 'HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.',
        questionsCount: 1191609,
        askedToday: 25,
        askedThisWeek: 234
      },
      {
        id: 'jquery',
        name: 'jquery',
        description: 'jQuery is a JavaScript library. jQuery is a popular cross-browser JavaScript library that facilitates Document Object Model (DOM) traversal, event handling.',
        questionsCount: 1033536,
        askedToday: 0,
        askedThisWeek: 28,
        askedThisMonth: 126
      },
      {
        id: 'cpp',
        name: 'c++',
        description: 'C++ is a general-purpose programming language. Use this tag for questions about the language itself.',
        questionsCount: 962541,
        askedToday: 18,
        askedThisWeek: 210
      },
      {
        id: 'css',
        name: 'css',
        description: 'CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML.',
        questionsCount: 927445,
        askedToday: 32,
        askedThisWeek: 301
      },
      {
        id: 'ios',
        name: 'ios',
        description: 'iOS is the mobile operating system running on the Apple iPhone, iPod touch, and iPad.',
        questionsCount: 784223,
        askedToday: 12,
        askedThisWeek: 165
      },
      {
        id: 'sql',
        name: 'sql',
        description: 'Structured Query Language (SQL) is a language for querying databases.',
        questionsCount: 715678,
        askedToday: 27,
        askedThisWeek: 257
      }
    ];
  }          