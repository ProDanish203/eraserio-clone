"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { TooltipWrapper } from "@/components/helper";
import { DeleteDocumentDialog } from "./DeleteDocumentDialog";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DocumentActions({
  documentName,
  documentId,
}: {
  documentName: string;
  documentId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  return (
    <>
      <DeleteDocumentDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        documentName={documentName}
        documentId={documentId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="border border-secondary-foreground rounded-lg">
          <TooltipWrapper content={"More actions"}>
            <div
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              <MoreVerticalIcon size={18} />
            </div>
          </TooltipWrapper>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onSelect={() => router.push(`documents/${documentId}`)}
          >
            <EyeIcon size={16} />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive flex items-center gap-2 hover:!text-destructive/90"
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
