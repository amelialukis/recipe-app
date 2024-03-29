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
  CardFooter,
  Alert,
  AlertIcon,
  AlertDescription,
  FormErrorMessage, NumberInputField, NumberInput,
} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { AddIcon } from "@chakra-ui/icons";
import { RecipeType } from "./types";
import useGetTags from "../Filter/hooks/useGetTags.ts";
import useGetIngredients from "../Filter/hooks/useGetIngredients.ts";
import useGetUnits from "./hooks/useGetUnits.ts";
import getOptions from "./utils/getOptions.ts";
import { orangeTheme } from "../../theme/react-select.ts";
import { AxiosError } from "axios";
import {camelizeKeys} from "humps";


interface Props {
  recipe?: RecipeType;
  onSave: (recipe: RecipeType | any) => void;
  error?: AxiosError<RecipeType> | null;
}

const RecipeForm = ({ recipe: recipe_, onSave, error }: Props) => {
  const { data: tags, isError: tagError } = useGetTags();
  const { data: units, isError: unitsError } = useGetUnits();
  const { data: ings, isError: ingsError } = useGetIngredients();
  const tagOptions = getOptions(tags?.data);
  const unitOptions = getOptions(units?.data);
  const ingredientOptions = getOptions(ings?.data);
  const isError = tagError && unitsError && ingsError;
  const errMessage = error?.response?.data && camelizeKeys(error.response.data) as RecipeType
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
      ingredient: { id: ing.ingredient.value, name: ing.ingredient.label },
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
          <FormControl isRequired isInvalid={!!errMessage?.title}>
            <FormLabel>Recipe Name</FormLabel>
            <Input
              id="title"
              type="text"
              variant="orangeOutline"
              value={recipe.title}
              onChange={onRecipeChange}
              placeholder="Your recipe name..."
            />
            {errMessage?.title && (
              <FormErrorMessage>{errMessage.title}</FormErrorMessage>
            )}
          </FormControl>
          <SimpleGrid columns={2} columnGap="15px" alignItems="start">
            <FormControl isRequired isInvalid={!!errMessage?.price}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                  borderColor="orange.100"
                  allowMouseWheel={false}
                  value={recipe.price}
              >
                <NumberInputField
                  id="price"
                  step=".01"
                  placeholder="Price in USD"
                  onChange={onRecipeChange}
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
                />
              </NumberInput>
              {errMessage?.price && (
                <FormErrorMessage>{errMessage.price}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errMessage?.timeMinutes}
            >
              <FormLabel>Time (minutes)</FormLabel>
              <NumberInput
                 borderColor="orange.100"
                 allowMouseWheel={false}
                 value={recipe.timeMinutes}
              >
                <NumberInputField
                  id="timeMinutes"
                  placeholder="Preparation and cooking time in minutes"
                  onChange={onRecipeChange}
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
                />
              </NumberInput>
              {errMessage?.timeMinutes && (
                <FormErrorMessage>
                  {errMessage.timeMinutes}
                </FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
          <FormControl isInvalid={!!errMessage?.description}>
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
            {errMessage?.description && (
              <FormErrorMessage>
                {errMessage.description}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            fontSize="md"
            isRequired
            isInvalid={!!errMessage?.ingredients}
          >
            <FormLabel>Ingredients</FormLabel>
            {ingList && (
              <UnorderedList mb="10px">
                {ingList.map((ing) => (
                  <ListItem key={ing.ingredient.value}>
                    <HStack>
                      <Text textTransform="capitalize">
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
            {errMessage?.ingredients && (
              <FormErrorMessage>
                {errMessage.ingredients[0].amount +
                  " " +
                    errMessage.ingredients[0].unit.name +
                  " " +
                    errMessage.ingredients[0].ingredient.name}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errMessage?.procedures}>
            <FormLabel>How to cook</FormLabel>
            <Textarea
                id="procedures"
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
                placeholder="Example:
1. ...
2. ...
3. ..."
                value={recipe.procedures}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setRecipe({ ...recipe, procedures: event.target.value })
                }
            />
            {errMessage?.procedures && (
                <FormErrorMessage>
                  {errMessage.procedures}
                </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errMessage?.link}>
            <FormLabel>Link</FormLabel>
            <Input
              id="link"
              type="url"
              variant="orangeOutline"
              placeholder="Other references..."
              value={recipe.link}
              onChange={onRecipeChange}
            />
            {errMessage?.link && (
              <FormErrorMessage>{errMessage.link}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl fontSize="md" isInvalid={!!errMessage?.tags}>
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
            {errMessage?.tags && (
              <FormErrorMessage>
                {errMessage.tags[0].name}
              </FormErrorMessage>
            )}
          </FormControl>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="end">
        <Button
          variant="ghost"
          colorScheme="orange"
          isDisabled={isError}
          onClick={onRecipeSave}
        >
          Save
        </Button>
      </CardFooter>
    </Stack>
  );
};
export default RecipeForm;
