import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const { email, source, get_updates, platform } = await request.json();

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await getSupabase().from("desktop_waitlist").upsert({
      email: email.trim(),
      source,
      get_updates,
      platform,
    }, { onConflict: "email" });
    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    const siteUrl = "https://openinterpreter.com";

    // Send email via Resend
    const { error } = await getResend().emails.send({
      from: "Open Interpreter <auth@updates.openinterpreter.com>",
      to: [email.trim()],
      subject:
        source === "linux_waitlist"
          ? "Interpreter for Linux — We'll keep you posted"
          : "Your link to Interpreter",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="margin-bottom: 32px;">
            <div style="width: 29px; height: 29px; background: #000; border-radius: 50%; display: inline-block;"></div>
          </div>
          ${
            source === "linux_waitlist"
              ? `
                <h1 style="font-size: 24px; font-weight: 500; margin-bottom: 16px; color: #000;">
                  We'll let you know when it's ready for Linux.
                </h1>
                <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 24px;">
                  Thanks for your interest in Interpreter. We're working on Linux support and will email you as soon as it's available.
                </p>
              `
              : `
                <h1 style="font-size: 24px; font-weight: 500; margin-bottom: 16px; color: #000;">
                  Here's your link
                </h1>
                <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 24px;">
                  Download Interpreter to get more done, faster. Work alongside agents that can edit your documents, fill PDF forms, and more.
                </p>
                <a href="${siteUrl}" style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
                  Download Interpreter
                </a>
              `
          }
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Send link error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
