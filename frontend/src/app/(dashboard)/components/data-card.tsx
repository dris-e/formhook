"use client";

import FormPart from "@/components/form-part";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { DefaultFormProps } from "@/components/default-dialog";

/* yeah this code is also scuffed im sorry */

function Wrapper<T extends FieldValues>({
  children,
  form,
  onSubmitAction,
}: {
  children: React.ReactNode;
  form?: UseFormReturn<T>;
  onSubmitAction?: (values: T) => Promise<void>;
}) {
  if (form) {
    return (
      <form onSubmit={form.handleSubmit(onSubmitAction || ((values) => Promise.resolve(values)))} className="w-full">
        {children}
      </form>
    );
  }

  return <>{children}</>;
}

export function DataCardSkeleton<T extends FieldValues>({
  children,
  title,
  button,
  form,
  onSubmitAction,
}: {
  children: React.ReactNode;
  title: string;
  button?: React.ReactNode;
  form?: UseFormReturn<T>;
  onSubmitAction?: (values: T) => void | Promise<void>;
}) {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="py-4 pb-3 border-b border-border">
        <CardTitle className="text-md font-bold">{title}</CardTitle>
      </CardHeader>
      <Wrapper form={form} onSubmitAction={async (values) => Promise.resolve(onSubmitAction?.(values))}>
        <CardContent className="py-6 pt-5">
          <div className="flex flex-col gap-5">{children}</div>
        </CardContent>
        {button && (
          <CardFooter className="py-3 border-t border-border flex justify-start items-center gap-2">
            {button}
          </CardFooter>
        )}
      </Wrapper>
    </Card>
  );
}

export default function DataCard<T extends FieldValues>({
  title,
  description,
  fields,
  form,
  onSubmitAction,
  disabled,
  children,
}: DefaultFormProps<T>) {
  return (
    <Form {...form}>
      <DataCardSkeleton
        button={
          <Button type="submit" size="sm" disabled={disabled || !form.formState.isDirty}>
            <span className="text-xs font-bold">{description || "Save"}</span>
          </Button>
        }
        title={title}
        onSubmitAction={onSubmitAction}
        form={form}
      >
        {children}
        {fields.map((field) => (
          <FormPart key={field.name} form={form} {...field} className="max-w-sm" />
        ))}
      </DataCardSkeleton>
    </Form>
  );
}
