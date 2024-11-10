import { Link } from "react-router-dom";
import { BriefcaseIcon, UserIcon } from "@heroicons/react/solid";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center text-white">
        <h1 className="text-3xl font-extrabold tracking-wide text-white hover:text-indigo-200 transition duration-300">
          Job Portal
        </h1>
        <div className="flex space-x-6">
          {/* Link to the Job Page */}
          <Link
            to="/"
            className="flex items-center space-x-2 p-2 rounded-lg text-lg font-medium transition duration-200 transform hover:bg-indigo-500 hover:scale-105 hover:shadow-md"
          >
            <BriefcaseIcon className="h-6 w-6 text-indigo-200" />
            <span className="hover:text-indigo-100">Jobs</span>
          </Link>
          {/* Link to Candidates Page */}
          <Link
            to="/candidates"
            className="flex items-center space-x-2 p-2 rounded-lg text-lg font-medium transition duration-200 transform hover:bg-indigo-500 hover:scale-105 hover:shadow-md"
          >
            <UserIcon className="h-6 w-6 text-indigo-200" />
            <span className="hover:text-indigo-100">Candidates</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
