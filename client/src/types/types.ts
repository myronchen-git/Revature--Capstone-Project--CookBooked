export interface UserState {
  username: string;
  token: string;
}

export interface Review {
  recipeId: string;
  reviewId: string;
  recipeName: string;
  author: string;
  imageUrl: string;
  rating: number;
  content: string;
  createdAt: number;
  isRecent?: number;
}

export interface Comment {
  reviewId: string;
  commentId: string;
  author: string;
  content: string;
  createdAt: number;
}

export interface ErrorState {
  message: string;
  isError: boolean;
}
