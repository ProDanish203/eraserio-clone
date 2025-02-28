import { CreateDocumentDialog } from "@/components/helper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDocuments } from "@/components/shared";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="xs:text-3xl text-2xl font-bold">Documents</h1>
          <p className="max-xs:text-sm text-muted-foreground">
            Manage all your documents
          </p>
        </div>
        <CreateDocumentDialog triggerText="Create Document" />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserDocumentsSkeleton />}>
          <UserDocuments />
        </Suspense>
      </div>
    </div>
  );
}

const UserDocumentsSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton className="h-32 w-full" key={i} />
      ))}
    </div>
  );
};
