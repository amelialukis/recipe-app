import { Box, Card, CardHeader, Text } from "@chakra-ui/react";
import { RecipeType } from "./types";
import RecipeForm from "./RecipeForm.tsx";
import {useNavigate} from "react-router-dom";
import useAddRecipeDetail from "./hooks/useAddRecipeDetail.ts";
import {decamelizeKeys} from "humps";
import {useEffect} from "react";

const RecipeAdd = () => {
  const navigate = useNavigate();
  const { mutate, error, isSuccess } = useAddRecipeDetail();
  const onSave = (recipe: RecipeType) => {
    delete recipe.image
    mutate(decamelizeKeys(recipe));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/recipe/")
    }
  }, [isSuccess]);

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
        <RecipeForm onSave={onSave} error={error}/>
      </Card>
    </Box>
  );
};
export default RecipeAdd;
