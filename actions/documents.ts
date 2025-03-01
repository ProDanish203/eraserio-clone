"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/middleware";
import { createDocumentSchema, createDocumentSchemaType } from "@/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getMinimalUser } from "./user";

export const createDocument = async (form: createDocumentSchemaType) => {
  let documentId: string;
  try {
    const user = await getMinimalUser();
    const { success, data } = createDocumentSchema.safeParse(form);
    if (!success) throw new Error("Invalid form data");

    const { name, description } = data;

    const document = await prisma.document.create({
      data: {
        name,
        description,
        user: { connect: { id: user.id } },
      },
    });

    if (!document) throw new Error("Document not created");
    revalidatePath("/dashboard");
    documentId = document.id;
  } catch (err) {
    console.log(err);
  }

  redirect(`/document/${documentId!}`);
};

export const getDocuments = async () => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized action");

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return documents;
};

export const getDocumentById = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized action");

  const document = await prisma.document.findUnique({
    where: { id },
  });
  if (!document) throw new Error("Document not found");

  return document;
};

export const updateDocument = async (
  id: string,
  content: string,
  canvasData?: string
) => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized action");

  const document = await prisma.document.update({
    where: {
      id,
    },
    data: {
      content,
      canvasData,
    },
  });

  revalidatePath(`/document/${id}`);
  return document;
};

export const deleteDocument = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized action");

  const document = await prisma.document.delete({
    where: { id },
  });

  if (!document) throw new Error("Document not deleted");
  revalidatePath("/dashboard");
  redirect("/dashboard");
};
