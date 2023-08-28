import { RouteObject } from "react-router-dom";
import RecipeList from "./RecipeList.tsx";
import RecipeDetail from "./RecipeDetail.tsx";
import RecipeAdd from "./RecipeAdd.tsx";
import RecipeEdit from "./RecipeEdit.tsx";

const RecipeRoutes: RouteObject[] = [
  {
    path: "",
    element: <RecipeList />,
  },
  {
    path: ":recipeId",
    children: [
      {
        path: "",
        element: <RecipeDetail />,
      },
      {
        path: "edit",
        element: <RecipeEdit />,
      },
    ],
  },
  {
    path: "add",
    element: <RecipeAdd />,
  },
];

export default RecipeRoutes;
