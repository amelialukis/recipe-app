import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import tabletCookingRecipe from "../../assets/images/tablet_cooking_recipe.png";
import useSignup from "./hooks/useSignup.ts";
import useLogin from "./hooks/useLogin.ts";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, error, isLoading } = useSignup();
  const { mutate: login, isSuccess: loginSuccess } = useLogin();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (isSuccess) {
      login({ email: user.email, password: user.password });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess]);

  const onLoginPage = () => {
    navigate("/login");
  };

  const onSignupButton = () => {
    mutate(user);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.id]: event.currentTarget.value });
  };

  return (
    <Stack
      w="100%"
      h="100vh"
      bgColor="orange.300"
      justifyContent="center"
      align="center"
    >
      <Card
        w={{ base: "90%", md: "60%" }}
        h={{ base: "90%", md: "70%" }}
        opacity="85%"
        justifyContent="center"
        overflow="hidden"
      >
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
        >
          <GridItem
            hideBelow="md"
            colSpan={{ base: 0, md: 3 }}
            px="20px"
            textAlign="center"
          >
            <Stack
              align="center"
              spacing="20px"
              h="100%"
              justifyContent="center"
            >
              <Text fontSize="5xl" fontWeight="600">
                Create Account
              </Text>
              <Text>Register to add and get a list of your own recipes.</Text>
              <Image src={tabletCookingRecipe} boxSize="150px" />
            </Stack>
          </GridItem>
          <GridItem colSpan={2} px="30px">
            <Center>
              <Stack maxW="300px">
                <Box onClick={() => navigate("/")} cursor="pointer">
                  <Heading fontSize="30px" textAlign="center">
                    Recipe App
                  </Heading>
                </Box>
                <FormControl isInvalid={!!error?.response?.data?.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={user.name}
                    onChange={onUserChange}
                    variant="orangeOutline"
                  />
                  {error?.response?.data?.name && (
                    <FormErrorMessage>
                      {error.response.data.name}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!error?.response?.data?.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={onUserChange}
                    variant="orangeOutline"
                  />
                  {error?.response?.data?.email && (
                    <FormErrorMessage>
                      {error.response.data.email}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!error?.response?.data?.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={onUserChange}
                    variant="orangeOutline"
                  />
                  {error?.response?.data?.password && (
                    <FormErrorMessage>
                      {error.response.data.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  mt="10px"
                  colorScheme="orange"
                  w="100%"
                  onClick={onSignupButton}
                  isLoading={isLoading}
                >
                  Submit
                </Button>
                <Button
                  colorScheme="orange"
                  w="100%"
                  variant="outline"
                  onClick={onLoginPage}
                >
                  Go to Login Page
                </Button>
              </Stack>
            </Center>
          </GridItem>
        </Grid>
      </Card>
    </Stack>
  );
};
export default Signup;
