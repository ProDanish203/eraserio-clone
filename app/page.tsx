"use client";
import { DocumentHeader } from "@/components/shared/DocumentHeader";
import React, { useEffect, useRef, useState } from "react";
import { useResizable } from "@/hooks/useResizable";
import { cn, getDataFromLocalStorage } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Loader2Icon } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";

const Canvas = dynamic(
  async () => (await import("@/components/shared/Canvas")).Canvas,
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full">
        <Loader2Icon className="animate-spin text-gray-400 text-xl" size={40} />
      </div>
    ),
  }
);

const Editor = dynamic(
  async () => (await import("@/components/shared/Editor")).Editor,
  {
    ssr: false,
  }
);

const EditorPage = () => {
  const isFirstRender = useRef(true);
  const [triggerSave, setTriggerSave] = useState(false);
  const [handleTrigger, setHandleTrigger] = useState(false);
  const [editorData, setEditorData] = useState<string>("");
  const [canvasData, setCanvasData] = useState<string>("");

  const { width, startResizing } = useResizable(50);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSave = async () => {
    if (typeof window === "undefined") return;
    if (!editorData && !canvasData) return;
    localStorage.setItem("editorData", editorData);
    localStorage.setItem("canvasData", canvasData);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    handleSave();
  }, [handleTrigger]);

  useEffect(() => {
    const data = getDataFromLocalStorage();
    if (data) {
      if (data.editorData) setEditorData(data.editorData);
      if (data.canvasData) setCanvasData(data.canvasData);
    }
  }, []);

  return (
    <div className="md:h-screen flex flex-col">
      <DocumentHeader onSave={() => setTriggerSave((prev) => !prev)} />
      <div className="flex max-md:flex-col h-full w-full">
        <div
          className="h-full"
          style={{ width: `${isMobile ? "100" : width}%` }}
        >
          <Editor
            onSaveTrigger={triggerSave}
            initialData={editorData}
            setData={setEditorData}
            setHandleTrigger={setHandleTrigger}
          />
        </div>
        {!isMobile && (
          <div
            className="w-2 cursor-col-resize bg-gray-300 hover:bg-gray-500"
            onMouseDown={startResizing}
          ></div>
        )}
        {isMobile ? (
          <div className="border-t p-6">
            <p className="text-center text-accent-foreground text-sm">
              Switch to desktop version to use Canvas
            </p>
          </div>
        ) : (
          <div className={"h-full flex-grow border-l"}>
            <Canvas
              onSaveTrigger={triggerSave}
              initialData={canvasData}
              setData={setCanvasData}
              setHandleTrigger={setHandleTrigger}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
