import React, { useState } from "react";
import {
  CardBody,
  FormControl,
  FormLabel,
  Stack,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  HStack,
  UnorderedList,
  ListItem,
  CloseButton,
  Tooltip,
  Button,
  CardFooter, Alert, AlertIcon, AlertDescription,
} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import { Theme } from "react-select";
import Select from "react-select";
import { AddIcon } from "@chakra-ui/icons";
import { RecipeType } from "./types";
import useGetTags from "../Filter/hooks/useGetTags.ts";
import useGetIngredients from "../Filter/hooks/useGetIngredients.ts";
import useGetUnits from "./hooks/useGetUnits.ts";
import getOptions from "./utils/getOptions.ts";

const orangeTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    neutral10: "#FEEBC8",
    neutral5: "#FEEBC8",
    neutral20: "#FEEBC8",
    neutral30: "#FBD38D",
    neutral40: "#F6AD55",
    neutral60: "#ED8936",
    neutral80: "#DD6B20",
    primary: "#F6AD55",
    primary25: "#FEEBC8",
  },
});

interface Props {
  recipe?: RecipeType;
  onSave: (recipe: RecipeType | any) => void;
}

const RecipeForm = ({ recipe: recipe_, onSave }: Props) => {
  const {data: tags, isError: tagError} = useGetTags()
  const {data: units, isError: unitsError} = useGetUnits()
  const {data: ings, isError: ingsError} = useGetIngredients()
  const tagOptions = getOptions(tags?.data)
  const unitOptions = getOptions(units?.data)
  const ingredientOptions = getOptions(ings?.data)
  const isError = tagError && unitsError && ingsError
  const initialRecipe = recipe_
    ? recipe_
    : {
        id: 0,
        title: "",
        description: "",
        timeMinutes: "",
        price: "",
        link: "",
        tags: [],
        ingredients: [],
        image: "",
      };
  const [recipe, setRecipe] = useState(initialRecipe as RecipeType);
  const initialIngredient = recipe?.ingredients
    ? recipe.ingredients.map((ing) => ({
        ...ing,
        unit: { value: ing.unit.id, label: ing.unit.name },
        ingredient: { value: ing.ingredient.id, label: ing.ingredient.name },
      }))
    : [];
  const initialTag = recipe.tags
    ? recipe.tags.map((tag) => ({ value: tag.id, label: tag.name }))
    : [];
  const [ingQuantity, setIngQuantity] = useState<{
    amount: number | string;
    unit: { value: number; label: string } | null;
    ingredient: { value: number; label: string } | null;
  }>({
    amount: "",
    unit: null,
    ingredient: null,
  });
  const [ingList, setIngList] = useState<
    {
      amount: number;
      unit: { value: number; label: string };
      ingredient: { value: number; label: string };
    }[]
  >(initialIngredient);

  const onAddIng = () => {
    const newIng = ingQuantity;
    newIng.amount &&
      newIng.unit &&
      newIng.ingredient &&
      ingList.filter((ing) => ing.ingredient.label == newIng.ingredient?.label)
        .length === 0 &&
      setIngList([
        ...ingList,
        newIng as {
          amount: number;
          unit: { value: number; label: string };
          ingredient: { value: number; label: string };
        },
      ]);
    setIngQuantity({
      amount: "",
      unit: null,
      ingredient: null,
    });
  };
  const onRecipeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe({ ...recipe, [event.target.id]: event.currentTarget.value });
  };

  const onRecipeSave = () => {
    const ingredientsList = ingList.map((ing) => ({
      amount: ing.amount,
      unit: { id: ing.unit.value, name: ing.unit.label },
      name: { id: ing.ingredient.value, name: ing.ingredient.label },
    }));
    const newRecipe = { ...recipe, ingredients: ingredientsList };
    onSave(newRecipe);
  };

  return (
    <Stack>
      {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Something went wrong.</AlertDescription>
          </Alert>
      )}
      <CardBody>
        <Stack spacing="15px">
          <FormControl isRequired>
            <FormLabel>Recipe Name</FormLabel>
            <Input
              id="title"
              type="text"
              variant="orangeOutline"
              value={recipe.title}
              onChange={onRecipeChange}
              placeholder="Your recipe name..."
            />
          </FormControl>
          <SimpleGrid columns={2} columnGap="15px" alignItems="end">
            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                id="price"
                type="number"
                step=".01"
                variant="orangeOutline"
                placeholder="Price in USD"
                value={recipe.price}
                onChange={onRecipeChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Time (minutes)</FormLabel>
              <Input
                id="timeMinutes"
                type="number"
                variant="orangeOutline"
                placeholder="Preparation and cooking time in minutes"
                value={recipe.timeMinutes}
                onChange={onRecipeChange}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel>Recipe Image</FormLabel>
            <Input
              id="image"
              type="file"
              borderWidth={0}
              p={0}
              borderRadius={0}
              w="200px"
              value={recipe.image}
              onChange={onRecipeChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              id="description"
              resize="vertical"
              borderColor="orange.100"
              _hover={{
                borderColor: "orange.200",
              }}
              _focusVisible={{
                border: "2px solid",
                borderColor: "orange.300",
              }}
              _disabled={{
                bg: "orange.50",
              }}
              placeholder="Description of the food..."
              value={recipe.description}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setRecipe({ ...recipe, description: event.target.value })
              }
            />
          </FormControl>
          <FormControl fontSize="md" isRequired>
            <FormLabel>Ingredients</FormLabel>
            {ingList && (
              <UnorderedList mb="10px">
                {ingList.map((ing) => (
                  <ListItem key={ing.ingredient.value}>
                    <HStack>
                      <Text>
                        {ing.amount} {ing.unit.label} {ing.ingredient.label}
                      </Text>
                      <Tooltip label="Delete ingredient" fontSize="sm">
                        <CloseButton
                          size="sm"
                          color="red"
                          onClick={() =>
                            setIngList(ingList.filter((i) => i !== ing))
                          }
                        />
                      </Tooltip>
                    </HStack>
                  </ListItem>
                ))}
              </UnorderedList>
            )}
            <HStack>
              <SimpleGrid
                columns={{ md: 3 }}
                columnGap="10px"
                rowGap="10px"
                w="100%"
              >
                <Input
                  id="amount"
                  type="number"
                  step=".01"
                  variant="orangeOutline"
                  placeholder="Amount"
                  value={ingQuantity.amount}
                  onChange={(e) =>
                    e &&
                    setIngQuantity({
                      ...ingQuantity,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
                <Select
                  id="unit"
                  options={unitOptions}
                  required
                  theme={orangeTheme}
                  placeholder="Unit"
                  value={ingQuantity.unit}
                  onChange={(e) =>
                    e && setIngQuantity({ ...ingQuantity, unit: e })
                  }
                />
                <CreatableSelect
                  id="ingredient"
                  required
                  options={ingredientOptions}
                  theme={orangeTheme}
                  placeholder="Ingredient's name"
                  value={ingQuantity.ingredient}
                  onChange={(e) =>
                    e && setIngQuantity({ ...ingQuantity, ingredient: e })
                  }
                />
              </SimpleGrid>
              <IconButton
                aria-label="add ingredient"
                icon={<AddIcon />}
                colorScheme="orange"
                size="sm"
                onClick={onAddIng}
              />
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Link</FormLabel>
            <Input
              id="link"
              type="url"
              variant="orangeOutline"
              placeholder="Other references..."
              value={recipe.link}
              onChange={onRecipeChange}
            />
          </FormControl>
          <FormControl fontSize="md">
            <FormLabel>Tags</FormLabel>
            <CreatableSelect
              isMulti
              isClearable
              options={tagOptions}
              theme={orangeTheme}
              value={initialTag}
              onChange={(e) =>
                setRecipe({
                  ...recipe,
                  tags: e.map((t) => ({ id: t.value, name: t.label })),
                })
              }
            />
          </FormControl>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="end">
        <Button variant="ghost" colorScheme="orange" isDisabled={isError} onClick={onRecipeSave}>
          Save
        </Button>
      </CardFooter>
    </Stack>
  );
};
export default RecipeForm;
