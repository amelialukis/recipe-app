import {Stack} from "@chakra-ui/react";
import Navbar from "./Navbar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <Stack w="100%" h="100vh">
            <Navbar/>
            <Outlet/>
        </Stack>
    )
}
export default Layout