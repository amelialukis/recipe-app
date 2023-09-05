import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useGetTags from "../Filter/hooks/useGetTags.ts";
import useGetIngredients from "../Filter/hooks/useGetIngredients.ts";

interface Props{
  tagParam: number[] | undefined;
  ingredientParam: number[] | undefined;
  onFilter: (tags: number[] | [], ingredients: number[] | []) => void
}

const RecipeFilter = ({tagParam, ingredientParam, onFilter}: Props) => {
  const {data: tags} = useGetTags()
  const {data: ingredients} = useGetIngredients()
  const [activeTags, setActiveTags] = useState<number[]>(tagParam || []);
  const [activeIng, setActiveIng] = useState<number[]>(ingredientParam || []);
  return (
    <Stack>
      <Text>Filter</Text>

      <Accordion allowMultiple borderColor="orange.100">
        <AccordionItem>
          <AccordionButton
            pl={0}
            justifyContent="space-between"
            _hover={{ bgColor: "orange.50" }}
          >
            <Text fontSize="sm">by Tag:</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0}>
            <Box>
              {tags && tags.data.map((tag) => (
                <Tag
                  key={tag.name}
                  variant={activeTags.includes(tag.id) ? "solid" : "outline"}
                  colorScheme="orange"
                  mr="5px"
                  cursor="pointer"
                  onClick={() => {
                    activeTags.includes(tag.id)
                      ? setActiveTags(activeTags.filter((t) => t !== tag.id))
                      : setActiveTags([...activeTags, tag.id]);
                  }}
                >
                  {tag.name}
                </Tag>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            pl={0}
            justifyContent="space-between"
            _hover={{ bgColor: "orange.50" }}
          >
            <Text fontSize="sm">by Ingredient:</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0}>
            <Box>
              {ingredients && ingredients.data.map((ing) => (
                <Tag
                  key={ing.name}
                  variant={activeIng.includes(ing.id) ? "solid" : "outline"}
                  colorScheme="orange"
                  mr="5px"
                  cursor="pointer"
                  onClick={() => {
                    activeIng.includes(ing.id)
                      ? setActiveIng(activeIng.filter((i) => i !== ing.id))
                      : setActiveIng([...activeIng, ing.id]);
                  }}
                >
                  {ing.name}
                </Tag>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Button colorScheme="orange" onClick={() => onFilter(activeTags, activeIng)}>Filter</Button>
    </Stack>
  );
};
export default RecipeFilter;
