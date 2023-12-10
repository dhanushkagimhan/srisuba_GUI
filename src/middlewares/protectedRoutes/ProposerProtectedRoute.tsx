import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";
import UnauthorizedPage from "./unauthorizedPage/unauthorizedPage";

export default function ProposerProtectedRoute() {
  const [cookies] = useCookies(["proposerJwt"]);

  if (cookies.proposerJwt == null) {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}
