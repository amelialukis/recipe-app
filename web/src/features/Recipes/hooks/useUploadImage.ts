import { useMutation } from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import { client } from "../../../api";

const useUploadImage = (id: string | undefined) => {
    return useMutation<AxiosResponse<{id: string, image: string}>, AxiosError, FormData>({
        mutationFn: (data: FormData) => client.post(`api/recipe/recipes/${id}/upload-image/`, data),
    })
}

export default useUploadImage;