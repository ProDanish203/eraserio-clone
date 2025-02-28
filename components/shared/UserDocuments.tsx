import { getDocuments } from "@/actions/documents";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import { CreateDocumentDialog } from "../helper";

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

  return <div>UserDocuments</div>;
};
