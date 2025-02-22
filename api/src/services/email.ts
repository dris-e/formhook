import { VerifyEmail } from "@/lib/emails";
import { Resend } from "resend";

export async function sendEmail(to: string[], subject: string, description: string, email: React.ReactNode, env: Env) {
  const resend = new Resend(env.RESEND_API_KEY);
  const emailAddress = env.RESEND_EMAIL_ADDRESS;

  if (!emailAddress) {
    throw new Error("RESEND_EMAIL_ADDRESS is not set");
  }

  await resend.emails.send({
    from: `Formscale <${emailAddress}>`,
    to: to.join(","),
    subject,
    react: email,
  });
}

export async function sendVerifyEmail(to: string[], otp: string, env: Env) {
  await sendEmail(
    to,
    "Verify your email",
    `Your OTP for Formscale is ${otp}. This code will expire in 15 minutes.`,
    VerifyEmail({ otp, env }),
    env
  );
}
