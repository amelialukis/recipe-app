import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";
import { AxiosError } from "axios";

interface UserCredential {
  name: string;
  email: string;
  password: string;
}

interface ErrorData {
  name: string[];
  email: string[];
  password: string[];
}

const useSignup = () => {
  return useMutation<UserCredential, AxiosError<ErrorData>, UserCredential>({
    mutationFn: (credential) => {
      return client.post("/api/user/create/", credential);
    },
  });
};

export default useSignup;
