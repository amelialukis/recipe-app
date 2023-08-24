import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import RecipeCard from "./RecipeCard.tsx";
import RecipeFilter from "./RecipeFilter.tsx";
import { recipes } from "../../recipes.ts";

const example = recipes;
const RecipeList = () => {
  return (
    <Box my="20px" mx={{ base: "2px", md: "50px" }}>
      <Grid templateColumns={{ lg: "repeat(5, 1fr)" }} gap={4}>
        <GridItem colSpan={4}>
          <Text fontSize="3xl" fontWeight="300" pb="20px" pl="10px">
            Recipes
          </Text>
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
            {example.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </SimpleGrid>
        </GridItem>
        <GridItem colSpan={1} hideBelow="lg">
          <RecipeFilter />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default RecipeList;
