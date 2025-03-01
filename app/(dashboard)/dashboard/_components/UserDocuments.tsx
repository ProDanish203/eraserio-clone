import { getDocuments } from "@/actions/documents";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ClockIcon, File, InboxIcon } from "lucide-react";
import { CreateDocumentDialog } from "./CreateDocumentDialog";
import { DocumentActions } from "./DocumentHelpers";
import Link from "next/link";
import { format } from "date-fns";

export const UserDocuments = async () => {
  const documents = await getDocuments();
  if (!documents) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex  items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No document created</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first document
          </p>
        </div>
        <CreateDocumentDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {documents.map((doc) => (
        <div className="flex items-center gap-x-2 justify-between border border-secondary-foreground rounded-lg p-4 bg-secondary">
          <div className="flex items-start gap-x-2">
            <File className="w-8 h-8 text-primary" />
            <div>
              <div className="flex gap-1 gap-x-2 items-center ">
                <Link
                  href={`document/${doc.id}`}
                  className="hover:underline sm:text-lg font-semibold"
                >
                  {doc.name}
                </Link>
                <p className="flex items-center gap-x-1 text-xs text-muted-foreground">
                  <span className="max-sm:hidden">Created At: </span>
                  <span className="sm:hidden">
                    <ClockIcon
                      className="text-accent-foreground text-[10px]"
                      size={12}
                    />
                  </span>
                  <span>{format(doc.createdAt, "hh:mm a")}</span>
                </p>
              </div>
              {doc.description && (
                <p className="max-sm:text-xs text-sm text-accent-foreground">
                  {doc.description}
                </p>
              )}
            </div>
          </div>

          <DocumentActions documentName={doc.name} documentId={doc.id} />
        </div>
      ))}
    </div>
  );
};
