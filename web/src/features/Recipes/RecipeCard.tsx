import { Box, Card, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import tableware from "../../assets/images/thumbnail_syokki_plastic_fork.jpg";
import { USD } from "../../currencyFormat.ts";
import { RecipeType } from "./types";

interface Props {
  recipe: RecipeType;
}

const RecipeCard = ({ recipe }: Props) => {
  const navigate = useNavigate();
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
        cursor="pointer"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        <Stack>
          <Box
            borderColor="orange.100"
            h={{ md: "320px", xl: "210px" }}
            justifyContent="center"
            display="flex"
            borderWidth="1px"
          >
            <Image src={recipe.image || tableware} objectFit="cover" />
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
