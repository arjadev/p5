export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  codeSnippet: string;
  category: 'animation' | 'interaction' | 'visualization';
}

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
}