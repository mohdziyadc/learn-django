import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import api from "../api";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const ProtectedRoutes = ({ children }: Props) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log("[AXIOS ERROR] " + error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      return;
    }
    const decoded = jwtDecode(token);
    const expirationTime = decoded.exp;
    const now = Date.now() / 1000;

    if (expirationTime !== undefined && now > expirationTime) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  if (isAuthorized == null) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return isAuthorized ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
