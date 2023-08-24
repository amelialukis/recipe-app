import { Box, Text } from "@chakra-ui/react";
import ButtonFilter from "./ButtonFilter.tsx";
import { ingredients } from "../../recipes.ts";

const IngredientList = () => {
  return (
    <Box mx={{ base: "5px", md: "50px" }} my="20px">
      <Text fontSize="3xl" fontWeight="300" pb="20px" pl="10px">
        Ingredients
      </Text>
      <ButtonFilter list={ingredients} />
    </Box>
  );
};
export default IngredientList;
