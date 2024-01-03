import {useQuery} from "@tanstack/react-query";
import {client} from "../../../api";
import {AxiosResponse} from "axios";

interface Unit{
    id: number,
    name: string,
}

const useGetUnits = () => {
    return useQuery<AxiosResponse<Unit[]>>({
        queryKey: ["unit"],
        queryFn: () => client.get("/api/recipe/unit/")
    })
}

export default useGetUnits
