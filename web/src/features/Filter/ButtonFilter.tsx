import { Button, SimpleGrid } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

interface Props {
  paramKey: string,
  list: {
    id: number;
    name: string;
  }[];
}
const ButtonFilter = ({paramKey, list }: Props) => {
  const navigate = useNavigate()
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4, xl: 6 }}
      w="100%"
      columnGap="10px"
      rowGap="10px"
    >
      {list.map((item) => (
        <Button key={item.id} variant="outline" colorScheme="orange" onClick={() => navigate(`/recipe?${paramKey}=${item.id}`)}>
          {item.name}
        </Button>
      ))}
    </SimpleGrid>
  );
};
export default ButtonFilter;
