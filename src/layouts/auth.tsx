import { AuthHeader } from "@/components/headers/AuthHeader";
import { IAUTHLayout } from "@/interfaces/auth.interface";
import { FC } from "react";

const AuthLayout: FC<IAUTHLayout> = ({ children }) => {
  return (
    <>
      <AuthHeader />

      <main className="auth-bg h-fit pb-10">{children}</main>
    </>
  );
};

export default AuthLayout;
