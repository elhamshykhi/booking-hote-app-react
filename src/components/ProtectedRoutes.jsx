import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthentication } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthentication) {
      navigate("/login");
    }
  }, [isAuthentication, navigate]);

  return isAuthentication ? children : null;
}

export default ProtectedRoutes;
