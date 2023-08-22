import {Text} from "@chakra-ui/react";
import {useLogout} from "./api";

const Navbar = () => {

    return (
        <div>
            <Text>Recipe App</Text>
            <Text onClick={useLogout}>Logout</Text>
        </div>
    )
}
export default Navbar
