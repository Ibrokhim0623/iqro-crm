import AppHeader from "@components/app-header/app-header";
import Navbar from "@components/navbar/navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Navbar />

      <div className="flex-1 flex flex-col h-screen">
        <AppHeader />

        <div className="bg-gray-50 h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
