import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import ButtonFilter from "./ButtonFilter.tsx";
import useGetTags from "./hooks/useGetTags.ts";
import LoadSpinner from "../LoadSpinner.tsx";

const TagList = () => {
  const { data: tags, isError, isLoading } = useGetTags();
  return (
    <Stack>
      {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Can't fetch data.</AlertDescription>
        </Alert>
      )}
      {isLoading ? (
        <LoadSpinner />
      ) : (
        <Box mx={{ base: "5px", md: "50px" }} my="20px">
          <Text fontSize="3xl" fontWeight="300" pb="20px" pl="10px">
            Tags
          </Text>
          {tags?.data ? (
            <ButtonFilter list={tags.data} paramKey={"tags"}/>
          ) : (
            <Text>No tags was found.</Text>
          )}
        </Box>
      )}
    </Stack>
  );
};
export default TagList;
