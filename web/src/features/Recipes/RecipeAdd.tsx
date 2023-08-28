import { Box, Card, CardHeader, Text } from "@chakra-ui/react";
import { RecipeType } from "./types";
import RecipeForm from "./RecipeForm.tsx";

const RecipeAdd = () => {
  const onSave = (recipe: RecipeType) => {
    console.log(recipe);
  };

  return (
    <Box
      py="20px"
      mx={{ base: "2px", md: "50px" }}
      display="flex"
      justifyContent="center"
    >
      <Card borderColor="orange.100" variant="outline" w="100%" maxW="700px">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="600">
            New Recipe
          </Text>
        </CardHeader>
        <RecipeForm onSave={onSave} />
      </Card>
    </Box>
  );
};
export default RecipeAdd;
