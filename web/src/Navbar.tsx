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
import {HamburgerIcon} from "@chakra-ui/icons";
import {authenticatedUser, useLogout} from "./api";
import {Link, NavLink, useNavigate} from "react-router-dom";
import cookingRecipe from "./assets/images/cooking_recipe.png";

const Navbar = () => {
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    // const btnRef = useRef();
    return (
        <Stack
            w="100%"
            py="15px"
            px={{base: "5px", md: "50px"}}
            bgColor="orange.300"
        >
            <HStack justifyContent="space-between">
                <HStack>
                    <Link to="/">
                        <HStack>
                            <Image src={cookingRecipe} boxSize="50px"/>
                            <Heading color="white">Recipe App</Heading>
                        </HStack>
                    </Link>
                    {authenticatedUser() && (
                        <HStack spacing="20px" ml="40px" hideBelow="md">
                            <NavLink to="/profile">
                                {({isActive, isPending}) => (
                                    <Button
                                        color="white"
                                        variant="link"
                                        isActive={isActive}
                                        isLoading={isPending}
                                        _active={{
                                            color: "orange.500",
                                        }}
                                    >
                                        Profile
                                    </Button>
                                )}
                            </NavLink>
                            <NavLink to="/recipe">
                                {({isActive, isPending}) => (
                                    <Button
                                        color="white"
                                        variant="link"
                                        isActive={isActive}
                                        isLoading={isPending}
                                        _active={{
                                            color: "orange.500",
                                        }}
                                    >
                                        Recipes
                                    </Button>
                                )}
                            </NavLink>
                            <NavLink to="/tag">
                                {({isActive, isPending}) => (
                                    <Button
                                        color="white"
                                        variant="link"
                                        isActive={isActive}
                                        isLoading={isPending}
                                        _active={{
                                            color: "orange.500",
                                        }}
                                    >
                                        Tags
                                    </Button>
                                )}
                            </NavLink>
                            <NavLink to="/ingredient">
                                {({isActive, isPending}) => (
                                    <Button
                                        color="white"
                                        variant="link"
                                        isActive={isActive}
                                        isLoading={isPending}
                                        _active={{
                                            color: "orange.500",
                                        }}
                                    >
                                        Ingredients
                                    </Button>
                                )}
                            </NavLink>
                        </HStack>
                    )}
                </HStack>
                <Box hideFrom="md">
                    <IconButton
                        aria-label="menu"
                        icon={<HamburgerIcon/>}
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
                        <DrawerOverlay/>
                        <DrawerContent bgColor="orange.300" py="30px">
                            <DrawerCloseButton color="white" size="lg" py="30px"/>
                            {authenticatedUser() ? (
                                <DrawerBody>
                                    <Stack mt="50px" spacing="30px">
                                        <Button
                                            color="white"
                                            variant="link"
                                            size="lg"
                                            _active={{
                                                color: "orange.500",
                                            }}
                                            onClick={() => {
                                                onClose();
                                                navigate("/");
                                            }}
                                        >
                                            Home
                                        </Button>
                                        <Button
                                            color="white"
                                            variant="link"
                                            size="lg"
                                            _active={{
                                                color: "orange.500",
                                            }}
                                            onClick={() => {
                                                onClose();
                                                navigate("/profile");
                                            }}
                                        >
                                            Profile
                                        </Button>
                                        <Button
                                            color="white"
                                            variant="link"
                                            size="lg"
                                            _active={{
                                                color: "orange.500",
                                            }}
                                            onClick={() => {
                                                onClose();
                                                navigate("/recipe");
                                            }}
                                        >
                                            Recipes
                                        </Button>
                                        <Button
                                            color="white"
                                            variant="link"
                                            size="lg"
                                            _active={{
                                                color: "orange.500",
                                            }}
                                            onClick={() => {
                                                onClose();
                                                navigate("/tag");
                                            }}
                                        >
                                            Tags
                                        </Button>
                                        <Button
                                            color="white"
                                            variant="link"
                                            size="lg"
                                            _active={{
                                                color: "orange.500",
                                            }}
                                            onClick={() => {
                                                onClose();
                                                navigate("/ingredient");
                                            }}
                                        >
                                            Ingredients
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                onClose();
                                                useLogout();
                                                navigate("/");
                                            }}
                                            color="white"
                                            variant="link"
                                            size="lg"
                                            _active={{
                                                color: "orange.500",
                                            }}
                                        >
                                            Log out
                                        </Button>
                                    </Stack>
                                </DrawerBody>
                            ) : (
                                <DrawerBody>
                                    <Button
                                        mt="50px"
                                        onClick={() => {
                                            onClose();
                                            navigate("/login");
                                        }}
                                        color="white"
                                        variant="link"
                                        size="lg"
                                        _active={{
                                            color: "orange.500",
                                        }}
                                        w="100%"
                                    >
                                        Log in
                                    </Button>
                                </DrawerBody>
                            )}
                        </DrawerContent>
                    </Drawer>
                </Box>
                {authenticatedUser() ? (
                    <HStack hideBelow="md">
                        <Button
                            onClick={() => {
                                useLogout();
                                navigate("/");
                            }}
                            color="white"
                            variant="link"
                            size="lg"
                            _active={{
                                color: "orange.500",
                            }}
                        >
                            Log out
                        </Button>
                    </HStack>
                ) : (
                    <HStack hideBelow="md">
                        <Button
                            onClick={() => {
                                useLogout();
                                navigate("/login");
                            }}
                            color="white"
                            variant="link"
                            size="lg"
                            _active={{
                                color: "orange.500",
                            }}
                        >
                            Log in
                        </Button>
                    </HStack>
                )}
            </HStack>
        </Stack>
    );
};
export default Navbar;