import { Link } from "react-router-dom";

export default function HomeMenu() {
  return (
    <div className="flex flex-row items-center">
      <div>
        <Link to="#" className=" no-underline text-white font-semibold ">
          <p className="bg-orange-600 py-1 px-2 rounded-md">Post proposal</p>
        </Link>
      </div>
    </div>
  );
}
