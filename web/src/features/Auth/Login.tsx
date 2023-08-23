import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
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
import useLogin from "./hooks/useLogin.ts";
import cookingMama from "../../assets/images/cooking_mama.png";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, isError, isLoading } = useLogin();
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const onSignupButton = () => {
    navigate("/signup");
  };

  const onLoginButton = () => {
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
                Welcome Back!
              </Text>
              <Text>Add and get a list of your own recipes.</Text>
              <Image src={cookingMama} boxSize="150px" />
            </Stack>
          </GridItem>
          <GridItem colSpan={2} px="30px">
            <Center>
              <Stack maxW="300px">
                <Heading fontSize="30px" textAlign="center">
                  Recipe App
                </Heading>
                {isError && (
                  <Alert status="error">
                    <AlertIcon />
                    Invalid email or password.
                  </Alert>
                )}
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
                  onClick={onLoginButton}
                  isLoading={isLoading}
                >
                  Login
                </Button>
                <Button
                  colorScheme="orange"
                  w="100%"
                  variant="outline"
                  onClick={onSignupButton}
                >
                  Create account
                </Button>
              </Stack>
            </Center>
          </GridItem>
        </Grid>
      </Card>
    </Stack>
  );
};
export default Login;
