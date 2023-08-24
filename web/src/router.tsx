import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import AuthRoutes from "./features/Auth/router.tsx";
import Layout from "./Layout.tsx";
import { authenticatedUser } from "./api";
import Home from "./features/Home/Home.tsx";
import { JSX, ReactNode } from "react";
import ProfileRoutes from "./features/Profile/router.tsx";
import RecipeRoutes from "./features/Recipes/router.tsx";
import TagList from "./features/Filter/TagList.tsx";
import IngredientList from "./features/Filter/IngredientList.tsx";

const getAuthenticated = (element: JSX.Element | ReactNode) =>
  authenticatedUser() ? element : <Navigate to="/login" />;

const getAuthenticatedRoutes = (routes: RouteObject[]) =>
  routes.map((route) => {
    return { ...route, element: getAuthenticated(route.element) };
  });

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "profile",
            children: getAuthenticatedRoutes(ProfileRoutes),
          },
          {
            path: "recipe",
            children: getAuthenticatedRoutes(RecipeRoutes),
          },
          {
            path: "tag",
            element: getAuthenticated(<TagList />),
          },
          {
            path: "ingredient",
            element: getAuthenticated(<IngredientList />),
          },
        ],
      },
      ...AuthRoutes,
    ],
  },
]);
