import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import UnauthorizedPage from "./unauthorizedPage/unauthorizedPage";

export default function MarketerProtectedRoute() {
  const [cookies] = useCookies(["marketerJwt"]);

  if (cookies.marketerJwt == null) {
    return <UnauthorizedPage loginRoute="marketer" />;
  }

  return <Outlet />;
}
