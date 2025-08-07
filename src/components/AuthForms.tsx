"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthForms() {
  const params = useSearchParams();
  const mode = (params.get("mode") || "login").toLowerCase();
  return mode === "register" ? <RegisterForm /> : <LoginForm />;
}
