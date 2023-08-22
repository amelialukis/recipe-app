import {createBrowserRouter} from "react-router-dom";
import AuthRoutes from "./features/Auth/router.tsx";
import Layout from "./Layout.tsx";


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
                        element: <div>profile</div>
                    }
                ]
            },
            ...AuthRoutes
        ]
    },
]);