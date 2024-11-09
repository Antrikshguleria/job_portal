import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { BriefcaseIcon, UserIcon } from "@heroicons/react/solid";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center text-white">
        <h1 className="text-3xl font-bold">Job Portal</h1>
        <div className="flex space-x-6">
          {/* Link to the Job Page */}
          <Link to="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg">
            <BriefcaseIcon className="h-5 w-5" />
            <span>Jobs</span>
          </Link>
          {/* Link to Candidates Page */}
          <Link to="/candidates" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg">
            <UserIcon className="h-5 w-5" />
            <span>Candidates</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;