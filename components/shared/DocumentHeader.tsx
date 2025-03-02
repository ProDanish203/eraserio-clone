"use client";
import { getUser } from "@/actions/user";
import { UserProfileIcon } from "@/components/helper";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const DocumentHeader = ({ onSave }: { onSave: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return (
    <header className="bg-secondary/70 dark:bg-secondary/30 dark:text-foreground text-muted-foreground flex items-center justify-between md:px-6 px-4 py-6 h-[60px] w-full border-b-secondary-foreground/30 border-b">
      {/* Left Side */}
      <div>
        {isHome && data ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          !isHome && (
            <Button
              onClick={() => router.back()}
              size={"icon"}
              variant={"secondary"}
              className="border border-secondary-foreground hover:bg-white"
            >
              <ArrowLeft size={24} className="" />
            </Button>
          )
        )}
      </div>
      {/* Right side */}
      <div className="flex items-center gap-x-2">
        <Button
          onClick={onSave}
          variant={"default"}
          className="bg-green-500 hover:bg-green-600"
        >
          Save
        </Button>
        {isHome && !data ? (
          <Button
            onClick={() => router.push("/login")}
            variant="secondary"
            className="border border-secondary-foreground hover:bg-white"
          >
            Login
          </Button>
        ) : (
          <UserProfileIcon />
        )}
      </div>
    </header>
  );
};
