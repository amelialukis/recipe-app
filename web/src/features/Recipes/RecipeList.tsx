import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel, Alert, AlertDescription, AlertIcon,
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  SimpleGrid, Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import RecipeCard from "./RecipeCard.tsx";
import RecipeFilter from "./RecipeFilter.tsx";
import { AddIcon, AtSignIcon, RepeatIcon } from "@chakra-ui/icons";
import {useNavigate, useSearchParams} from "react-router-dom";
import useGetRecipes from "./hooks/useGetRecipes.ts";
import LoadSpinner from "../LoadSpinner.tsx";
import getParams from "./utils/getParams.ts";
import RecipeSearch from "./RecipeSearch.tsx";

const RecipeList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {tags, ingredients} = getParams(searchParams)

  const { data, isError, isLoading, refetch } = useGetRecipes(searchParams);

  const onFilter = (tags: number[] | [], ingredients: number[] | []) =>{
    searchParams.set("tags", tags.length > 0 ? tags.join(",") : "")
    searchParams.set("ingredients", ingredients.length > 0 ? ingredients.join(","): "")
    setSearchParams(searchParams)
    refetch()
  }

  const onSearch = (search: string = "", sort: string = "") => {
    searchParams.set("title", search)
    searchParams.set("sort_by", sort)
    setSearchParams(searchParams)
    refetch()
  }

  const navigate = useNavigate();
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
          my="20px"
          mx={{ base: "2px", md: "50px" }}
          justifyContent="center"
          display="flex"
        >
          <Grid
            templateColumns={{ lg: "repeat(5, 1fr)" }}
            gap="50px"
            mx="10px"
            w="100%"
            maxW={{"2xl": "1500px"}}
          >
            <GridItem colSpan={4}>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                pb="20px"
              >
                <Text fontSize="3xl" fontWeight="300" pl="10px">
                  Recipes
                </Text>
                <HStack>
                  {!searchParams.get("my_recipe") &&
                    <Tooltip label="Go to my recipes.">
                      <IconButton
                          aria-label="my recipe"
                          icon={<AtSignIcon />}
                          variant="outline"
                          colorScheme="orange"
                          color="orange.200"
                          onClick={() => {
                            searchParams.set("my_recipe", "true")
                            setSearchParams(searchParams)
                            refetch()
                          }}
                      />
                    </Tooltip>
                  }
                  <Tooltip label="Reset filter.">
                    <IconButton
                        aria-label="reset filter"
                        icon={<RepeatIcon />}
                        variant="outline"
                        colorScheme="orange"
                        color="orange.200"
                        onClick={() => {
                          searchParams.delete("my_recipe")
                          searchParams.delete("tags")
                          searchParams.delete("ingredients")
                          searchParams.delete("title")
                          searchParams.delete("sort_by")
                          setSearchParams(searchParams)
                          navigate(0)
                        }}
                    />
                  </Tooltip>
                  <Tooltip label="Add a new recipe.">
                    <IconButton
                      aria-label="new recipe"
                      icon={<AddIcon />}
                      variant="outline"
                      colorScheme="orange"
                      color="orange.200"
                      onClick={() => navigate("/recipe/add")}
                    />
                  </Tooltip>
                </HStack>
              </HStack>
              <RecipeSearch onSearch={onSearch}/>
              <Accordion
                hideFrom="lg"
                allowToggle
                mb="20px"
                borderColor="orange.100"
              >
                <AccordionItem>
                  <AccordionButton
                    justifyContent="center"
                    _hover={{ bgColor: "orange.50" }}
                  >
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <RecipeFilter
                      tagParam={tags}
                      ingredientParam={ingredients}
                      onFilter={onFilter}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 4, "2xl": 5 }}
                columnGap="15px"
                rowGap="15px"
              >
                {data?.data && data.data.length > 0 ? (
                  data.data.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <Text pl="10px">No recipe found.</Text>
                )}
              </SimpleGrid>
            </GridItem>
            <GridItem colSpan={1} hideBelow="lg">
              <RecipeFilter
                tagParam={tags}
                ingredientParam={ingredients}
                onFilter={onFilter}
              />
            </GridItem>
          </Grid>
        </Box>
      )}
    </Stack>
  );
};

export default RecipeList