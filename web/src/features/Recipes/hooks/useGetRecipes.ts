import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { client } from "../../../api";
import { AxiosResponse, AxiosError } from "axios";
import {RecipePage, RecipeType} from "../types";

function useGetRecipes(homepage: false, params?: URLSearchParams): UseQueryResult<AxiosResponse<RecipePage>>;
function useGetRecipes(homepage: true, params?: URLSearchParams): UseQueryResult<AxiosResponse<RecipeType[]>>;
function useGetRecipes(homepage: boolean, params?: URLSearchParams)
    : UseQueryResult<AxiosResponse<RecipeType[]>> | UseQueryResult<AxiosResponse<RecipePage>>{
  if (homepage) {
    return useQuery<AxiosResponse<RecipeType[]>, AxiosError<RecipeType[]>>({
      queryKey: ["homepage recipe"],
      queryFn: () =>
          client.get("/api/recipe/recipes/", {params: {home_recipes: true}})
    })
  }
  return useQuery<AxiosResponse<RecipePage>, AxiosError<RecipePage>>({
    queryKey: ["recipes", params],
    queryFn: () =>
      client.get("/api/recipe/recipes/", { params: params}),
  });
}

export default useGetRecipes;
