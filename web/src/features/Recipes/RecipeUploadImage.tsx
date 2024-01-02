import {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Box, Button, Card, CardHeader, CardBody, Image, HStack, Stack, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import useUploadImage from "./hooks/useUploadImage.ts";

const RecipeUploadImage = () => {
    const [files, setFiles] = useState<{preview: string, blob: Blob}[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpeg': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                blob: file,
            })));
        }
    });
    const { recipeId } = useParams()
    const { mutate, isSuccess } = useUploadImage(recipeId);
    const navigate = useNavigate()

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const onUpload = () => {
        const data = new FormData();
        data.append("image", files[0].blob)
        mutate(data)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(`/recipe/${recipeId}`)
        }
    }, [isSuccess]);

    return (
        <Box
            py="20px"
            mx={{ base: "2px", md: "50px" }}
            display="flex"
            justifyContent="center"
            maxW="100%"
        >
            <Card>
                <CardHeader>
                    <HStack justifyContent="space-between">
                        <Text>
                            Upload Image
                        </Text>
                        {files.length > 0 &&
                            <Button colorScheme="orange" onClick={onUpload}>Upload</Button>
                        }
                    </HStack>
                </CardHeader>
                <CardBody>
                    <Stack direction={{base:"column", lg:"row"}} spacing="30px">
                        {files.length > 0 &&
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image
                                    src={files[0].preview}
                                    onLoad={() => URL.revokeObjectURL(files[0].preview)}
                                    w="45vh"
                                    maxH="45vh"
                                    objectFit="cover"
                                />
                            </Box>
                        }
                        <Box
                            {...getRootProps({className: "dropzone"})}
                            border="3px dashed"
                            borderColor="orange.200"
                            bg="orange.100"
                            w={{base:"100%" , md: "45vh"}}
                            h="45vh"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <input title="recipe-image" {...getInputProps()}/>
                            <Text color="orange.300" mx="50px" textAlign="center">Drag and drop image here, or click to select image.</Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default RecipeUploadImage;