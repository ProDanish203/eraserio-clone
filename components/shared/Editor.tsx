"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import { toast } from "sonner";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

interface EditorProps {
  initialData: string;
  setData: (data: string) => void;
  onSaveTrigger: boolean;
  setHandleTrigger: any;
}

export const Editor: React.FC<EditorProps> = ({
  initialData,
  onSaveTrigger,
  setData,
  setHandleTrigger,
}) => {
  const ref = useRef<EditorJS>(null);
  const [isReady, setIsReady] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onSaveDocument();
  }, [onSaveTrigger]);

  useEffect(() => {
    isMounted && initEditor();

    return () => {
      if (ref.current) {
        ref.current.destroy();
        // @ts-ignore
        ref.current = null;
      }
    };
  }, [isMounted, initialData]);

  useEffect(() => {
    if (initialData && ref.current && isReady && isMounted) {
      try {
        const parsedData = JSON.parse(initialData);
        ref.current.render(parsedData);
      } catch (error) {
        console.error("Error parsing initialData:", error);
        toast.error("Failed to load document data");
      }
    }
  }, [isMounted, initialData, isReady]);

  const initEditor = () => {
    try {
      const data = initialData ? JSON.parse(initialData) : rawDocument;

      const editor = new EditorJS({
        tools: {
          header: {
            class: Header as any,
            shortcut: "CMD+SHIFT+H",
            config: {
              placeholder: "Enter a Header",
            },
          },
          list: {
            class: List as any,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          paragraph: Paragraph,
          warning: Warning,
        },
        holder: "editorjs",
        data: data,
        onReady: () => {
          // @ts-ignore
          ref.current = editor;
          setIsReady(true);
        },
      });
    } catch (error) {
      console.error("Editor initialization failed:", error);
      toast.error("Failed to initialize editor");
    }
  };

  const onSaveDocument = async () => {
    if (ref.current && isReady) {
      try {
        const outputData = await ref.current.save();

        setData(JSON.stringify(outputData));
        setHandleTrigger((prev: boolean) => !prev);
        return outputData;
      } catch (err) {
        console.error("Saving failed: ", err);
        return null;
      }
    } else {
      console.warn("Editor not ready yet");
    }
  };

  return (
    <div className="">
      {isMounted && <div id="editorjs" className="ml-20"></div>}
    </div>
  );
};
