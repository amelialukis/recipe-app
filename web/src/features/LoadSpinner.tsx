import {Spinner, Stack} from "@chakra-ui/react";

const LoadSpinner = () => {
    return (
        <Stack w="100%" h="100%" justifyContent="center" alignItems="center" p="50px">
            <Spinner color="orange.300" boxSize="100px" thickness="5px"/>
        </Stack>
    )
}
export default LoadSpinner
