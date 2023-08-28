import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api";
import { AxiosError } from "axios";

export interface UserData {
  name: string;
  email: string;
  password?: string;
}

interface ErrorData {
  name: string[];
  email: string[];
  password?: string[];
}

const useEditUser = () => {
  return useMutation<UserData, AxiosError<ErrorData>, UserData>({
    mutationFn: (data) => client.patch("/api/user/me/", data),
  });
};

export default useEditUser;
