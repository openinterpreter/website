import { ReactNode } from "react";
import PageLayout from "@/components/site/PageLayout";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
}

interface ContentPageProps {
  children: ReactNode;
  toc?: TocItem[];
  title?: string;
  description?: string;
  intro?: ReactNode;
  contentClassName?: string;
}

const baseContentClasses = [
  "[&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mb-6",
  "[&_h1+p]:text-lg [&_h1+p]:text-muted-foreground [&_h1+p]:mb-16",
  "[&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-12",
  "[&_section>h2:first-child]:mt-0",
  "[&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-8",
  "[&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-foreground [&_h4]:mb-3 [&_h4]:mt-6",
  "[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4",
  "[&_strong]:text-foreground",
  "[&_ul]:list-disc [&_ul]:list-inside [&_ul]:text-muted-foreground [&_ul]:space-y-2 [&_ul]:ml-4 [&_ul]:mb-4",
  "[&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-muted-foreground [&_ol]:space-y-2 [&_ol]:ml-4 [&_ol]:mb-4",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-muted [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote_p]:text-muted-foreground",
  "[&_a]:underline [&_a]:underline-offset-2",
  "[&_section]:mt-16 [&_section:first-of-type]:mt-0",
  "[&_article]:mt-16 [&_article:first-of-type]:mt-0",
].join(" ");

export default function ContentPage({
  children,
  toc,
  title,
  description,
  intro,
  contentClassName,
}: ContentPageProps) {
  return (
    <PageLayout toc={toc}>
      {intro ? <div className="mb-16">{intro}</div> : null}
      <div className={cn(baseContentClasses, contentClassName)}>
        {title ? (
          <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="text-lg text-muted-foreground mb-16 max-w-3xl">{description}</p>
        ) : null}
        {children}
      </div>
    </PageLayout>
  );
}
