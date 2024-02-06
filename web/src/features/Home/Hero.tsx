import { Box, Button, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import thinkingFood from "../../assets/images/food_omoide.png";

const Hero = () => {
  const navigate = useNavigate()

  return (
    <Box
      m={0}
      w="100%"
      bgColor="#FBDAB2"
      px={{ base: 0, md: "50px" }}
    >
      <SimpleGrid
        columns={{ base: 0, md: 2 }}
        spacing="0"
        py={{base: "10px", md: "50px"}}
        h="calc(100vh - 80px)"
      >
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
          <Image src={thinkingFood} h={{base: "30vh", md: "40vw", lg: "30vw"}}/>
        </Box>
        <Stack
          justifyContent="center"
          spacing={0}
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl", "2xl": "8xl" }}
          mx={{ base: "auto", md: 0 }}
        >
          <Text
            fontWeight="800"
            lineHeight="1"
            textTransform="uppercase"
            color="orange.400"
          >
            Let's cook up
          </Text>
          <Text
            fontWeight="800"
            lineHeight="1"
            textTransform="uppercase"
            color="orange.400"
          >
            something
          </Text>
          <Text
            fontWeight="800"
            lineHeight="1"
            textTransform="uppercase"
            color="white"
          >
            extraordinary
          </Text>
          <Text
            fontWeight="800"
            lineHeight="1"
            textTransform="uppercase"
            color="white"
          >
            together!
          </Text>
          <Button
              mt={3}
              colorScheme="orange"
              size="lg"
              maxW="200px"
              onClick={() => navigate("/recipe")}
          >
            View Recipes
          </Button>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};
export default Hero;
