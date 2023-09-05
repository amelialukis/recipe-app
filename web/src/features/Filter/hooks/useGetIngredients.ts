import {useQuery} from "@tanstack/react-query";
import {client} from "../../../api";
import {AxiosResponse} from "axios";

interface Ingredient{
    id: number,
    name: string,
}

const useGetIngredients = () => {
    return useQuery<AxiosResponse<Ingredient[]>>({
        queryKey: ["ingredients"],
        queryFn: () => client.get("/api/recipe/ingredients/")
    })
}

export default useGetIngredients