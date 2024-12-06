export const dynamic = 'force-static'
export const revalidate = false

export default function Home() {
  return (
    <div>
      <p className="mb-4 italic">
        An Agent-Computer-Interface project from Seattle, Washington.
      </p>

      {/* <p className="mb-4">
        <b>In late 2023</b> we introduced Open Interpreter, a modern command line assistant and one of the first popular agents. Recently the project hit 1.0, and we've been working on a new version that is more powerful, easier to use, and more flexible.
      </p>

      <p className="mb-4">
        <b>Stage one</b> of a multi-stage project to build a new kind of computer. This first stage is focused on understanding the agent-computer interface— how language models can operate computers robustly.
      </p>

      <p className="mb-4">
        <b>Stage two</b> is focused on the human-agent interface— how we can interact with this new kind of computer. We have released a few experiments in this space, and we are just beginning to explore the potential of this interface.
      </p> */}
    </div>
  )
}
