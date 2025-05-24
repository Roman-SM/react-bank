import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

export function AuthRoute({ children }: { children: JSX.Element }) {
  const { states } = useAuth();
  if (states.token) {
    return <Navigate to="/balance" replace />;
  }

  return children;
}
