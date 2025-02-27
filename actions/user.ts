"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/middleware";

export const getUser = async () => {
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const getMinimalUser = async () => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized Action");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { email: true, id: true },
  });

  if (!user) throw new Error("Unauthorized Action");

  return user;
};
