import { CopyrightOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMainLayoutStore } from "../../../states";
import { MainLayoutNavEnum } from "../../typesAndEnum";
import { systemContactNumber } from "../../const";
import { useCookies } from "react-cookie";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  const state = useMainLayoutStore();
  const [_, __, removeCookie] = useCookies([
    "proposerJwt",
    "marketerJwt",
    "adminJwt",
  ]);
  const navigate = useNavigate();

  const getNavMenu = () => {
    switch (state.data.navMenu) {
      case MainLayoutNavEnum.postProposer: {
        return (
          <div className="flex flex-row items-center">
            <div>
              <Link
                to="/proposer-register"
                className=" no-underline text-white font-semibold "
              >
                <p className="bg-orange-600 py-1 px-2 rounded-md hover:bg-orange-500">
                  Register
                </p>
              </Link>
            </div>
          </div>
        );
      }
      case MainLayoutNavEnum.proposerLogout: {
        return (
          <div className="flex flex-row items-center">
            <div
              className="text-white font-semibold cursor-pointer hover:text-yellow-300"
              onClick={proposerLogout}
            >
              Logout
            </div>
          </div>
        );
      }
      case MainLayoutNavEnum.marketerRegister: {
        return (
          <div className="flex flex-row items-center">
            <div>
              <Link
                to="/marketer-register"
                className=" no-underline text-white font-semibold "
              >
                <p className="bg-orange-600 py-1 px-2 rounded-md hover:bg-orange-500">
                  Register
                </p>
              </Link>
            </div>
          </div>
        );
      }
      case MainLayoutNavEnum.marketerLogout: {
        return (
          <div className="flex flex-row items-center">
            <div
              className="text-white font-semibold cursor-pointer hover:text-yellow-300"
              onClick={marketerLogout}
            >
              Logout
            </div>
          </div>
        );
      }
      case MainLayoutNavEnum.adminLogout: {
        return (
          <div className="flex flex-row items-center">
            <div
              className="text-white font-semibold cursor-pointer hover:text-yellow-300"
              onClick={adminLogout}
            >
              Logout
            </div>
          </div>
        );
      }
      default:
        return <></>;
    }
  };

  const proposerLogout = () => {
    removeCookie("proposerJwt");
    navigate("/");
  };

  const marketerLogout = () => {
    removeCookie("marketerJwt");
    navigate("/");
  };

  const adminLogout = () => {
    removeCookie("adminJwt");
    navigate("/");
  };

  return (
    <div>
      <div className="w-full h-14 bg-teal-700 flex items-center fixed z-50">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between mx-2">
            <div>
              <Link to={state.data.logoLink} className="no-underline">
                <h1 className=" text-white">Srisuba</h1>
              </Link>
            </div>
            {getNavMenu()}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="mx-2 mt-14">{props.children}</div>
      </div>

      {state.data.showFooter ? (
        <div className="w-full h-fit bg-teal-950">
          <div className="container mx-auto">
            <div className="mx-2">
              <div className="flex flex-row max-sm:flex-col justify-between">
                <div>
                  <h1 className=" text-white">Srisuba</h1>
                  <p className="text-white -mt-5">
                    The love connection service
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold max-sm:text-center">
                    Contact us
                  </p>
                  <p className="text-white max-sm:text-center">
                    <WhatsAppOutlined /> {systemContactNumber}
                  </p>
                </div>
                {state.data.showMarketing ? (
                  <div>
                    <Link
                      to="/marketer"
                      className=" no-underline text-white font-semibold hover:text-amber-300"
                    >
                      <p className="max-sm:text-center">Affiliate marketing</p>
                    </Link>{" "}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mt-10 pb-2">
                <p className="text-white text-center">
                  <CopyrightOutlined /> 2024 srisuba.com Powered by Gimhana
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
