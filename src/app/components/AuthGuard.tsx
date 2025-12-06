"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) router.push("/login");
  }, [isLogin]);

  if (!isLogin) return null;
  return <>{children}</>;
};
