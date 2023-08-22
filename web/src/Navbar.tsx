// import { useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import "@fontsource/indie-flower/400.css";
import { authenticatedUser, useLogout } from "./api";
import { Link, useNavigate } from "react-router-dom";
import cookingRecipe from "./assets/images/cooking_recipe.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef();
  return (
    <Stack
      w="100%"
      py="15px"
      px={{ base: "5px", md: "50px" }}
      bgColor="orange.300"
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Link to="/">
            <HStack>
              <Image src={cookingRecipe} boxSize="50px" />
              <Heading color="white">Recipe App</Heading>
            </HStack>
          </Link>
          {authenticatedUser() && (
            <HStack spacing="20px" ml="40px" hideBelow="md">
              <Button
                color="white"
                variant="link"
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button color="white" variant="link">
                Recipes
              </Button>
              <Button color="white" variant="link">
                Ingredients
              </Button>
              <Button color="white" variant="link">
                Tags
              </Button>
            </HStack>
          )}
        </HStack>
        <Box hideFrom="md">
          <IconButton
            aria-label="menu"
            icon={<HamburgerIcon />}
            color="white"
            variant="link"
            size="lg"
            // ref={btnRef}
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            // finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bgColor="orange.300">
              <DrawerCloseButton color="white" size="lg" />
              {authenticatedUser() ? (
                <DrawerBody>
                  <Stack mt="50px" spacing="30px">
                    <Button
                      color="white"
                      variant="link"
                      size="lg"
                      onClick={() => {
                        onClose();
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </Button>
                    <Button color="white" variant="link" size="lg">
                      Recipes
                    </Button>
                    <Button color="white" variant="link" size="lg">
                      Ingredients
                    </Button>
                    <Button color="white" variant="link" size="lg">
                      Tags
                    </Button>
                    <Button color="white" variant="link" size="lg">
                      Log out
                    </Button>
                  </Stack>
                </DrawerBody>
              ) : (
                <DrawerBody>
                  <Button color="white" variant="link" size="lg">
                    Log in
                  </Button>
                </DrawerBody>
              )}
            </DrawerContent>
          </Drawer>
        </Box>
        {authenticatedUser() ? (
          <HStack hideBelow="md">
            <Button color="white" variant="link" onClick={useLogout}>
              Log out
            </Button>
          </HStack>
        ) : (
          <Link to="/login" />
        )}
      </HStack>
    </Stack>
  );
};
export default Navbar;
