import ScalingContent from '../../ScalingContent'
import Navigation from '@/components/Navigation'

export default function FirstBlogPost() {
  return (
    <div>
      <ScalingContent>
        <Navigation />
        
        <h1>First Blog Post</h1>
        
        <p>September 25, 2024</p>

        <p>
          This is the content of the first blog post. You can write multiple paragraphs here.
        </p>

        <p>
          Each paragraph will have proper spacing and maintain that classic HTML look.
        </p>

        <p>
          You can include <a href="https://example.com">links</a> within the text as well.
        </p>
      </ScalingContent>
    </div>
  )
} 