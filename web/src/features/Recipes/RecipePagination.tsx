import {
    Box,
    Button,
    HStack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface Props{
    next: number | undefined;
    previous: number | undefined;
    onPaginate: (page: number) => void;
}

const RecipePagination = ({next, previous, onPaginate}: Props) => {
    return (
        <Box mt="10px">
            <HStack justifyContent="center">
                <Button
                    leftIcon={<ArrowBackIcon />}
                    colorScheme="orange"
                    variant="ghost"
                    size={{base: "xs", lg: "sm"}}
                    isDisabled={!previous}
                    onClick={() => {
                        if (previous) {
                            window.scrollTo({
                                top: 0,
                                behavior: "instant",
                            });
                            onPaginate(previous);
                        }
                    }}
                >
                    Previous
                </Button>
                <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="orange"
                variant="ghost"
                size={{base: "xs", lg: "sm"}}
                isDisabled={!next}
                onClick={() => {
                    if (next) {
                        window.scrollTo({
                            top: 0,
                            behavior: "instant",
                        });
                        onPaginate(next);
                    }
                }}
                >
                    Next
                </Button>
            </HStack>
        </Box>
    )
}

export default RecipePagination