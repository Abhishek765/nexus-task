import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  isUserPresent: boolean;
  children?: ReactNode;
  redirect?: string;
};
const ProtectedRoute = ({
  isUserPresent,
  children,
  redirect = "/login",
}: ProtectedRouteProps) => {
  if (!isUserPresent) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
