export interface Tag {
    name: string;
    url?: string;
  }
  
  export interface User {
    username: string;
    avatar: string;
    location: string;
    reputation: number;
    tags: Tag[];
  }