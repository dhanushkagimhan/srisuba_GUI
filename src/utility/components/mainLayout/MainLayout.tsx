import { CopyrightOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  navMenu?: ReactNode;
  showMarketing?: boolean;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div>
      <div className="w-full h-14 bg-teal-700 flex items-center ">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between mx-2">
            <div>
              <h1 className=" text-white max-sm:text-2xl">Srisuba</h1>
            </div>
            {props.navMenu ? (
              <div className="flex items-center">{props.navMenu}</div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="mx-2">{props.children}</div>
      </div>

      <div className="w-full h-fit bg-teal-950 mt-[50vh]">
        <div className="container mx-auto">
          <div className="mx-2">
            <div className="flex flex-row max-sm:flex-col justify-between">
              <div>
                <h1 className=" text-white max-sm:ml-2">Srisuba</h1>
                <p className="text-white -mt-5  max-sm:ml-2">
                  The matrimonial proposal service
                </p>
              </div>
              <div>
                <p className="text-white font-semibold max-sm:text-center">
                  Contact us
                </p>
                <p className="text-white max-sm:text-center">
                  <WhatsAppOutlined /> +94 71 7 99 35 99
                </p>
              </div>
              {props.showMarketing ? (
                <div>
                  <Link
                    to="#"
                    className=" no-underline text-white font-semibold "
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
                <CopyrightOutlined /> 2023 srisuba.com Powered by Gimhana
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
