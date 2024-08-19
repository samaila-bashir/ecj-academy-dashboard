import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import Expenditures from "../pages/Expenditures";
import Users from "../pages/Users";
import Players from "../pages/Players";
import ExpenseCategories from "../pages/ExpenseCategories";
import Salaries from "../pages/salaries";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="/ependitures" element={<Expenditures />} />
        <Route path="/players" element={<Players />} />
        <Route path="/salaries" element={<Salaries />} />
        <Route path="/users" element={<Users />} />
        <Route path="/expense-categories" element={<ExpenseCategories />} />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
