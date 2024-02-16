import { useAccountStore } from "../store";
import Dashboard from "./Dashboard";
import Login from "./LoginPage";

export default function Home() {
  const account = useAccountStore((state) => state.account);
  if (account) return <Dashboard />;
  return <Login />;
}
