import Navbar from "@components/navbar/navbar";
import { rootRoutes } from "./root-routes";
import { Route, Routes } from "react-router-dom";

const RootRouting = () => {
  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100 flex items-center">
        <div className="h-screen w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-2">
            <h1 className="text-xl font-bold text-blue-600">IqroCRM</h1>
            <p className="text-sm text-gray-500">O'quv markazi tizimi</p>
          </div>

          <Navbar />
        </div>
        <div className="w-[calc(100%-255px)] h-screen p-4">
          <Routes>
            {rootRoutes?.map((route) => (
              <Route
                element={<route.component />}
                path={route.path}
                key={route.path}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RootRouting;
