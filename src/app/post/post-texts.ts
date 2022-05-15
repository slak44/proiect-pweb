import { PostCategory, PostType } from '../base/models/post.model';

export const categoryIcons: Record<PostCategory, string> = {
  [PostCategory.FOOD]: 'fastfood',
  [PostCategory.SHELTER]: 'cabin',
  [PostCategory.MATERIALS]: 'inventory_2',
};

export const categoryNames: Record<PostCategory, string> = {
  [PostCategory.FOOD]: 'Food',
  [PostCategory.SHELTER]: 'Shelter',
  [PostCategory.MATERIALS]: 'Materials',
};

export const postTypeNames: Record<PostType, string> = {
  [PostType.OFFER]: 'Offer',
  [PostType.REQUEST]: 'Request',
};

export const interactionTexts: Record<PostType, string> = {
  [PostType.OFFER]: 'Accept',
  [PostType.REQUEST]: 'Contribute',
};

export const interactionCountTexts: Record<PostType, string> = {
  [PostType.OFFER]: 'accepted',
  [PostType.REQUEST]: 'contributors',
};
