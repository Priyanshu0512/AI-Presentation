import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthCallbackPage = ({ children }: Props) => {
  return (
    <div className="w-full flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AuthCallbackPage;
