import { useEffect } from "react";
import {
    Button,
    HStack,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
} from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom";
import tableware from "../../assets/images/thumbnail_syokki_plastic_fork.jpg";
import useUploadImage from "./hooks/useUploadImage.ts";

interface Props{
    image?: string;
}

const RecipeImagePopover = ({ image }: Props) => {
    const { recipeId } = useParams()
    const navigate = useNavigate()
    const {mutate, isSuccess} = useUploadImage(recipeId)

    const onDeleteImage = () => {
        const emptyData = new FormData()
        emptyData.append("image", "")
        mutate(emptyData)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess]);

    return (
        <Popover isLazy arrowShadowColor="#FEEBC8">
            <PopoverTrigger>
                <Image
                    src={image || tableware}
                    w="45vh"
                    maxH="45vh"
                    objectFit="cover"
                />
            </PopoverTrigger>
            <PopoverContent borderColor="orange.100" w="100%" _focusVisible={{"outlineColor": "orange.100"}}>
                <PopoverHeader borderColor="orange.100">Change Recipe Image</PopoverHeader>
                <PopoverArrow />
                <PopoverBody>
                    <HStack justifyContent="center">
                        <Button colorScheme="orange" onClick={() => navigate(`upload-image`)}>Change</Button>
                        {image &&
                            <Button colorScheme="red" onClick={onDeleteImage}>Delete</Button>
                        }
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default RecipeImagePopover;