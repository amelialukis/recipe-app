import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {decamelizeKeys} from "humps";
import { RecipeType } from "./types";
import RecipeForm from "./RecipeForm.tsx";
import { useNavigate, useParams } from "react-router-dom";
import useEditRecipeDetail from "./hooks/useEditRecipeDetail.ts";
import useGetRecipeDetail from "./hooks/useGetRecipeDetail.ts";
import LoadSpinner from "../LoadSpinner.tsx";
import {useEffect} from "react";

const RecipeEdit = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { data, isError, isLoading } = useGetRecipeDetail(recipeId);
  const editRecipe = data && data?.data && data.data;
  const { mutate, error, isSuccess } = useEditRecipeDetail(recipeId);
  const onSave = (recipe: RecipeType) => {
    delete recipe.image
    mutate(decamelizeKeys(recipe));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/recipe/${recipeId}/`)
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editRecipe?.user) {
      navigate(`/recipe/${recipeId}/`)
    }
  }, [editRecipe]);

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
        <Box
          py="20px"
          mx={{ base: "2px", md: "50px" }}
          display="flex"
          justifyContent="center"
        >
          <Card
            borderColor="orange.100"
            variant="outline"
            w="100%"
            maxW="700px"
          >
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
            <RecipeForm onSave={onSave} recipe={editRecipe} error={error} />
          </Card>
        </Box>
      )}
    </Stack>
  );
};
export default RecipeEdit;
