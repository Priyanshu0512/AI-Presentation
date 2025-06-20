"use server";
import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error", error);
    return { status: 500, erorr: "Internal Server Error" };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return {
        status: 404,
        error: "No recent projects found",
      };
    }
    return { status: 200, data: projects };
  } catch (error) {
    console.log("Error", error);
    return { status: 500, erorr: "Internal Server Error" };
  }
};

export const recoverProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }

    const recover = client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!recover) {
      return { status: 500, error: "Failed to recover the project" };
    }
    return { status: 200, data: recover };
  } catch (error) {
    console.log("Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }

    const deletedProject = client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!deletedProject) {
      return { status: 500, error: "Failed to delete the project" };
    }
    return { status: 200, data: deleteProject };
  } catch (error) {
    console.log("Error", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return { status: 400, error: "Title and outlines are required." };
    }
    const allOutlines = outlines.map((outline) => outline.title);
    const checkUser = await onAuthenticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not Authenticated" };
    }

    const project = await client.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: checkUser.user.id,
      },
    });
    if (!project) {
      return {
        status: 500,
        error: "3Failed to create the project",
      };
    }
    return { status: 200, data: project };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error.",
      error: error,
    };
  }
};
