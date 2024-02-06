import { Box, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import tableware from "../../assets/images/thumbnail_syokki_plastic_fork.jpg";
import {RecipeType} from "../Recipes/types";

interface Props {
    recipe: RecipeType;
}

const SimpleRecipeCard = ({recipe}: Props) => {
    const navigate = useNavigate()
    return (
        <Card
            boxSize={{base:"200px", md: "400px", lg: "500px"}}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
            <Image
                src={recipe.image || tableware}
                objectFit="cover"
                h="100%"
                filter="auto"
                brightness="96%"
                borderRadius="6px"
            />
            <CardBody
                w="100%"
                h="100%"
                position="absolute"
                role="group"
                zIndex="10"
                p="0"
            >
                <Box
                    h="40%"
                    bgColor="transparent"
                    _groupHover={{
                        bgColor: "orange.300",
                        transition: ".8s ease-out",
                        height: "100%"
                    }}
                    borderRadius="6px"
                    display="flex"
                    justifyContent="center"
                >
                    <Text
                        position="absolute"
                        alignSelf="center"
                        opacity="0"
                        fontSize={{base:"xl", md: "3xl"}}
                        _groupHover={{
                            opacity: "100%"
                        }}
                        fontWeight="600"
                        color="white"
                    >
                        View Recipe
                    </Text>
                    <HStack
                        w="100%"
                        justifyContent="space-between"
                        alignItems="start"
                        h="100%"
                        p="10px"
                        _groupHover={{
                            alignItems: "end",
                        }}
                    >
                        <Text
                            fontSize={{base:"2xl", md: "5xl"}}
                            fontWeight="600"
                            color="white"
                            textShadow="0 0 5px orange"
                            letterSpacing="3px"
                        >
                            {recipe.title}
                        </Text>
                        <Text
                            fontSize={{base:"sm", md: "md"}}
                            w="35%"
                            textAlign="end"
                            color="white"
                            textShadow="0 0 5px orange"
                        >
                            {recipe.likes} like(s)
                        </Text>
                    </HStack>
                </Box>
            </CardBody>
        </Card>
    )
}

export default SimpleRecipeCard;