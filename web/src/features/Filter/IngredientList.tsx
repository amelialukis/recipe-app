import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import ButtonFilter from "./ButtonFilter.tsx";
import LoadSpinner from "../LoadSpinner.tsx";
import useGetIngredients from "./hooks/useGetIngredients.ts";

const IngredientList = () => {
  const { data: ingredients, isError, isLoading } = useGetIngredients();
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
            Ingredients
          </Text>
          {ingredients?.data ? (
            <ButtonFilter list={ingredients.data} paramKey={"ingredients"}/>
          ) : (
            <Text>No ingredient found.</Text>
          )}
        </Box>
      )}
    </Stack>
  );
};
export default IngredientList;
