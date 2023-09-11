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
}
