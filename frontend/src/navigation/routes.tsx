import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import PublicLayout from "../components/PublicLayout";
import PrivateLayout from "../components/PrivateLayout";
import SettingsHomePage from "../pages/SettingsHomePage";
import SettingsLayout from "../components/SettingsLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />}>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<SettingsLayout />}>
          <Route path="/settings" index element={<SettingsHomePage />} />
        </Route>
      </Route>
    </>
  )
);
