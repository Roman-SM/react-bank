import { Navigate } from "react-router-dom";
import { useAuth } from "../../util/useAuth";

export default function Component({ children }: { children: JSX.Element }) {
  const { states } = useAuth();
  return states.token ? children : <Navigate to="/" />;
}
