import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useGetUser from "./hooks/useGetUser.ts";
import React, { useEffect, useState } from "react";
import useEditUser, { UserData } from "./hooks/useEditUser.ts";

const ProfileEdit = () => {
  const { data, isError } = useGetUser();
  const { mutate, error, isSuccess } = useEditUser();
  const [user, setUser] = useState<UserData>({
    name: data?.data.name,
    email: data?.data.email,
  } as UserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess]);

  const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.id]: event.currentTarget.value });
  };

  const onSave = () => {
    mutate(user);
  };
  return (
    <Stack>
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Can't fetch data.</AlertDescription>
        </Alert>
      )}

      <Box
        my="20px"
        mx={{ base: "2px", md: "50px" }}
        display="flex"
        justifyContent="center"
      >
        <Card borderColor="orange.100" variant="outline" w="100%" maxW="700px">
          <CardHeader>
            <IconButton
              aria-label="new recipe"
              icon={<ArrowBackIcon />}
              variant="outline"
              colorScheme="orange"
              color="orange.200"
              onClick={() => navigate(-1)}
            />
            <Text fontSize="2xl" fontWeight="600" mt="20px">
              Edit Profile
            </Text>
          </CardHeader>

          <CardBody>
            <Stack>
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
                {error?.response?.data.email && (
                  <FormErrorMessage>
                    {error.response.data.email}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!error?.response?.data?.password}>
                <FormLabel>Change Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={onUserChange}
                  variant="orangeOutline"
                />
                {error?.response?.data.password && (
                  <FormErrorMessage>
                    {error.response.data.password}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </CardBody>
          <CardFooter justifyContent="end">
            <Button variant="ghost" colorScheme="orange" onClick={onSave}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Box>
    </Stack>
  );
};
export default ProfileEdit;
