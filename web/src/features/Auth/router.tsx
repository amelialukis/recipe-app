import { RouteObject } from "react-router-dom";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";

const AuthRoutes: RouteObject[] = [
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "signup/",
    element: <Signup />,
  },
];

export default AuthRoutes;
