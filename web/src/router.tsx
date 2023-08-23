import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./features/Auth/router.tsx";
import Layout from "./Layout.tsx";
import { authenticatedUser } from "./api";
import Home from "./features/Home/Home.tsx";

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
            path: "/profile",
            element: authenticatedUser() ? (
              <div>profile</div>
            ) : (
              <Navigate to="/login" />
            ),
          },
        ],
      },
      ...AuthRoutes,
    ],
  },
]);
