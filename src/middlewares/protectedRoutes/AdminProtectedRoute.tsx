import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import UnauthorizedPage from "./unauthorizedPage/unauthorizedPage";

export default function AdminProtectedRoute() {
  const [cookies] = useCookies(["adminJwt"]);

  if (cookies.adminJwt == null) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}
