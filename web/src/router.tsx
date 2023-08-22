import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthRoutes from "./features/Auth/router.tsx";
import Layout from "./Layout.tsx";
import {authenticatedUser} from "./api";


export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/",
                element: <Layout/>,
                children: [
                    {
                        path: "/",
                        element: <div>Home</div>
                    },
                    {
                        path: "/profile",
                        element: authenticatedUser() ? <div>profile</div> : <Navigate to="/login"/>
                    }
                ]
            },
            ...AuthRoutes
        ]
    },
]);