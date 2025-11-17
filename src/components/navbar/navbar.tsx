import { useMemo } from "react";
import { navbarLinks } from "./navbar-links";
import { NavLink, useLocation } from "react-router-dom";
import { cx } from "@utils/helpers";

const Navbar = () => {
  const location = useLocation();
  const pathName = useMemo(() => location?.pathname, [location?.pathname]);

  return (
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
  );
};

export default Navbar;
