import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";

interface UserCredential {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  return useMutation<UserCredential, Error, UserCredential>({
    mutationFn: (credential) => {
      return client.post("/api/user/create/", credential);
    },
  });
};

export default useSignup;
