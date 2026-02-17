import ContentPage from "@/components/site/ContentPage";

const toc = [
  { id: "getting-started", label: "Getting Started" },
  { id: "requirements", label: "System Requirements" },
  { id: "features", label: "Features" },
  { id: "shortcuts", label: "Keyboard Shortcuts" },
  { id: "security", label: "Privacy & Security" },
];

export default function GuidePage() {
  return (
    <ContentPage
      toc={toc}
      title="Guide"
      description="Everything you need to know about using Interpreter to get more done."
    >
      <section id="getting-started">
        <h2>Getting Started</h2>
        <p>
          Interpreter is a desktop application that lets you work alongside AI agents. These
          agents can edit your documents, fill out PDF forms, manipulate spreadsheets, and
          automate repetitive tasks.
        </p>
        <p>
          To get started, download the app for Mac and sign in with your account. Once you&apos;re
          in, you&apos;ll see your desktop with a chat interface on the side.
        </p>
        <p>
          Simply describe what you want to do in natural language. For example: &ldquo;Fill out this
          tax form with my information&rdquo; or &ldquo;Create a summary of this PDF document.&rdquo;
        </p>
      </section>

      <section id="requirements">
        <h2>System Requirements</h2>
        <p>
          Interpreter requires macOS 12.0 or later. We recommend at least 8GB of RAM for optimal
          performance. The application uses approximately 500MB of disk space.
        </p>
      </section>

      <section id="features">
        <h2>Features</h2>

        <h3>Document Editing</h3>
        <p>
          Interpreter can open and edit Word documents, maintaining formatting and styles. It can
          rewrite sections, fix grammar, translate content, or restructure entire documents based
          on your instructions.
        </p>

        <h3>PDF Forms</h3>
        <p>
          One of our most popular features. Interpreter can fill out PDF forms intelligently,
          understanding field labels and context. It works with tax forms, applications,
          contracts, and more.
        </p>

        <h3>Spreadsheet Automation</h3>
        <p>
          Work with Excel and CSV files. Interpreter can create formulas, generate charts, clean
          data, merge files, and perform complex calculations. Just describe what you need in plain
          English.
        </p>

        <h3>Background Agents</h3>
        <p>
          With Pro plans, you can run agents in the background. Start a task, continue with your
          work, and get notified when it&apos;s complete. Perfect for long-running operations like
          processing large datasets.
        </p>
      </section>

      <section id="shortcuts">
        <h2>Keyboard Shortcuts</h2>
        <p>
          <strong>⌘ + N</strong> - New conversation
        </p>
        <p>
          <strong>⌘ + O</strong> - Open file
        </p>
        <p>
          <strong>⌘ + Enter</strong> - Send message
        </p>
        <p>
          <strong>⌘ + .</strong> - Stop current task
        </p>
        <p>
          <strong>⌘ + K</strong> - Command palette
        </p>
      </section>

      <section id="security">
        <h2>Privacy & Security</h2>
        <p>
          Your documents are processed securely and are not stored on our servers after processing.
          We use end-to-end encryption for all file transfers.
        </p>
        <p>
          Interpreter never accesses files without your explicit action. The agent can only see and
          modify files you specifically open or reference in the conversation.
        </p>
      </section>
    </ContentPage>
  );
}
