"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemsVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,
  themeName,
}: Props) => {
  const { setSlides } = useSlideStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error!", {
        description: "Project not found",
      });

      return;
    }

    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Error", {
          description: res.error || "Something went wrong",
        });
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Something went wrong.",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error!", {
        description: "Project not found",
      });

      return;
    }

    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Error", {
          description: res.error || "Failed to delete the Project",
        });
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Something went wrong.",
      });
    }
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  return (
    <motion.div
      variants={itemsVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colros ${
        !isDelete && "hover:bg-muted/50"
      }`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClickCapture={handleNavigation}
      >
        <ThumbnailPreview
          theme={theme}
          //   slide={JSON.parse(JSON.stringify(slideData))?.[0]}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}Fake title
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>

            {isDelete ? (
              <AlertDialogBox
                description="This will recover and restore your project."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and send it to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleDelete}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Trash
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
