"use client";
import { updateDocument } from "@/actions/documents";
import { Canvas, Editor } from "@/components/shared";
import { Document } from "@prisma/client";
import React from "react";

export const DocumentEditorClientPage = ({
  document,
}: {
  document: Document;
}) => {
  const handleSave = async (content: string) => {
    await updateDocument(document.id, content);
  };

  const handleCanvasSave = async (canvasData: string) => {
    await updateDocument(document.id, "", canvasData);
  };

  return (
    <div
      className="grid grid-cols-1
      md:grid-cols-2"
    >
      <div className="h-screen">
        <Editor onSave={handleSave} initialData={document.content || ""} />
      </div>
      <div className=" h-screen border-l">
        <Canvas
          onSave={handleCanvasSave}
          initialData={document.canvasData || ""}
        />
      </div>
    </div>
  );
};
