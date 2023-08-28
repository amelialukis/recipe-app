import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  StackDivider,
  Tag,
  Text,
  Link,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { USD } from "../../currencyFormat.ts";
import RecipeDetailAccordion from "./RecipeDetailAccordion.tsx";
import RecipeDetailTab from "./RecipeDetailTab.tsx";
import { recipes } from "../../recipes.ts";
import tableware from "../../assets/images/thumbnail_syokki_plastic_fork.jpg";

const recipe = recipes[3];

const RecipeDetail = () => {
  const navigate = useNavigate();
  return (
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
          <Image
            src={recipe.image || tableware}
            w="45vh"
            maxH="45vh"
            objectFit="cover"
          />
        </GridItem>
        <GridItem colSpan={{ lg: 2 }}>
          <Card borderColor="orange.100" variant="outline" w="100%" h="100%">
            <CardHeader>
              <HStack justifyContent="space-between">
                <Text fontSize="xl" fontWeight="600">
                  {recipe.title}
                </Text>
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
            </CardHeader>

            <CardBody>
              <Stack
                divider={<StackDivider borderColor="orange.100" />}
                spacing="4"
              >
                <HStack justifyContent="space-between">
                  <Text>Price</Text>
                  <Text>{USD.format(recipe.price)}</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text>Time</Text>
                  <Text>{recipe.timeMinutes} minute(s)</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text>Link</Text>
                  <Link href={recipe.link} isExternal>
                    {recipe.link}
                  </Link>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem hideFrom="lg" colSpan={{ base: 1, md: 2 }}>
          <RecipeDetailAccordion
            desc={recipe.description}
            ingredients={recipe.ingredients}
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
              {recipe.tags.map((tag) => (
                <Tag key={tag.name} colorScheme="orange" w="auto" mr="5px">
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
        />
      </Box>
    </Stack>
  );
};
export default RecipeDetail;
