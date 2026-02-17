import ContentPage from "@/components/site/ContentPage";
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
    <ContentPage toc={toc}>
      <PrivacyPolicyContent />
    </ContentPage>
  );
}
