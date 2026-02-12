import PageLayout from "@/components/launch/PageLayout";

const toc = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "document-processing", label: "Document Processing" },
  { id: "data-security", label: "Data Security" },
  { id: "data-retention", label: "Data Retention" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <PageLayout toc={toc}>
      <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
        Privacy Policy
      </h1>
      <p className="text-lg text-muted-foreground mb-16">
        Last updated: February 2025
      </p>

      <div className="space-y-12">
        <section id="information-we-collect">
          <h2 className="text-2xl font-medium text-foreground mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information you provide directly to us, such as when you create an account,
            use our services, or contact us for support. This may include:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Account information (email address, name)</li>
            <li>Payment information (processed securely through our payment provider)</li>
            <li>Usage data and preferences</li>
            <li>Communications you send to us</li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2 className="text-2xl font-medium text-foreground mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to improve user experience</li>
          </ul>
        </section>

        <section id="document-processing">
          <h2 className="text-2xl font-medium text-foreground mb-4">3. Document Processing</h2>
          <p className="text-muted-foreground mb-4">When you use Interpreter to process documents:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Documents are processed securely and encrypted in transit</li>
            <li>We do not store your documents after processing is complete</li>
            <li>Document content is not used to train AI models</li>
            <li>Processing occurs on secure servers with strict access controls</li>
          </ul>
        </section>

        <section id="data-security">
          <h2 className="text-2xl font-medium text-foreground mb-4">4. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. This includes encryption, secure data centers, and regular security audits.
          </p>
        </section>

        <section id="data-retention">
          <h2 className="text-2xl font-medium text-foreground mb-4">5. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain your account information for as long as your account is active or as
            needed to provide you services. You can request deletion of your account and
            associated data at any time by contacting us.
          </p>
        </section>

        <section id="your-rights">
          <h2 className="text-2xl font-medium text-foreground mb-4">6. Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to or restrict processing of your information</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-medium text-foreground mb-4">7. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at privacy@interpreter.com.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
