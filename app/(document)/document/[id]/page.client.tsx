"use client";
import { updateDocument } from "@/actions/documents";
import { Canvas, Editor } from "@/components/shared";
import { Document } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { DocumentHeader } from "./_components/DocumentHeader";

export const DocumentEditorClientPage = ({
  document,
}: {
  document: Document;
}) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const [handleTrigger, setHandleTrigger] = useState(false);
  const [editorData, setEditorData] = useState<string>(document.content || "");
  const [canvasData, setCanvasData] = useState<string>(
    document.canvasData || ""
  );

  const handleSave = async () => {
    if (!editorData && !canvasData) return;
    await updateDocument(document.id, editorData, canvasData);
  };

  useEffect(() => {
    handleSave();
  }, [handleTrigger]);

  return (
    <>
      <DocumentHeader onSave={() => setTriggerSave((prev) => !prev)} />
      <div
        className="grid grid-cols-1
      md:grid-cols-2"
      >
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            initialData={editorData}
            setData={setEditorData}
            setHandleTrigger={setHandleTrigger}
          />
        </div>
        <div className=" h-screen border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            initialData={canvasData}
            setData={setCanvasData}
            setHandleTrigger={setHandleTrigger}
          />
        </div>
      </div>
    </>
  );
};
