import { Stack } from "@chakra-ui/react";
import Hero from "./Hero.tsx";
import RecipeSection from "./RecipeSection.tsx";

const Home = () => {
    return (
        <Stack>
            <Hero/>
            <RecipeSection/>
        </Stack>
    )
}

export default Home;