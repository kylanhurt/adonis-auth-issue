import { Outlet, useNavigate } from "react-router-dom";
import "../styles/PublicLayout.scss";
import { useAccountStore } from "../store";
import { useEffect } from "react";

export default function PublicLayout() {
  const navigate = useNavigate();
  const account = useAccountStore((state) => state.account);

  useEffect(() => {
    account && navigate("/dashboard");
  });

  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
