import PageLayout from "@/components/launch/PageLayout";

const toc = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "description", label: "Description of Service" },
  { id: "registration", label: "Account Registration" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "payment", label: "Payment & Subscriptions" },
  { id: "warranties", label: "Disclaimer of Warranties" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "contact", label: "Contact Information" },
];

export default function TermsPage() {
  return (
    <PageLayout toc={toc}>
      <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
        Terms of Service
      </h1>
      <p className="text-lg text-muted-foreground mb-16">
        Last updated: February 2025
      </p>

      <div className="space-y-12">
        <section id="acceptance">
          <h2 className="text-2xl font-medium text-foreground mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using Interpreter (&ldquo;the Service&rdquo;), you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section id="description">
          <h2 className="text-2xl font-medium text-foreground mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground">
            Interpreter is a desktop application that provides AI-powered document processing,
            including editing documents, filling PDF forms, manipulating spreadsheets, and
            automating repetitive tasks. The Service requires an internet connection and may
            include both free and paid features.
          </p>
        </section>

        <section id="registration">
          <h2 className="text-2xl font-medium text-foreground mb-4">3. Account Registration</h2>
          <p className="text-muted-foreground mb-4">
            To use certain features of the Service, you must create an account. You agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section id="acceptable-use">
          <h2 className="text-2xl font-medium text-foreground mb-4">4. Acceptable Use</h2>
          <p className="text-muted-foreground mb-4">You agree not to use the Service to:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Process documents containing illegal content</li>
            <li>Attempt to gain unauthorized access to systems or data</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Reverse engineer, decompile, or disassemble the software</li>
          </ul>
        </section>

        <section id="payment">
          <h2 className="text-2xl font-medium text-foreground mb-4">5. Payment and Subscriptions</h2>
          <p className="text-muted-foreground mb-4">
            Paid features are billed on a subscription basis. By subscribing, you agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Pay all fees associated with your subscription plan</li>
            <li>Automatic renewal unless cancelled before the renewal date</li>
            <li>Price changes with 30 days notice before your next billing cycle</li>
          </ul>
        </section>

        <section id="warranties">
          <h2 className="text-2xl font-medium text-foreground mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE,
            SECURE, OR UNINTERRUPTED. YOU USE THE SERVICE AT YOUR OWN RISK.
          </p>
        </section>

        <section id="liability">
          <h2 className="text-2xl font-medium text-foreground mb-4">7. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, INTERPRETER SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS
            OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-medium text-foreground mb-4">8. Contact Information</h2>
          <p className="text-muted-foreground">
            For questions about these Terms of Service, please contact us at legal@interpreter.com.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
