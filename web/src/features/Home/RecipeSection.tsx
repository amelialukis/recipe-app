import { Box, HStack, Text } from "@chakra-ui/react";
import SimpleRecipeCard from "./SimpleRecipeCard.tsx";
import useGetRecipes from "../Recipes/hooks/useGetRecipes.ts";

const RecipeSection = () => {
    const searchParams = new URLSearchParams([["home_recipes", "true"]])
    const { data, isError, isLoading} = useGetRecipes(searchParams);

    if (!(isLoading || isError || data?.data.length == 0)) {
        return (
            <Box my="30px" mx={{base: "10px", md: "20px"}}>
                <Text
                    fontWeight="800"
                    fontSize={{base:"3xl", md: "5xl"}}
                    color="orange.400"
                >
                    Recipes
                </Text>
                <Box overflowX="auto">
                    <HStack
                        spacing={3}
                        w="fit-content"
                        my="20px"
                    >
                        {data?.data.map(recipe =>
                            <SimpleRecipeCard recipe={recipe}/>
                        )}
                    </HStack>
                </Box>
            </Box>
        )
    }
}

export default RecipeSection;