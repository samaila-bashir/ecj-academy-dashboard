import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import Expenditures from "../pages/Expenditures";
import Users from "../pages/Users";
import Players from "../pages/Players";
import ExpenseCategories from "../pages/ExpenseCategories";
import PlayersSalaries from "../pages/players-salaries";
import Investments from "../pages/Investments";
const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='/investments' element={<Investments />} />
        <Route path='/ependitures' element={<Expenditures />} />
        <Route path='/players' element={<Players />} />
        <Route path='/players-salaries' element={<PlayersSalaries />} />
        <Route path='/users' element={<Users />} />
        <Route path='/expense-categories' element={<ExpenseCategories />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
