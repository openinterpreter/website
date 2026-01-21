export default function PrivacyPage() {
    return (
      <div>
        <h1 id="interpreter-workstation-privacy-policy">Interpreter Workstation Privacy Policy</h1>
        <p><strong>Last Updated: January 21, 2026</strong></p>

        <h2 id="introduction">Introduction</h2>
        <p>Open Interpreter Inc. (&quot;Open Interpreter,&quot; &quot;we,&quot; &quot;our,&quot; and/or &quot;us&quot;) values your privacy. This Privacy Policy explains how we collect, use, and disclose information when you use Interpreter Workstation and related services (collectively, our &quot;Services&quot;).</p>
        <p>Interpreter Workstation is designed to run locally on your device. Your documents and files remain on your device <strong>unless you choose to send content to an AI provider</strong> (for example, by using our hosted models or by connecting your own API key).</p>

        <h2 id="at-a-glance">At a Glance</h2>
        <ul>
          <li><strong>Local models:</strong> Your documents, prompts, and AI responses stay on your device.</li>
          <li><strong>Bring your own API key:</strong> Your content is sent <strong>directly from your device</strong> to the AI provider; it does <strong>not</strong> pass through our servers.</li>
          <li><strong>Hosted models:</strong> Your content is routed through our servers to the AI provider and back. <strong>We log full hosted requests and responses (including attachments and metadata) for up to 30 days</strong>, then delete them.</li>
          <li><strong>Telemetry &amp; crash reports:</strong> Optional and controlled by you. If you choose &quot;Keep everything private,&quot; we do not collect telemetry or crash reports.</li>
        </ul>

        <h2 id="how-interpreter-workstation-handles-your-data">How Interpreter Workstation Handles Your Data</h2>

        <h3 id="1-local-processing">1) Local Processing (Local Models)</h3>
        <p>When you use Interpreter Workstation with a local AI model, your documents, prompts, and AI responses are processed on your device and do not leave it. We do not have access to this content.</p>

        <h3 id="2-using-your-own-api-key">2) Using Your Own API Key (Direct-to-Provider)</h3>
        <p>If you connect your own API key for an AI provider (for example, OpenAI or Anthropic), your prompts and any document content you include are sent <strong>directly from your device to that provider</strong> to generate a response. This content does <strong>not</strong> pass through Open Interpreter&apos;s servers, and we do not receive or store it.</p>
        <blockquote>
          <p>Note: The AI provider&apos;s handling of that data is governed by their own terms and privacy policy.</p>
        </blockquote>

        <h3 id="3-hosted-models">3) Hosted Models (Routed Through Our Servers)</h3>
        <p>If you use Interpreter Workstation&apos;s hosted AI models, your prompts and any document content you include are sent <strong>through our servers</strong> to the AI model provider and back to you.</p>
        <p><strong>For hosted model usage, we log and retain:</strong></p>
        <ul>
          <li><strong>Full prompts</strong></li>
          <li><strong>Full model responses</strong></li>
          <li><strong>Attachments and document content you include in the request</strong></li>
          <li><strong>Metadata</strong>, such as timestamps, model identifiers, token counts, request/response sizes, and technical/security logs (including IP address and device/network information)</li>
        </ul>
        <p><strong>Retention:</strong> We retain hosted request logs for up to <strong>30 days</strong> for safety monitoring, debugging, reliability, and abuse prevention. After 30 days, this data is automatically deleted.</p>
        <p><strong>No training by Open Interpreter:</strong> Open Interpreter does not use your prompts, documents, attachments, or AI responses to train AI models.</p>
        <p><strong>AI provider processing:</strong> When you use hosted models, your content is processed by the selected AI provider under their terms and policies.</p>

        <h3 id="4-telemetry-and-diagnostics">4) Telemetry &amp; Diagnostics (Your Choice)</h3>
        <p>During setup and in Settings, you choose whether to share telemetry and diagnostics.</p>
        <p>We use the term <strong>&quot;telemetry&quot;</strong> to mean usage analytics and diagnostic data that helps us understand how the app is used and how it&apos;s performing. Telemetry may be <strong>pseudonymous</strong> (for example, associated with a random identifier) and may include limited technical identifiers used for reliability and security.</p>

        <h4 id="if-you-choose-keep-everything-private">If you choose &quot;Keep everything private&quot;</h4>
        <ul>
          <li><strong>No telemetry is sent.</strong></li>
          <li><strong>No crash reports are sent automatically.</strong></li>
          <li>If a crash occurs, you may be offered the option to share a crash report; <strong>if you decline, nothing is sent</strong>.</li>
        </ul>

        <h4 id="if-you-choose-help-improve">If you choose &quot;Help improve Interpreter Workstation&quot;</h4>
        <p>We collect telemetry such as:</p>
        <ul>
          <li>Which features you use (events like &quot;opened editor,&quot; &quot;ran command,&quot; etc.)</li>
          <li>Session duration and performance metrics</li>
          <li>Basic system information (operating system, app version, device type)</li>
          <li><strong>Crash reports (only if you choose to send them)</strong></li>
        </ul>
        <p><strong>We do not intentionally collect via telemetry:</strong></p>
        <ul>
          <li>Your documents or file contents</li>
          <li>Prompts you send to AI models</li>
          <li>AI model responses</li>
          <li>Attachment contents</li>
        </ul>
        <blockquote>
          <p>Important: Crash reports can sometimes include technical details (for example, error messages, stack traces, device/OS details, and in some cases file paths). You control whether crash reports are sent.</p>
        </blockquote>

        <h2 id="information-we-collect">Information We Collect</h2>

        <h3 id="a-information-you-provide">A) Information You Provide to Us</h3>
        <p><strong>Account Information:</strong> If you create an account, we collect your name and email address.</p>
        <p><strong>Payment Information:</strong> If you purchase a subscription, our third-party payment processor collects and processes your payment information. We do not store your full credit card number.</p>
        <p><strong>Communications:</strong> If you contact us for support, we receive your name, email address, and the contents of your message.</p>

        <h3 id="b-information-we-collect-automatically">B) Information We Collect Automatically</h3>
        <p><strong>Hosted Model Request Logs (if you use hosted models):</strong> As described above, we log full hosted requests/responses, attachments you include, and metadata for up to 30 days.</p>
        <p><strong>Telemetry &amp; Crash Reports (if enabled and sent by you):</strong> As described above.</p>
        <p><strong>Security / Operational Logs:</strong> We may process technical data (such as IP address, device/network information, timestamps, and event records) as needed to protect our Services, prevent abuse, and maintain reliability.</p>

        <h2 id="how-we-use-information">How We Use Information</h2>
        <p>We use information we collect to:</p>
        <ul>
          <li>Provide and maintain our Services</li>
          <li>Authenticate accounts and process transactions</li>
          <li>Respond to requests and provide customer support</li>
          <li>Monitor, debug, and improve reliability, performance, and security</li>
          <li>Detect, prevent, and investigate fraud, abuse, and security incidents</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p><strong>We do not use your documents, prompts, attachments, or AI responses to train AI models.</strong></p>

        <h2 id="how-we-share-information">How We Share Information</h2>
        <p>We may share information with:</p>
        <p><strong>Service Providers:</strong> Vendors who help us operate our Services (for example, cloud hosting, analytics, crash reporting, and payment processing). These providers are required to protect your information and use it only to provide services to us.</p>
        <p><strong>AI Model Providers:</strong> If you use hosted models, your prompts, document content you include, and attachments you include are sent to the relevant AI provider to generate responses. These providers have their own terms and privacy policies.</p>
        <p><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal process (such as a subpoena or court order).</p>
        <p><strong>Business Transfers:</strong> If Open Interpreter is involved in a merger, acquisition, financing, reorganization, or sale of assets, information may be transferred as part of that transaction.</p>
        <p>We do not sell your personal information.</p>

        <h2 id="data-retention">Data Retention</h2>
        <ul>
          <li><strong>Hosted model logs:</strong> retained up to <strong>30 days</strong>, then deleted.</li>
          <li><strong>Account information:</strong> retained while your account is active and as needed to provide the Services.</li>
          <li><strong>Support communications:</strong> retained as needed to address your request and maintain support records.</li>
          <li><strong>Telemetry/diagnostics:</strong> retained as needed for the purposes described above and periodically deleted or de-identified.</li>
        </ul>

        <h2 id="your-choices">Your Choices</h2>
        <p><strong>Telemetry &amp; Crash Reports:</strong> You can enable or disable telemetry at any time in Settings. Crash reports are only sent with your permission. If you choose not to send crash reports, we do not receive them.</p>
        <p><strong>Hosted vs. Local Models:</strong> You choose whether to use local models, connect your own API keys, or use our hosted models.</p>
        <p><strong>Account Deletion:</strong> You can request deletion by contacting us at <a href="mailto:help@openinterpreter.com">help@openinterpreter.com</a>. We will delete or de-identify personal information within 30 days of verifying your request, except where we are required or permitted to retain information by law (for example, for tax, accounting, or security purposes).</p>

        <h2 id="privacy-rights-by-region">Privacy Rights by Region</h2>
        <p>Depending on where you live, you may have certain privacy rights regarding your personal information. These may include the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Obtain a copy of your personal information (portability)</li>
          <li>Object to or restrict certain processing</li>
          <li>Withdraw consent where processing is based on consent (for example, telemetry)</li>
        </ul>

        <h3 id="us-state-privacy-rights">U.S. State Privacy Rights (e.g., California and similar laws)</h3>
        <p>If applicable, your rights may include:</p>
        <ul>
          <li>The right to know what personal information we collect, use, and disclose</li>
          <li>The right to delete personal information (subject to exceptions)</li>
          <li>The right to correct inaccurate personal information</li>
          <li>The right to opt out of certain disclosures that may be considered &quot;selling&quot; or &quot;sharing&quot; under some laws (we do not sell personal information)</li>
        </ul>

        <h3 id="eea-uk-gdpr">EEA/UK (GDPR) Notice</h3>
        <p>If you are located in the EEA or UK, we process personal information under one or more legal bases, including:</p>
        <ul>
          <li><strong>Contract</strong> (to provide the Services you request)</li>
          <li><strong>Legitimate interests</strong> (to secure, maintain, and improve the Services)</li>
          <li><strong>Consent</strong> (for optional telemetry and any optional crash reporting you choose to send)</li>
          <li><strong>Legal obligation</strong> (where required)</li>
        </ul>
        <p>If you have questions about your rights or wish to exercise them, contact us at <a href="mailto:help@openinterpreter.com">help@openinterpreter.com</a>. You may also have the right to lodge a complaint with your local data protection authority.</p>

        <h2 id="data-security">Data Security</h2>
        <p>We use reasonable administrative, technical, and physical safeguards designed to protect your information, including encryption in transit (TLS) and encryption at rest for data we store. However, no method of transmission or storage is completely secure. By using our Services, you acknowledge this risk.</p>

        <h2 id="childrens-privacy">Children&apos;s Privacy</h2>
        <p>Our Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us at <a href="mailto:help@openinterpreter.com">help@openinterpreter.com</a>.</p>

        <h2 id="international-users">International Users</h2>
        <p>Our Services may be hosted in the United States. If you use the Services from outside the U.S., your information may be transferred to and processed in the U.S. We take steps designed to protect information during such transfers as required by applicable law.</p>

        <h2 id="changes-to-this-policy">Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you through the application or by email. Your continued use of the Services after changes take effect constitutes acceptance of the updated policy.</p>

        <h2 id="contact-us">Contact Us</h2>
        <p>If you have questions about this Privacy Policy or want to exercise your privacy rights, contact us at <a href="mailto:help@openinterpreter.com">help@openinterpreter.com</a>.</p>
      </div>
    )
  }
