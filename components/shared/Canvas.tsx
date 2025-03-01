"use client";
import React, { useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

interface CanvasProps {
  initialData: string;
  onSave: (data: string) => Promise<void>;
}

export const Canvas: React.FC<CanvasProps> = ({ initialData, onSave }) => {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  console.log("whiteBoardData", whiteBoardData);
  return (
    <div className="h-full">
      {/* <Excalidraw /> */}
      {/* {initialData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: initialData && JSON.parse(initialData),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
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
      )} */}
    </div>
  );
};
