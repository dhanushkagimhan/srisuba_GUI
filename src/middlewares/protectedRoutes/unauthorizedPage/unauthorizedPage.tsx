import { useEffect } from "react";
import { useMainLayoutStore } from "../../../states";
import { Link } from "react-router-dom";

type UnauthorizedPageProp = {
  loginRoute?: string;
};

export default function UnauthorizedPage(prop: UnauthorizedPageProp) {
  const mainLayoutState = useMainLayoutStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h1 className="sm:text-5xl text-2xl">Unauthorized :(</h1>
        <p>Please Login again.</p>
        <Link
          to={prop.loginRoute ? "/" + prop.loginRoute : "/"}
          className="text-sky-500 hover:text-sky-400 text-lg font-semibold"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
