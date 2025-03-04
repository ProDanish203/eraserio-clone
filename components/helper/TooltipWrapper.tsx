"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export const TooltipWrapper: React.FC<Props> = ({
  children,
  content,
  side = "top",
}) => {
  if (!content) return <>{children}</>;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side} className="text-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
