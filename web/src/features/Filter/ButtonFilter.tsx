import { Button, SimpleGrid } from "@chakra-ui/react";

interface Props {
  list: {
    id: number;
    name: string;
  }[];
}
const ButtonFilter = ({ list }: Props) => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4, xl: 6 }}
      w="100%"
      columnGap="10px"
      rowGap="10px"
    >
      {list.map((item) => (
        <Button key={item.id} variant="outline" colorScheme="orange">
          {item.name}
        </Button>
      ))}
    </SimpleGrid>
  );
};
export default ButtonFilter;
