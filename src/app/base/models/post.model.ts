export enum PostType {
  OFFER = 'OFFER',
  REQUEST = 'REQUEST'
}

export enum PostCategory {
  MATERIALS,
  SHELTER,
  FOOD
}

export interface Post {
  id: number;
  ownerId: number;
  type: PostType;
  category: PostCategory;
  title: string;
  description: string;
  imageUrl?: string;
  upvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  interactions: number;
  isRetired: boolean;
  tags: string[];
}

export interface CreatePost {
  type: PostType;
  category: PostCategory;
  title: string;
  description: string;
  image?: File;
  tags: string[];
}
