type UserProps={
    id: string;
    username: string;
    location: string;
    reputation: number;
    avatarUrl: string;
    tags: string[];
  }
  
   type TimeFrameEnum = 'week' | 'month' | 'quarter' | 'year' | 'all';
   type UserEnum = 'reputation' | 'new' | 'voters' | 'editors' | 'moderators';

