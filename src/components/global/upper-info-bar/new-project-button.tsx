"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { User } from "@prisma/client";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <Button
      className="bg-primary-80 rounded-lg hover:bg-background-80 text-primary font-semibold "
      disabled={!user.subscription}
      //   wip
      //   onClick={()=>} push to create project
    >
      <Plus />
      New Project
    </Button>
  );
};

export default NewProjectButton;
