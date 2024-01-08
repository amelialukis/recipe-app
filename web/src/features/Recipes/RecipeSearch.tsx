import { useState } from 'react';
import { Search2Icon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

interface Props{
    onSearch: (search: string) => void;
}

const RecipeSearch = ({onSearch}: Props) => {
    const [search, setSearch] = useState("")

    return (
        <InputGroup mb="20px">
            <InputRightElement>
                <IconButton
                    aria-label="search"
                    icon={<Search2Icon />}
                    colorScheme="orange"
                    borderLeftRadius="0"
                    onClick={() => onSearch(search)}
                />
            </InputRightElement>
            <Input
                variant="orangeOutline"
                placeholder="Search Recipes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") onSearch(search)
                }}
            />
        </InputGroup>
    )
}

export default RecipeSearch;