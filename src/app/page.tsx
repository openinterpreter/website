export default function Home() {
  return (
    <div className="max-w-[650px] ml-8 mt-12 font-['Times_New_Roman'] text-[#333] leading-[1.6]">
      <div className="w-5 h-5 bg-black rounded-full mb-10" />
      
      <p className="mb-6">
        Open Interpreter builds machines that improve the human condition.
      </p>

      <p className="mb-6">
        We believe that artificial intelligence offers an opportunity to do so, first by making computers significantly easier to use.
      </p>

      <p className="mb-6">
        Beyond that, a new kind of computer, built with an artificial intelligence at its core, would be 1) more accessible and 2) more capable than any machine that exists today. We are building this new kind of computer.
      </p>

      <div className="mt-12">
        <h2 className="font-medium text-2xl mb-4">I</h2>
        <h3 className="font-medium mb-4">The Agent / Computer Interface</h3>
        <p className="mb-6">In 2023, we released a real-time code execution environment that agents can operate.</p>
        <p className="mb-6">We've started deploying a high-level Computer API that exposes the foundational capabilities of computers to multimodal agents.</p>
      </div>

      <div className="mt-12">
        <h2 className="font-medium text-2xl mb-4">II</h2>
        <h3 className="font-medium mb-4">The Human / Agent Interface</h3>
        <p className="mb-6">Artificially intelligent computers offer fundamentally new modes of human-computer interaction which we intend to explore.</p>
      </div>

      <div className="mt-16 text-[#666] text-sm">
        <p>Last modified September 25th, 2024</p>
      </div>
    </div>
  )
}
