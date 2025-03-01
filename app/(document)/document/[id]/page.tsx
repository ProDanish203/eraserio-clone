import React from "react";
import { DocumentHeader } from "./_components/DocumentHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Editor } from "@/components/shared";
import { getDocumentById } from "@/actions/documents";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DocumentEditorClientPage } from "./page.client";

const DocumentEditorPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const document = await getDocumentById(id);

  if (!document) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
        <Link href={"/dashboard"}>
          <Button>Go back</Button>
        </Link>
      </Alert>
    );
  }
  return (
    <>
      <DocumentHeader />
      <DocumentEditorClientPage document={document} />
    </>
  );
};

export default DocumentEditorPage;
