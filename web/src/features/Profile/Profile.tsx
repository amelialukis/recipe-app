import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  StackDivider,
  HStack,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
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
            Profile
          </Text>
        </CardHeader>

        <CardBody>
          <Stack
            divider={<StackDivider borderColor="orange.100" />}
            spacing="4"
          >
            <HStack justifyContent="space-between">
              <Text>Name</Text>
              <Text>User</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Email Address</Text>
              <Text>test1@example.com</Text>
            </HStack>
          </Stack>
        </CardBody>
        <CardFooter justifyContent="end">
          <Button
            variant="ghost"
            colorScheme="orange"
            onClick={() => navigate("/profile/edit")}
          >
            Edit
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
export default Profile;
