import { RouteObject } from "react-router-dom";
import Profile from "./Profile.tsx";
import ProfileEdit from "./ProfileEdit.tsx";

const ProfileRoutes: RouteObject[] = [
  {
    path: "",
    element: <Profile />,
  },
  {
    path: "edit",
    element: <ProfileEdit />,
  },
];

export default ProfileRoutes;
