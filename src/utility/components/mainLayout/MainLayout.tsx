import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  navMenu: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div>
      <div className="w-full h-14 bg-teal-700 flex items-center ">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between mx-2">
            <div>
              <h1 className=" text-white">Srisuba</h1>
            </div>
            <div className="flex items-center">{props.navMenu}</div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10">{props.children}</div>
      <div className="w-full h-40 bg-teal-950 mt-[50vh]"></div>
    </div>
  );
}
