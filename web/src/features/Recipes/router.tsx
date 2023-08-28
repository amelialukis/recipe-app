import { RouteObject } from "react-router-dom";
import RecipeList from "./RecipeList.tsx";
import RecipeDetail from "./RecipeDetail.tsx";
import RecipeAdd from "./RecipeAdd.tsx";

const RecipeRoutes: RouteObject[] = [
  {
    path: "",
    element: <RecipeList />,
  },
  {
    path: ":recipeId",
    element: <RecipeDetail />,
  },
  {
    path: "add",
    element: <RecipeAdd />,
  },
];

export default RecipeRoutes;
