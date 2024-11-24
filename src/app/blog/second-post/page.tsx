import ScalingContent from '../../ScalingContent'
import Navigation from '@/components/Navigation'

export default function SecondBlogPost() {
  return (
    <div>
      <ScalingContent>
        <Navigation />
        
        <h1>Second Blog Post</h1>
        
        <p>September 24, 2024</p>

        <p>
          Here's the content of the second blog post. Let's make it different from the first one.
        </p>

        <p>
          You might want to include lists:
        </p>

        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item with a <a href="https://example.com">link</a></li>
        </ul>

        <p>
          And then continue with more paragraphs as needed.
        </p>
      </ScalingContent>
    </div>
  )
} 