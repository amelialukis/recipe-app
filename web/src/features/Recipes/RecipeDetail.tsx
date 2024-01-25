import React, {useEffect} from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Stack,
  StackDivider,
  Tag,
  Text,
  Link,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
  AlertDescription,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { LockIcon, EditIcon, UnlockIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { USD } from "../../currencyFormat.ts";
import RecipeDetailAccordion from "./RecipeDetailAccordion.tsx";
import RecipeDetailTab from "./RecipeDetailTab.tsx";
import useGetRecipeDetail from "./hooks/useGetRecipeDetail.ts";
import LoadSpinner from "../LoadSpinner.tsx";
import {RecipeType} from "./types";
import RecipeImagePopover from "./RecipeImagePopover.tsx";
import useEditRecipeDetail from "./hooks/useEditRecipeDetail.ts";
import RecipeLockUnlockAlert from "./RecipeLockUnlockAlert.tsx";
import useLikeRecipe from "./hooks/useLikeRecipe.ts";
import LikeIcon from "../../theme/Icons/LikeIcon.tsx";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { data, isError, isLoading } = useGetRecipeDetail(recipeId);
  const { mutate, isSuccess } = useEditRecipeDetail(recipeId);
  const { mutate: like, isSuccess: likeSuccess, isError: likeError } = useLikeRecipe();
  const recipe = data?.data ? data.data: {} as RecipeType;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast()

  const onToggle = () => {
    mutate({private: !recipe.private})
    onClose()
  }

  useEffect(() => {
    if (isSuccess || likeSuccess) {
      navigate(0)
    }
    else if (likeError) {
      toast({
        title: "We're sorry.",
        description: "There is something wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }, [isSuccess, likeSuccess, likeError]);

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
        <Stack
          my="20px"
          mx={{ base: "5px", md: "50px", "2xl": "auto" }}
          maxW="1500px"
        >
          <Grid
            templateColumns={{
              base: "repeat(1, 1r)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "20px", lg: "30px" }}
          >
            <GridItem
              borderWidth="1px"
              borderColor="orange.100"
              borderRadius="10px"
              overflow="hidden"
              display="flex"
              justifyContent="center"
            >
              <RecipeImagePopover image={recipe?.image} user={recipe?.user}/>
            </GridItem>
            <GridItem colSpan={{ lg: 2 }}>
              <Card
                borderColor="orange.100"
                variant="outline"
                w="100%"
                h="100%"
              >
                <CardHeader>
                  <HStack justifyContent="space-between">
                    <Text fontSize="xl" fontWeight="600">
                      {recipe?.title}
                    </Text>
                    <HStack>
                      <Tooltip label="Like recipe.">
                        <IconButton
                            aria-label="like recipe"
                            icon={<LikeIcon />}
                            variant={recipe.liked ? "solid": "outline"}
                            colorScheme="orange"
                            color="orange.200"
                            onClick={() => {if (recipeId) like(recipeId)}}
                        />
                      </Tooltip>
                      {!recipe?.user &&
                        <HStack>
                          <Tooltip label="Lock/Unlock Recipe">
                            <IconButton
                                aria-label="lock unlock"
                                icon={recipe.private ? <LockIcon /> : <UnlockIcon />}
                                variant={recipe.private ? "solid": "outline"}
                                colorScheme="orange"
                                color="orange.200"
                                onClick={onOpen}
                            />
                          </Tooltip>
                          <RecipeLockUnlockAlert
                              isPrivate={recipe.private}
                              isOpen={isOpen}
                              onClose={onClose}
                              cancelRef={cancelRef}
                              onToggle={onToggle}
                          />
                          <Tooltip label="Edit recipe.">
                            <IconButton
                              aria-label="edit recipe"
                              icon={<EditIcon />}
                              variant="outline"
                              colorScheme="orange"
                              color="orange.200"
                              onClick={() => navigate(`/recipe/${recipe.id}/edit`)}
                            />
                          </Tooltip>
                        </HStack>
                      }
                    </HStack>
                  </HStack>
                </CardHeader>

                <CardBody>
                  <Stack
                    divider={<StackDivider borderColor="orange.100" />}
                    spacing="4"
                  >
                    <HStack justifyContent="space-between">
                      <Text>Price</Text>
                      <Text>{recipe?.price && USD.format(recipe.price)}</Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text>Time</Text>
                      {recipe?.timeMinutes &&
                        <Text>{recipe.timeMinutes} minute(s)</Text>
                      }
                    </HStack>
                    <HStack justifyContent="space-between">
                      <Text>Link</Text>
                      <Link href={recipe?.link} isExternal>
                        {recipe?.link}
                      </Link>
                    </HStack>
                    {recipe?.user &&
                        <HStack justifyContent="space-between">
                          <Text>Recipe by</Text>
                          <Text>{recipe.user}</Text>
                        </HStack>
                    }
                    <Text textAlign="end">{recipe.likes} like(s)</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem hideFrom="lg" colSpan={{ base: 1, md: 2 }}>
              <RecipeDetailAccordion
                desc={recipe.description}
                ingredients={recipe.ingredients}
                procedures={recipe.procedures}
              />
            </GridItem>

            <GridItem colSpan={{ md: 2, lg: 1 }}>
              <Stack maxH="45vh" p={{ base: "10px", lg: 0 }}>
                <Text>Tags</Text>
                <Box
                  overflowY={{ lg: "scroll" }}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "0",
                    },
                  }}
                >
                  {recipe.tags &&
                    recipe.tags.map((tag) => (
                      <Tag
                        key={tag.name}
                        colorScheme="orange"
                        w="auto"
                        mr="5px"
                        textTransform="capitalize"
                      >
                        {tag.name}
                      </Tag>
                    ))}
                </Box>
              </Stack>
            </GridItem>
          </Grid>

          <Box hideBelow="lg">
            <RecipeDetailTab
              desc={recipe.description}
              ingredients={recipe.ingredients}
              procedures={recipe.procedures}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
export default RecipeDetail;
