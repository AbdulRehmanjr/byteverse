



export const fetchUsers = async (): Promise<UserProps[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would be an API call
    return [
      {
        id:'1',
        username: 'VonC',
        avatarUrl: '/logo.jpg',
        location: 'France',
        reputation: 918,
        tags: [
           'git',
           'github',
           'visual-studio-code',
        ]
      },
      {
        id:'2',
        username: 'mklement0',
        avatarUrl: '/logo.png',
        location: 'United States',
        reputation: 585,
        tags: [
           'powershell',
           'windows',
           'powershell-core',
        ]
      },
      {
        id:'3',
        username: 'elas ',
        avatarUrl: '/logo.jpg',
        location: 'France',
        reputation: 918,
        tags: [
           'git',
           'github',
           'visual-studio-code',
        ]
      },
      {
        id:'4',
        username: 'John Skeet',
        avatarUrl: '/logo.jpg',
        location: 'UK',
        reputation: 948,
        tags: [
           'Python',
           'java',
           'visual-studio-community',
        ]
      },
      {
        id:'5',
        username: 'Alas',
        avatarUrl: '/logo.jpg',
        location: 'Chanina',
        reputation: 345,
        tags: [
           'postgesSQL',
           'gitbursh',
           'Community',
        ]
      },
      {
        id:'6',
        username: 'Sweeper',
        avatarUrl: '/logo.jpg',
        location: 'Ingland',
        reputation: 348,
        tags: [
           'C3',
           'zoom',
           'pycharm',
        ]
      },
      {
        id:'7',
        username: 'ThomasIsCoding',
        avatarUrl: '/logo.jpg',
        location: 'Turky',
        reputation: 257,
        tags: [
           'ClaudAI',
           'GitBursh',
           'CSS5,NuxtJS',
        ]
      },
      {
        id:'8',
        username: 'rozsazoltan',
        avatarUrl: '/logo.jpg',
        location: 'Ingland',
        reputation: 234,
        tags: [
           'git',
           'github',
           'visual-studio-code',
        ]
      },
      {
        id:'9',
        username: 'jcalz',
        avatarUrl: '/logo.jpg',
        location: 'France',
        reputation: 918,
        tags: [
           'git',
           'github',
           'visual-studio-code',
        ]
      },
      {
        id:'10',
        username: 'qkfang',
        avatarUrl: '/logo.jpg',
        location: 'France',
        reputation: 918,
        tags: [
           'git',
           'github',
           'visual-studio-code',
        ]
      },
      



      // Add other users...
    ];
  };