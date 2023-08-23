import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Center,
  FormControl,
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

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, error, isLoading } = useSignup();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

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
              <Text fontSize="3xl" fontWeight="300">
                Create Account
              </Text>
              <Text>Register to add and get a list of your own recipes.</Text>
              <Image src={tabletCookingRecipe} boxSize="150px" />
            </Stack>
          </GridItem>
          <GridItem colSpan={2} px="30px">
            <Center>
              <Stack maxW="300px">
                <Heading fontSize="30px" textAlign="center">
                  Recipe App
                </Heading>
                {error && <Text>{error.message}</Text>}
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={user.name}
                    onChange={onUserChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={onUserChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={onUserChange}
                  />
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
