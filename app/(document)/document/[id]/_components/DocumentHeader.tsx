"use client";
import { UserProfileIcon } from "@/components/helper";
import { Button } from "@/components/ui/button";
import React from "react";

export const DocumentHeader = ({ onSave }: { onSave: () => void }) => {
  return (
    <header className="bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground flex items-center justify-between md:px-6 px-4 py-6 h-[60px] w-full">
      <div></div>
      <div className="flex items-center gap-x-2">
        <Button onClick={onSave}>Save</Button>
        <UserProfileIcon />
      </div>
    </header>
  );
};
