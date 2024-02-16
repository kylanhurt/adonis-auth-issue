import { Outlet } from "react-router-dom";
import classes from "../styles/SettingsLayout.module.scss";

export default function SettingsLayout() {
  return (
    <div className={classes.settingsLayout}>
      <h1>Settings</h1>
      <Outlet />
    </div>
  );
}
