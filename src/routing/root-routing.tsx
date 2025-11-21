import { Route, Routes } from "react-router-dom";
import { rootRoutes } from "./root-routes";
import Layout from "@components/layout/layout";
import LoginPage from "@pages/login/components/login";
import ProtectedRoute from "@pages/login/components/protected-route";

const RootRouting = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {rootRoutes?.map((route) => (
          <Route path={route?.path} element={<route.component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default RootRouting;
