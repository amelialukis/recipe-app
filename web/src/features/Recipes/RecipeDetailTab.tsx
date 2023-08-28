import {
  Box,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

interface Props {
  desc: string;
  ingredients: {
    id: number;
    amount: number;
    unit: { id: number; name: string };
    ingredient: { id: number; name: string };
  }[];
}

const RecipeDetailTab = ({ desc, ingredients }: Props) => {
  return (
    <Box my="20px">
      <Tabs
        variant="enclosed"
        colorScheme="orange"
        borderColor="orange.100"
        defaultIndex={0}
        isFitted
      >
        <TabList>
          <Tab>Description</Tab>
          <Tab>Ingredients</Tab>
          <Tab>How to cook</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>{desc}</Text>
          </TabPanel>
          <TabPanel>
            <UnorderedList>
              {ingredients.map((ing) => (
                <ListItem key={ing.id}>
                  {ing.amount} {ing.unit.name} {ing.ingredient.name}
                </ListItem>
              ))}
            </UnorderedList>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default RecipeDetailTab;
