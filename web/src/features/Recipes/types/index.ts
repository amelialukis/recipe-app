export interface RecipeType {
  id: number;
  title: string;
  description?: string;
  timeMinutes: number;
  price: number;
  link?: string;
  tags?: {
    id: number;
    name: string;
  }[];
  ingredients?: {
    id: number;
    amount: number;
    unit: { id: number; name: string };
    ingredient: { id: number; name: string };
  }[];
  image?: string;
  procedures: string;
  private: boolean;
  user?: string;
  likes: string;
  liked: boolean;
}

export interface RecipePage{
  next: number;
  previous: number;
  results: RecipeType[];
}
