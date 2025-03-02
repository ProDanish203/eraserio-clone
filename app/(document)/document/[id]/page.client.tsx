"use client";
import { updateDocument } from "@/actions/documents";
import { Document } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useResizable } from "@/hooks/useResizable";
import { Editor } from "@/components/shared/Editor";
import { Canvas } from "@/components/shared/Canvas";
import { DocumentHeader } from "@/components/shared/DocumentHeader";

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

  const { width, startResizing } = useResizable(50);

  const handleSave = async () => {
    if (!editorData && !canvasData) return;
    await updateDocument(document.id, editorData, canvasData);
  };

  useEffect(() => {
    handleSave();
  }, [handleTrigger]);

  return (
    <div className="h-screen flex flex-col">
      <DocumentHeader onSave={() => setTriggerSave((prev) => !prev)} />
      <div className="flex h-full w-full">
        <div className="h-full" style={{ width: `${width}%` }}>
          <Editor
            onSaveTrigger={triggerSave}
            initialData={editorData}
            setData={setEditorData}
            setHandleTrigger={setHandleTrigger}
          />
        </div>
        <div
          className="w-2 cursor-col-resize bg-gray-300 hover:bg-gray-500"
          onMouseDown={startResizing}
        ></div>
        <div className="h-full flex-grow border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            initialData={canvasData}
            setData={setCanvasData}
            setHandleTrigger={setHandleTrigger}
          />
        </div>
      </div>
    </div>
  );
};
