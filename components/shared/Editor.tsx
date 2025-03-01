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
import { Button } from "../ui/button";

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
  initialData?: string;
  onSave?: (content: string) => Promise<void>;
}

export const Editor: React.FC<EditorProps> = ({ initialData, onSave }) => {
  const ref = useRef<EditorJS>(null);
  const [document, setDocument] = useState(rawDocument);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initEditor();

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, [initialData]);

  useEffect(() => {
    if (initialData && ref.current && isReady) {
      try {
        const parsedData = JSON.parse(initialData);
        ref.current.render(parsedData);
      } catch (error) {
        console.error("Error parsing initialData:", error);
        toast.error("Failed to load document data");
      }
    }
  }, [initialData, isReady]);

  const initEditor = () => {
    try {
      const data = initialData ? JSON.parse(initialData) : document;

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
          ref.current = editor;
          setIsReady(true);
        },
      });
    } catch (error) {
      console.error("Editor initialization failed:", error);
      toast.error("Failed to initialize editor");
    }
  };

  const onSaveDocument = () => {
    if (ref.current && isReady) {
      ref.current
        .save()
        .then((outputData) => {
          onSave && onSave(JSON.stringify(outputData));
        })
        .catch((error) => {
          console.error("Saving failed: ", error);
        });
    } else {
      console.warn("Editor not ready yet");
    }
  };

  return (
    <div className="">
      <div className="flex justify-end px-2 py-2">
        <Button onClick={onSaveDocument}>Save</Button>
      </div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
};
