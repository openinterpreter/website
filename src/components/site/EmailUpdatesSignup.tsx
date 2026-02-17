"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

interface EmailUpdatesSignupProps {
  className?: string;
  source?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailUpdatesSignup({
  className,
  source = "blog_updates",
  title = "Get email updates",
  description = "New posts, product changes, and release notes.",
  buttonLabel = "Subscribe",
}: EmailUpdatesSignupProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("No spam. Unsubscribe anytime.");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!emailPattern.test(trimmedEmail)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setState("submitting");
    setMessage("Submitting...");

    try {
      const response = await fetch("/api/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          source,
          get_updates: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setEmail("");
      setState("success");
      setMessage("Thanks, you are subscribed for updates.");
    } catch {
      setState("error");
      setMessage("Could not subscribe right now. Please try again.");
    }
  };

  return (
    <div className={cn("border border-border bg-secondary/20 squircle p-5 sm:p-6", className)}>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="you@company.com"
          disabled={state === "submitting"}
          className="h-10 flex-1 bg-background border border-border squircle-sm px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="h-10 px-4 bg-primary text-primary-foreground text-sm font-medium squircle-sm hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {state === "submitting" ? "Submitting..." : buttonLabel}
        </button>
      </form>

      <p
        className={cn(
          "text-xs mt-3",
          state === "error" ? "text-red-500" : "text-muted-foreground"
        )}
      >
        {message}
      </p>
    </div>
  );
}
