import { Box, Card, CardHeader, IconButton, Text } from "@chakra-ui/react";
import { RecipeType } from "./types";
import RecipeForm from "./RecipeForm.tsx";
import { recipes } from "../../recipes.ts";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const editRecipe = recipes[3];
const RecipeEdit = () => {
  const navigate = useNavigate();
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
          <IconButton
            aria-label="new recipe"
            icon={<ArrowBackIcon />}
            variant="outline"
            colorScheme="orange"
            color="orange.200"
            onClick={() => navigate(-1)}
          />
          <Text fontSize="2xl" fontWeight="600" mt="20px">
            Edit Recipe
          </Text>
        </CardHeader>
        <RecipeForm onSave={onSave} recipe={editRecipe} />
      </Card>
    </Box>
  );
};
export default RecipeEdit;
