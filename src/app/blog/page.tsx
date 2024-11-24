import ScalingContent from '../ScalingContent'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Blog() {
  return (
    <div>
      <ScalingContent>
        <Navigation />
        
        <h1>Blog</h1>
        
        <p>
          <Link href="/blog/first-post">
            First Blog Post
          </Link>
          <br />
          September 25, 2024
        </p>

        <p>
          <Link href="/blog/second-post">
            Second Blog Post
          </Link>
          <br />
          September 24, 2024
        </p>
      </ScalingContent>
    </div>
  )
} 