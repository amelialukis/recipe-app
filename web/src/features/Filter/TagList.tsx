import { Box, Text } from "@chakra-ui/react";
import { tags } from "../../recipes.ts";
import ButtonFilter from "./ButtonFilter.tsx";

const TagList = () => {
  return (
    <Box mx={{ base: "5px", md: "50px" }} my="20px">
      <Text fontSize="3xl" fontWeight="300" pb="20px" pl="10px">
        Tags
      </Text>
      <ButtonFilter list={tags} />
    </Box>
  );
};
export default TagList;
