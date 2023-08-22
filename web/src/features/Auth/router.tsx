import {RouteObject} from "react-router-dom";
import Login from "./Login.tsx";

const AuthRoutes: RouteObject[] = [
    {
        path: "login/",
        element: <Login/>
    },

]

export default AuthRoutes