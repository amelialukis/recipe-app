import { Box, Stack } from "@chakra-ui/react";
import Navbar from "./Navbar.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Stack w="100%" h="100vh" spacing={0}>
      <Box
        position="fixed"
        overflow="hidden"
        w="100%"
        h="80px"
        zIndex={100}
        boxShadow="md"
      >
        <Navbar />
      </Box>
      <Box mt="80px" h="100vh">
        <Outlet />
      </Box>
    </Stack>
  );
};
export default Layout;
