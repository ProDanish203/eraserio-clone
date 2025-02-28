"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Layers2Icon, Loader2, PlusIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { CustomDialogHeader } from "./CustomDialogHeader";
import { useForm } from "react-hook-form";
import { createDocumentSchema, createDocumentSchemaType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createDocument } from "@/actions/documents";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const CreateDocumentDialog = ({
  triggerText,
}: {
  triggerText?: string;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<createDocumentSchemaType>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Document created successfully", { id: "create-document" });
      form.reset();
      setOpen(false);
      toast.dismiss("create-document");
    },
    onError: (err) => {
      if (err.message === "NEXT_REDIRECT")
        return toast.dismiss("create-document");

      toast.error("Failed to create document", { id: "create-document" });
    },
  });

  const onSubmit = useCallback(
    (values: createDocumentSchemaType) => {
      toast.loading("Creating document...", { id: "create-document" });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <div
          className={cn(
            "cursor-pointer",
            buttonVariants({
              variant: "default",
            })
          )}
        >
          <PlusIcon size={20} className="sm:hidden font-bold" />
          <span className="max-sm:hidden">
            {triggerText ?? "Create Document"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          Icon={Layers2Icon}
          title="Create document"
          subTitle="Start managing your documents"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="w-full space-y-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p
                        className={cn(
                          "text-xs text-primary",
                          form.formState.errors.name && "text-red-400"
                        )}
                      >{`(required)`}</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a unique and descriptive name of the document
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">{`(optional)`}</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending && "Proceed"}
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
