export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
  }
  
  export interface Skill {
    name: string;
    level: number;
    category: 'programming' | 'frameworks' | 'databases' | 'tools';
  }

  export interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
  }
  
  export interface ContactInfo {
    email: string;
    phone?: string;
    location?: string;
  }