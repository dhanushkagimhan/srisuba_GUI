import { useEffect } from "react";
import { useMainLayoutStore } from "../states";
import { Link } from "react-router-dom";

export default function Error500() {
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
        <h1 className="text-5xl">Error 500</h1>
        <h2>Unexpected Error, please Login again</h2>
        <Link
          to="/"
          className="text-sky-500 hover:text-sky-400 text-lg font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
