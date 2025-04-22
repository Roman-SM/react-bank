import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth-provider"; // або шлях до твого контексту

export default function Component({ children }: { children: JSX.Element }) {
  const { state } = useContext(AuthContext);

  return state.token ? <Navigate to="/balance" replace /> : <>{children}</>;
}
