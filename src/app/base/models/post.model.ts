export enum PostType {
  OFFER,
  REQUEST
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
  interactions: number;
  isRetired: boolean;
  tags: Tag[];
}
