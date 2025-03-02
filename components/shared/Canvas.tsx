"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

interface CanvasProps {
  initialData: string;
  onSaveTrigger: boolean;
  setData: (data: string) => void;
  setHandleTrigger: any;
}

export const Canvas: React.FC<CanvasProps> = ({
  initialData,
  onSaveTrigger,
  setData,
  setHandleTrigger,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [whiteBoardData, setWhiteBoardData] = useState<string>("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    isLoaded && saveWhiteboard();
  }, [onSaveTrigger]);

  const saveWhiteboard = () => {
    if (whiteBoardData) {
      setData(whiteBoardData);
      setHandleTrigger((prev: boolean) => !prev);
    }
  };

  return (
    <div className="h-full">
      {isLoaded && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: initialData && JSON.parse(initialData),
          }}
          onChange={(excalidrawElements, appState, files) => {
            setWhiteBoardData(JSON.stringify(excalidrawElements));
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: {
                saveFileToDisk: true,
              },
              toggleTheme: true,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
};
