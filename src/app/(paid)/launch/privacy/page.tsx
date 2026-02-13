import PageLayout from "@/components/launch/PageLayout";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "at-a-glance", label: "At a Glance" },
  { id: "how-interpreter-handles-your-data", label: "How Data Is Handled" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "how-we-share-information", label: "How We Share Information" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-choices", label: "Your Choices" },
  { id: "privacy-rights-by-region", label: "Regional Privacy Rights" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <PageLayout toc={toc}>
      <div
        className={[
          "[&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mb-6",
          "[&_p:first-of-type]:text-lg [&_p:first-of-type]:text-muted-foreground [&_p:first-of-type]:mb-16",
          "[&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-12",
          "[&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-8",
          "[&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-foreground [&_h4]:mb-3 [&_h4]:mt-6",
          "[&_p]:text-muted-foreground [&_p]:mb-4",
          "[&_ul]:list-disc [&_ul]:list-inside [&_ul]:text-muted-foreground [&_ul]:space-y-2 [&_ul]:ml-4 [&_ul]:mb-4",
          "[&_blockquote]:border-l-2 [&_blockquote]:border-muted [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote_p]:text-muted-foreground",
          "[&_a]:underline [&_a]:underline-offset-2",
        ].join(" ")}
      >
        <PrivacyPolicyContent />
      </div>
    </PageLayout>
  );
}
