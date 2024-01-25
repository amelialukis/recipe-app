import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";
import {AxiosError, AxiosResponse} from "axios";

const useLikeRecipe = () => {
    return useMutation<AxiosResponse, AxiosError, string>({
        mutationFn: (id: string) => client.post(`/api/recipe/like`, {recipe_id: id}),
    });
};

export default useLikeRecipe;
