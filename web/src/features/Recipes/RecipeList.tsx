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
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import useGetRecipes from "./hooks/useGetRecipes.ts";

const RecipeList = () => {
  const { data, isError } = useGetRecipes();

  const navigate = useNavigate();
  return (
      <Stack>
        {isError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>Can't fetch data.</AlertDescription>
            </Alert>
        )}

      <Box
        my="20px"
        mx={{ base: "2px", md: "50px" }}
        justifyContent="center"
        display="flex"
      >
        <Grid templateColumns={{ lg: "repeat(5, 1fr)" }} gap="50px" maxW="1500px">
          <GridItem colSpan={4}>
            <HStack justifyContent="space-between" alignItems="center" pb="20px">
              <Text fontSize="3xl" fontWeight="300" pl="10px">
                Recipes
              </Text>
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
                  <RecipeFilter />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 4, "2xl": 5 }}
              columnGap="15px"
              rowGap="15px"
            >
              {data &&
                data.data.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={1} hideBelow="lg">
            <RecipeFilter />
          </GridItem>
        </Grid>
      </Box>
      </Stack>
  );
};
export default RecipeList;
