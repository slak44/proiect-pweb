export enum PostType {
  OFFER = 'OFFER',
  REQUEST = 'REQUEST'
}

export enum PostCategory {
  MATERIALS,
  SHELTER,
  FOOD
}

export interface Tag {
  id: number;
  text: string;
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
  tags: Tag[];
}
