import { useMemo } from "react";
import { navbarLinks } from "./navbar-links";
import { NavLink, useLocation } from "react-router-dom";
import { cx } from "@utils/helpers";
import { useLogout } from "@pages/login/hooks";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { logout } = useLogout();
  const pathName = useMemo(() => location?.pathname, [location?.pathname]);

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
      <div>
        <div className="mb-2">
          <h1 className="text-xl font-bold text-blue-600">IqroCRM</h1>
          <p className="text-sm text-gray-500">O'quv markazi tizimi</p>
        </div>
        <div className="flex flex-col gap-1.5">
          {navbarLinks?.map((navbar) => (
            <NavLink
              key={navbar?.path}
              to={{ pathname: navbar?.path }}
              className={cx(
                "p-2 text-base font-medium rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-200",
                pathName === navbar?.path ? "bg-blue-50  text-blue-600" : ""
              )}
            >
              <div className="flex items-center gap-2">
                {navbar?.icon}
                {navbar?.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div
        onClick={logout}
        className="text-red-500 cursor-pointer flex items-center gap-2 p-2"
      >
        <p className="font-medium">Logout</p>
        <LogOutIcon size={18} />
      </div>
    </div>
  );
};

export default Navbar;
