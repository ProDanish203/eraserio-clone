import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const waitFor = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getDataFromLocalStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    const editorData = localStorage.getItem("editorData") || "";
    const canvasData = localStorage.getItem("canvasData") || "";
    return { editorData, canvasData };
  } catch (error) {
    console.log("Error accessing localStorage:", error);
    return null;
  }
};
