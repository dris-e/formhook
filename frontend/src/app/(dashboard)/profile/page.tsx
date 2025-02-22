"use client";

import { useUser } from "@/providers/user";
import { EditUser, EditUserSchema } from "@formhook/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DataCard from "../components/data-card";
import DashTitle from "../components/title";

export default function ProfilePage() {
  const { user, updateUser, isLoading } = useUser();

  const form = useForm<EditUser>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: EditUser) {
    console.log(values);

    await updateUser(values);
  }

  const fields = [
    { name: "name", description: "Name", placeholder: user?.name || "Dris Elamri", type: "text" },
    { name: "email", description: "Email", placeholder: user?.email || "dris@formscale.dev", type: "email" },
  ];

  return (
    <>
      <DashTitle title="Profile" />
      <DataCard
        title="Your account"
        description="Edit Profile"
        fields={fields}
        form={form}
        disabled={isLoading}
        onSubmitAction={onSubmit}
      ></DataCard>
    </>
  );
}
