import { useQuery } from "@tanstack/react-query";
import { client } from "../../../api";
import { RecipeType } from "../types";
import { AxiosResponse } from "axios";

const useGetRecipeDetail = (id: string | undefined) => {
    return useQuery<AxiosResponse<RecipeType>>({
        queryKey: ["recipe"],
        queryFn: () =>
            client.get(`/api/recipe/recipes/${id}/`),
    });
};

export default useGetRecipeDetail;
