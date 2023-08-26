import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const ProfileEdit = () => {
  return (
    <Box
      my="20px"
      mx={{ base: "2px", md: "50px" }}
      display="flex"
      justifyContent="center"
    >
      <Card borderColor="orange.100" variant="outline" w="100%" maxW="700px">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="600">
            Edit Profile
          </Text>
        </CardHeader>

        <CardBody>
          <Stack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                type="text"
                // value={user.name}
                // onChange={onUserChange}
                variant="orangeOutline"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                id="email"
                type="email"
                // value={user.email}
                // onChange={onUserChange}
                variant="orangeOutline"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                // value={user.password}
                // onChange={onUserChange}
                variant="orangeOutline"
              />
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter justifyContent="end">
          <Button variant="ghost" colorScheme="orange">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
export default ProfileEdit;
