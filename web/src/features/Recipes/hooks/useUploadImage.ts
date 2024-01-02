import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";

const useUploadImage = (id: string | undefined) => {
    return useMutation({
        mutationFn: (data: FormData) => client.post(`api/recipe/recipes/${id}/upload-image/`, data),
    })
}

export default useUploadImage;