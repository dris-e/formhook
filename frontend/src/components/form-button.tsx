"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useFetch } from "@/hooks/fetch";
import { CreateForm, CreateFormSchema } from "@formhook/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import DefaultDialog from "@/components/default-dialog";
import { Button } from "@/components/ui/button";
import { useError } from "@/providers";

const fields = [{ name: "name", type: "text", description: "Name", placeholder: "Untitled Form" }];

export default function FormButton({ variant = "action" }: { variant?: "action" | "secondary" | "default" }) {
  const [open, setOpen] = useState(false);
  const { post, isLoading } = useFetch();
  const { handleError } = useError();
  const router = useRouter();

  const form = useForm<CreateForm>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateForm) {
    try {
      const data = await post("forms/create", values);

      if (data.success && data.data?.form) {
        setOpen(false);
        router.push(`/forms/${data.data?.form.id}`);
      }
    } catch (error) {
      handleError({
        message: "Failed to create form",
        description: (error as Error).message,
      });
    }
  }

  return (
    <DefaultDialog
      open={open}
      onOpenChange={setOpen}
      title="Create a form"
      description="Add a form to your site in seconds."
      form={form}
      onSubmitAction={onSubmit}
      fields={fields}
      disabled={isLoading}
    >
      <Button variant={variant} className="w-full" size="sm">
        <PlusCircledIcon />
        <span className={`text-xs font-bold ${variant === "action" ? "text-foreground" : ""}`}>Create Form</span>
      </Button>
    </DefaultDialog>
  );
}
