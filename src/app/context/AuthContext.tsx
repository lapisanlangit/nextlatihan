"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: { nama: string } | null; // use null when not logged in
  isLogin: string;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ nama: string } | null>(null);
  const [isLogin, setisLogin] = useState<string>("");
  const router = useRouter();

  const login = async (data: any) => {
    try {
      const apiurl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiurl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store", // Important for mutations
      });

      const resultData = await response.json();
      if (response.ok) {
        setUser(resultData.data[0].nama);
        setisLogin("1");
        localStorage.setItem("token", resultData.data[0].token);
        localStorage.setItem("isLogin", "1");
        router.push("/beranda");
      } else {
        alert(data.error);
      }
    } catch {
      alert("Login failed");
    }
  };

  const logout = () => {
    setUser({ nama: "" });
    setisLogin("");
    localStorage.removeItem("token"); // don't forget this!
    localStorage.removeItem("isLogin");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
