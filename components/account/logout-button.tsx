"use client";

import { Button } from "../ui/button";

import { signOut } from "next-auth/react";

const handleLogout = async () => {
  await signOut();
};

const LogoutButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => handleLogout()}>
      Logout
    </Button>
  );
};

export default LogoutButton;
