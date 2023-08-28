import { useQuery } from "@tanstack/react-query";
import { client } from "../../../api";

const useGetUser = () => {
  return useQuery<{
    data: {
      name: string;
      email: string;
    };
  }>({
    queryKey: ["userme"],
    queryFn: () => client.get("/api/user/me/"),
  });
};

export default useGetUser;
