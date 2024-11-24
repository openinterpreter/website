import ScalingContent from './ScalingContent'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div>
      <ScalingContent>
        <Navigation />
        
        <p className="mb-4">
          <b>Open Interpreter builds machines that improve the human condition.</b>
        </p>

        <p className="mb-4">
          We believe that artificial intelligence offers an opportunity to do so, first by making computers significantly easier to use.
        </p>

        <p className="mb-4">
          Beyond that, a new kind of computer, built with an artificial intelligence at its core, would be 1) more accessible and 2) more capable than any machine that exists today. We are building this new kind of computer.
        </p>

        <div className="mt-8">
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>The Agent / Computer Interface</h3>
          <p className="mb-4">In 2023, we released a real-time code execution environment that agents can operate.</p>
          <p className="mb-4">We've started deploying a high-level Computer API that exposes the foundational capabilities of computers to multimodal agents.</p>
        </div>

        <div className="mt-8">
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>The Human / Agent Interface</h3>
          <p className="mb-4">Artificially intelligent computers offer fundamentally new modes of human-computer interaction which we intend to explore.</p>
        </div>

        <div className="mt-8 text-[#666] text-sm">
          <p>Last modified September 25th, 2024</p>
        </div>
      </ScalingContent>
    </div>
  )
}
