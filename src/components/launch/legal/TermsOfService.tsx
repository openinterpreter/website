"use client";

import ScrollableContent from "../ScrollableContent";

export default function TermsOfService() {
  return (
    <ScrollableContent>
      <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
        Terms of Service
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        Last updated: February 2025
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground">
            By accessing or using Interpreter (&ldquo;the Service&rdquo;), you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground">
            Interpreter is a desktop application that provides AI-powered document processing,
            including editing documents, filling PDF forms, manipulating spreadsheets, and
            automating repetitive tasks. The Service requires an internet connection and may
            include both free and paid features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            3. Account Registration
          </h2>
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

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            4. Acceptable Use
          </h2>
          <p className="text-muted-foreground mb-4">
            You agree not to use the Service to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Process documents containing illegal content</li>
            <li>Attempt to gain unauthorized access to systems or data</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Reverse engineer, decompile, or disassemble the software</li>
            <li>Use the Service for competitive analysis or to build a competing product</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-muted-foreground mb-4">
            The Service and its original content, features, and functionality are owned by
            Interpreter and are protected by international copyright, trademark, and other
            intellectual property laws.
          </p>
          <p className="text-muted-foreground">
            You retain all rights to documents and content you process through the Service.
            We do not claim ownership of your content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            6. Payment and Subscriptions
          </h2>
          <p className="text-muted-foreground mb-4">
            Paid features are billed on a subscription basis. By subscribing, you agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Pay all fees associated with your subscription plan</li>
            <li>Automatic renewal unless cancelled before the renewal date</li>
            <li>Price changes with 30 days notice before your next billing cycle</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Refunds are handled on a case-by-case basis. Contact support for refund requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            7. Service Availability
          </h2>
          <p className="text-muted-foreground">
            We strive to maintain high availability but do not guarantee uninterrupted access.
            The Service may be temporarily unavailable for maintenance, updates, or due to
            circumstances beyond our control. We will make reasonable efforts to notify users
            of planned maintenance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            8. Disclaimer of Warranties
          </h2>
          <p className="text-muted-foreground">
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE,
            SECURE, OR UNINTERRUPTED. YOU USE THE SERVICE AT YOUR OWN RISK.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-muted-foreground">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, INTERPRETER SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS
            OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            10. Indemnification
          </h2>
          <p className="text-muted-foreground">
            You agree to indemnify and hold harmless Interpreter and its officers, directors,
            employees, and agents from any claims, damages, losses, or expenses arising from
            your use of the Service or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            11. Termination
          </h2>
          <p className="text-muted-foreground">
            We may terminate or suspend your account and access to the Service immediately,
            without prior notice, for conduct that we believe violates these Terms or is
            harmful to other users, us, or third parties, or for any other reason at our
            sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            12. Changes to Terms
          </h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms at any time. We will provide notice of
            significant changes through the Service or by email. Your continued use of the
            Service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            13. Governing Law
          </h2>
          <p className="text-muted-foreground">
            These Terms shall be governed by and construed in accordance with the laws of the
            State of California, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-foreground mb-4">
            14. Contact Information
          </h2>
          <p className="text-muted-foreground">
            For questions about these Terms of Service, please contact us at legal@interpreter.com.
          </p>
        </section>
      </div>
    </ScrollableContent>
  );
}
