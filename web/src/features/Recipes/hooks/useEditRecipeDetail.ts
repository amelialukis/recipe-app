import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";
import { RecipeType } from "../types";
import {AxiosError, AxiosResponse} from "axios";

const useEditRecipeDetail = (id: string | undefined) => {
  return useMutation<AxiosResponse<RecipeType>, AxiosError, object>({
    mutationFn: (recipe) => client.patch(`/api/recipe/recipes/${id}/`, recipe),
  });
};

export default useEditRecipeDetail;
