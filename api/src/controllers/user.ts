import db from "@/db";
import validator from "@/middleware/validation";
import Response from "@/utils/response";
import { getUser } from "@/utils/user";
import { EditUserSchema } from "@formhook/types";
import { Hono } from "hono";
import { update } from "../db/crud";

const users = new Hono<{ Bindings: Env }>();

export const UserController = users
  .get("/profile", async (ctx) => {
    const user = getUser(ctx);

    return new Response(ctx).success({ user });
  })
  .put(
    "/edit",
    validator(EditUserSchema, (error, ctx) => {
      return new Response(ctx).error(error);
    }),
    async (ctx) => {
      const { name, email } = await ctx.req.json();
      const user = getUser(ctx);

      const updatedUser = await update(db(ctx.env), "user", {
        where: { id: user.id },
        data: { name, email },
      });

      return new Response(ctx).success({ user: updatedUser });
    }
  );
