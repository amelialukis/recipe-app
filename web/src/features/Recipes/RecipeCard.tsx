import { Box, Card, Image, Stack, Tag, Text } from "@chakra-ui/react";
import tableware from "../../assets/images/thumbnail_syokki_plastic_fork.jpg";
import { USD } from "../../currencyFormat.ts";

interface Props {
  recipe: {
    id: number;
    title: string;
    description: string;
    timeMinutes: number;
    price: number;
    link: string;
    tags: {
      name: string;
    }[];
    ingredients: {
      name: string;
    }[];
    image: string;
  };
}

const RecipeCard = ({ recipe }: Props) => {
  const tags = recipe.tags.length <= 5 ? recipe.tags : recipe.tags.slice(0, 3);
  return (
    <Box>
      <Card
        maxW={{ md: "350px", xl: "250px" }}
        h={{ md: "510px", xl: "400px" }}
        borderColor="orange.100"
        variant="outline"
        p="10px"
        transition="30ms, ease-in-out"
        _hover={{
          transform: "scale(1.02,1.02)",
        }}
      >
        <Stack>
          <Box borderColor="orange.100" borderWidth="1px">
            <Image src={recipe.image || tableware} w="100%" objectFit="cover" />
          </Box>
          <Text fontWeight="600">{recipe.title}</Text>
          <Text fontSize="md">{USD.format(recipe.price)}</Text>
          <Text fontSize="md">{recipe.timeMinutes} minute(s)</Text>
          <Box display="block">
            {tags.map((tag) => (
              <Tag key={tag.name} colorScheme="orange" w="auto" mr="5px">
                {tag.name}
              </Tag>
            ))}
            {recipe.tags.length > 5 && (
              <Tag w="auto" bg="white">
                +{recipe.tags.length - 3} more
              </Tag>
            )}
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};
export default RecipeCard;
