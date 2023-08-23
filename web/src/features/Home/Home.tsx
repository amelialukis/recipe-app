import { Box, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import thinkingFood from "../../assets/images/food_omoide.png";

const Home = () => {
  return (
    <Box
      m={0}
      w="100%"
      h={{ base: "100vh", lg: "full" }}
      bgColor="#FBDAB2"
      px={{ base: 0, md: "50px" }}
    >
      <SimpleGrid
        columns={{ base: 0, lg: 2 }}
        spacing="0"
        py="50px"
        h={{ lg: "full" }}
      >
        <Box justifyContent="center" display="flex">
          <Image src={thinkingFood} maxW={{ base: "200px", md: "800px" }} />
        </Box>
        <Stack
          justifyContent="center"
          spacing={0}
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl", "2xl": "8xl" }}
          my={{ base: "50px", lg: 0 }}
          mx={{ base: "auto", lg: 0 }}
        >
          <Text
            fontWeight="800"
            lineHeight="1"
            letterSpacing="-5px"
            textTransform="uppercase"
            color="orange.400"
          >
            Let's cook up
          </Text>
          <Text
            fontWeight="800"
            lineHeight="1"
            letterSpacing="-5px"
            textTransform="uppercase"
            color="orange.400"
          >
            something
          </Text>
          <Text
            fontWeight="800"
            lineHeight="1"
            letterSpacing="-5px"
            textTransform="uppercase"
            color="white"
          >
            extraordinary
          </Text>
          <Text
            fontWeight="800"
            lineHeight="1"
            letterSpacing="-5px"
            textTransform="uppercase"
            color="white"
          >
            together!
          </Text>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};
export default Home;
