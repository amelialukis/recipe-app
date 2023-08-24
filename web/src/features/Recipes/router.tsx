import { RouteObject } from "react-router-dom";
import RecipeList from "./RecipeList.tsx";

const RecipeRoutes: RouteObject[] = [
  {
    path: "",
    element: <RecipeList />,
  },
];

export default RecipeRoutes;
