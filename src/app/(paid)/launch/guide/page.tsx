import PageLayout from "@/components/launch/PageLayout";

const toc = [
  { id: "getting-started", label: "Getting Started" },
  { id: "requirements", label: "System Requirements" },
  { id: "features", label: "Features" },
  { id: "shortcuts", label: "Keyboard Shortcuts" },
  { id: "security", label: "Privacy & Security" },
];

export default function GuidePage() {
  return (
    <PageLayout toc={toc}>
      <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
        Guide
      </h1>
      <p className="text-lg text-muted-foreground mb-16">
        Everything you need to know about using Interpreter to get more done.
      </p>

      <div className="space-y-16">
        <section id="getting-started">
          <h2 className="text-2xl font-medium text-foreground mb-6">Getting Started</h2>
          <p className="text-muted-foreground mb-6">
            Interpreter is a desktop application that lets you work alongside AI agents. These agents can edit your documents, fill out PDF forms, manipulate spreadsheets, and automate repetitive tasks.
          </p>
          <p className="text-muted-foreground mb-6">
            To get started, download the app for Mac and sign in with your account. Once you&apos;re in, you&apos;ll see your desktop with a chat interface on the side.
          </p>
          <p className="text-muted-foreground">
            Simply describe what you want to do in natural language. For example: &ldquo;Fill out this tax form with my information&rdquo; or &ldquo;Create a summary of this PDF document.&rdquo;
          </p>
        </section>

        <section id="requirements">
          <h2 className="text-2xl font-medium text-foreground mb-6">System Requirements</h2>
          <p className="text-muted-foreground">
            Interpreter requires macOS 12.0 or later. We recommend at least 8GB of RAM for optimal performance. The application uses approximately 500MB of disk space.
          </p>
        </section>

        <section id="features">
          <h2 className="text-2xl font-medium text-foreground mb-6">Features</h2>

          <h3 className="text-lg font-medium text-foreground mb-4 mt-8">Document Editing</h3>
          <p className="text-muted-foreground mb-6">
            Interpreter can open and edit Word documents, maintaining formatting and styles. It can rewrite sections, fix grammar, translate content, or restructure entire documents based on your instructions.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-4 mt-8">PDF Forms</h3>
          <p className="text-muted-foreground mb-6">
            One of our most popular features. Interpreter can fill out PDF forms intelligently, understanding field labels and context. It works with tax forms, applications, contracts, and more.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-4 mt-8">Spreadsheet Automation</h3>
          <p className="text-muted-foreground mb-6">
            Work with Excel and CSV files. Interpreter can create formulas, generate charts, clean data, merge files, and perform complex calculations. Just describe what you need in plain English.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-4 mt-8">Background Agents</h3>
          <p className="text-muted-foreground">
            With Pro plans, you can run agents in the background. Start a task, continue with your work, and get notified when it&apos;s complete. Perfect for long-running operations like processing large datasets.
          </p>
        </section>

        <section id="shortcuts">
          <h2 className="text-2xl font-medium text-foreground mb-6">Keyboard Shortcuts</h2>
          <div className="text-muted-foreground space-y-2">
            <p><strong className="text-foreground">⌘ + N</strong> — New conversation</p>
            <p><strong className="text-foreground">⌘ + O</strong> — Open file</p>
            <p><strong className="text-foreground">⌘ + Enter</strong> — Send message</p>
            <p><strong className="text-foreground">⌘ + .</strong> — Stop current task</p>
            <p><strong className="text-foreground">⌘ + K</strong> — Command palette</p>
          </div>
        </section>

        <section id="security">
          <h2 className="text-2xl font-medium text-foreground mb-6">Privacy & Security</h2>
          <p className="text-muted-foreground mb-6">
            Your documents are processed securely and are not stored on our servers after processing. We use end-to-end encryption for all file transfers.
          </p>
          <p className="text-muted-foreground">
            Interpreter never accesses files without your explicit action. The agent can only see and modify files you specifically open or reference in the conversation.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
