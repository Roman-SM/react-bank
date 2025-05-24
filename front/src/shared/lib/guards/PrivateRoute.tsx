import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { states } = useAuth();
  return states.token ? children : <Navigate to="/" />;
}
