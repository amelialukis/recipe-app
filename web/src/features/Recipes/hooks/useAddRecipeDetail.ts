import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";
import { RecipeType } from "../types";
import {AxiosError, AxiosResponse} from "axios";

const useAddRecipeDetail = () => {
    return useMutation<AxiosResponse<RecipeType>, AxiosError<RecipeType>, object>({
        mutationFn: (recipe) => client.post(`/api/recipe/recipes/`, recipe),
    });
};

export default useAddRecipeDetail;