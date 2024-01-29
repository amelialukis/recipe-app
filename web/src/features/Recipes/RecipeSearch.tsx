import { useState, useEffect } from 'react';
import Select from "react-select";
import { Search2Icon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement, Grid, GridItem, Text } from '@chakra-ui/react'
import { orangeTheme } from "../../theme/react-select.ts";

interface Props{
    onSearch: (search?: string, sort?: string) => void;
}

const RecipeSearch = ({onSearch}: Props) => {
    const [search, setSearch] = useState("")
    const sortOptions = [
        {value: "latest", label: "Latest"},
        {value: "oldest", label: "Oldest"},
        {value: "popularity", label: "Popularity"},
    ]
    const [sortBy, setSortBy] = useState(sortOptions[0])

    useEffect(() => {
        onSearch(search, sortBy.value)
    }, [sortBy]);

    return (
        <Grid mb="20px" gap={1} templateColumns="repeat(10, 1fr)">
            <GridItem colSpan={{base: 10, md: 7, xl: 8}}>
                <InputGroup>
                    <InputRightElement>
                        <IconButton
                            aria-label="search"
                            icon={<Search2Icon />}
                            colorScheme="orange"
                            borderLeftRadius="0"
                            onClick={() => onSearch(search, sortBy.value)}
                        />
                    </InputRightElement>
                    <Input
                        variant="orangeOutline"
                        placeholder="Search Recipes..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") onSearch(search, sortBy.value)
                        }}
                    />
                </InputGroup>
            </GridItem>
            <GridItem
                colSpan={{base: 10, md: 3, xl: 2}}
                fontSize="md"
                display="flex"
                justifyContent={{md: "end"}}
                alignItems="center"
            >
                <Text mr={2}>Sort by:</Text>
                <Select
                    options={sortOptions}
                    theme={orangeTheme}
                    value={sortBy}
                    onChange={(event) => {
                        event && setSortBy({value: event.value, label: event.label})
                    }}
                />
            </GridItem>
        </Grid>
    )
}

export default RecipeSearch;