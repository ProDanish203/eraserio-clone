"use client";
import React, { ChangeEvent, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { deleteDocument } from "@/actions/documents";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  documentName: string;
  documentId: string;
}

export const DeleteDocumentDialog: React.FC<Props> = ({
  open,
  setOpen,
  documentName,
  documentId,
}) => {
  const [confirmText, setConfirmText] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast.success("Document deleted successfully", {
        id: "delete-document",
      });
      setConfirmText("");
      setOpen(false);
    },
    onError: () =>
      toast.error("Failed to delete document", {
        id: "delete-document",
      }),
  });

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirmText === documentName) {
      e.stopPropagation();
      toast.loading("Deleting document...", { id: "delete-document" });
      mutate(documentId);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="">
            If you delete this document, you will not be able to recover it.
            <div className="flex flex-col py-4 gap-2">
              <div>
                If you are sure, enter <b>{documentName}</b> to confirm
              </div>
              <Input
                value={confirmText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmText(e.target.value)
                }
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel
            className={cn(
              "text-sm",
              buttonVariants({ size: "sm", variant: "outline" })
            )}
            onClick={() => setConfirmText("")}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== documentName || isPending}
            className={cn(
              "text-destructive-foreground bg-destructive hover:bg-destructive/90",
              buttonVariants({ size: "sm", variant: "destructive" })
            )}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
