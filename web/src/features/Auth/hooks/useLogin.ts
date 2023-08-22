import {useMutation} from "@tanstack/react-query";
import {client} from "../../../api";

interface UserCredential{
    email: string,
    password: string,
}

const useLogin = () =>{
    return useMutation({
        mutationFn: (credential: UserCredential) => {
            return client.post("/api/user/token/", credential)
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.data.token)
        }
    })
}

export default useLogin
