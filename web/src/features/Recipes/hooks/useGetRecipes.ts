import { useQuery } from "@tanstack/react-query";
import { client } from "../../../api";
import { RecipeType } from "../types";
import { AxiosResponse } from "axios";

const useGetRecipes = () => {
  return useQuery<AxiosResponse<RecipeType[]>>({
    queryKey: ["recipes"],
    queryFn: () => client.get("/api/recipe/recipes/"),
  });
};

export default useGetRecipes;
