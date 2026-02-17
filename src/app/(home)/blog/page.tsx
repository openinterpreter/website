import ContentPage from "@/components/site/ContentPage";
import EmailUpdatesSignup from "@/components/site/EmailUpdatesSignup";

const posts = [
  {
    id: "new-knowledge-worker",
    title: "The New Knowledge Worker",
    date: "January 1, 2026",
    dateTime: "2026-01-01",
    paragraphs: [
      "The old knowledge worker stack was built around tabs, inboxes, and copy-paste loops. Most days were spent moving information between tools instead of making decisions. AI changes that by turning the interface into a working partner instead of a filing cabinet.",
      "The new workflow starts with intent. You describe the outcome, then an agent gathers context, drafts options, and executes the tedious steps. Your role shifts from operator to editor: set constraints, review tradeoffs, and steer quality.",
      "This is not about replacing expertise. It is about compounding it. Domain knowledge becomes more valuable when execution gets cheaper, because the bottleneck moves from effort to judgment.",
      "Teams that adopt this mindset early will look structurally different. Fewer handoffs. Smaller loops. More time spent on leverage instead of maintenance.",
    ],
  },
  {
    id: "next-generation",
    title: "The Next Generation",
    date: "February 17, 2026",
    dateTime: "2026-02-17",
    paragraphs: [
      "The next generation of software will not be defined by feature count. It will be defined by how quickly it can understand your context and take useful action. Interfaces will still matter, but orchestration will matter more.",
      "The products that win will combine three layers: memory of your work, tools that can act in your environment, and a model that can reason across both. That combination turns software from static screens into systems that can carry momentum across days and projects.",
      "This also raises the bar for trust. Users need clear boundaries, local control, and transparent logs of what agents touched. Reliability and privacy are no longer add-ons; they are product fundamentals.",
      "We are still early. The most important design decision right now is building for collaboration between humans and agents, not automation in isolation. The teams that get this right will define how digital work feels for the next decade.",
    ],
  },
];

const toc = posts.map((post) => ({ id: post.id, label: post.title }));

export default function BlogPage() {
  return (
    <ContentPage
      toc={toc}
      title="Blog"
      description="Notes on the future of work and AI-native tools."
      intro={
        <EmailUpdatesSignup
          source="blog_updates"
          title="Email updates"
          description="Get new posts as soon as they are published."
        />
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`#${post.id}`}
            className="block border border-border bg-secondary/10 squircle p-4 hover:bg-secondary/20 transition-colors no-underline"
          >
            <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
              {post.date}
            </span>
            <span className="block text-base font-medium text-foreground">{post.title}</span>
          </a>
        ))}
      </div>

      {posts.map((post) => (
        <article key={post.id} id={post.id}>
          <h2>{post.title}</h2>
          <div className="text-sm text-muted-foreground mb-6">
            <time dateTime={post.dateTime}>{post.date}</time>
          </div>
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      ))}
    </ContentPage>
  );
}
