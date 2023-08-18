import { createBrowserRouter } from "react-router-dom";
import {Text} from "@chakra-ui/react";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Text>Hello world!</Text>,
    },
]);