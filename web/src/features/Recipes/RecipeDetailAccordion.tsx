import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Props {
  desc: string;
  ingredients: {
    id: number;
    name: string;
  }[];
}

const RecipeDetailAccordion = ({ desc, ingredients }: Props) => {
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
            <Box>{ingredients[0].name}</Box>
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
            <Box></Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};
export default RecipeDetailAccordion;
