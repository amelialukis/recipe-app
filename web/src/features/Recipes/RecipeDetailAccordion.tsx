import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

interface Props {
  desc?: string;
  ingredients?: {
    id: number;
    amount: number;
    unit: { id: number; name: string };
    ingredient: { id: number; name: string };
  }[];
  procedures: string;
}

const RecipeDetailAccordion = ({ desc, ingredients, procedures }: Props) => {
  return (
    <Stack mx="10px">
      <Accordion allowMultiple borderColor="orange.100">
        <AccordionItem>
          <AccordionButton
            pl={0}
            justifyContent="space-between"
            _hover={{ bgColor: "orange.50" }}
          >
            <Text fontSize="xl">Description</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0}>
            <Box>
              <Text>{desc}</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            pl={0}
            justifyContent="space-between"
            _hover={{ bgColor: "orange.50" }}
          >
            <Text fontSize="xl">Ingredients</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0}>
            <Box>
              <UnorderedList>
                {ingredients && ingredients.map((ing) => (
                  <ListItem key={ing.id}>
                    {ing.amount} {ing.unit.name} {ing.ingredient.name}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            pl={0}
            justifyContent="space-between"
            _hover={{ bgColor: "orange.50" }}
          >
            <Text fontSize="xl">How to cook</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0}>
            <Box>
              <Text>{procedures}</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};
export default RecipeDetailAccordion;
