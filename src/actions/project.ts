import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

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
