import Navbar from "@components/navbar/navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 w-[calc(100%-224px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
