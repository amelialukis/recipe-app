import { RouteObject } from "react-router-dom";
import RecipeList from "./RecipeList.tsx";
import RecipeDetail from "./RecipeDetail.tsx";

const RecipeRoutes: RouteObject[] = [
  {
    path: "",
    element: <RecipeList />,
  },
  {
    path: ":recipeId",
    element: <RecipeDetail />,
  },
];

export default RecipeRoutes;
