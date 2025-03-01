"use client";
import { UserProfileIcon } from "@/components/helper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const DocumentHeader = ({ onSave }: { onSave: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-secondary/70 dark:bg-secondary/30 dark:text-foreground text-muted-foreground flex items-center justify-between md:px-6 px-4 py-6 h-[60px] w-full border-b-secondary-foreground/30 border-b">
      <div>
        {pathname !== "/" && (
          <Button
            onClick={() => router.back()}
            size={"icon"}
            variant={"secondary"}
            className="border border-secondary-foreground hover:bg-white"
          >
            <ArrowLeft size={24} className="" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={onSave}
          variant={"default"}
          className="bg-green-500 hover:bg-green-600"
        >
          Save
        </Button>
        <UserProfileIcon />
      </div>
    </header>
  );
};
