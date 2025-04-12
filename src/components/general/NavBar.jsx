import { Link } from "react-router-dom";
import { Refrigerator, BookOpenCheck, Soup, User, Plus } from "lucide-react";

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="dock dock-xs bg-gray-300 relative">
        {/* Floating Action Button inside the dock */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
          <Link to="/search">
            <button className="btn btn-lg btn-circle bg-green-400 text-white hover:bg-green-500 shadow-lg">
              <Plus className="w-8 h-8" />
            </button>
          </Link>
        </div>

        {/* Dock Items */}
        <Link to="/" className="btn-ghost btn-sm rounded-btn">
          <Refrigerator className="w-5 h-5" />
        </Link>
        <Link to="/diary" className="btn-ghost rounded-btn">
          <BookOpenCheck className="w-5 h-5" />
        </Link>
        <div className="w-12" />
        <Link to="/recipes" className="btn-ghost rounded-btn">
          <Soup className="w-5 h-5" />
        </Link>
        <Link to="/account" className="btn-ghost rounded-btn">
          <User className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
