import {useQuery} from "@tanstack/react-query";
import {client} from "../../../api";
import {AxiosResponse} from "axios";

interface Tag{
    id: number,
    name: string,
}

const useGetTags = () => {
    return useQuery<AxiosResponse<Tag[]>>({
        queryKey: ["tags"],
        queryFn: () => client.get("/api/recipe/tags/")
    })
}

export default useGetTags
