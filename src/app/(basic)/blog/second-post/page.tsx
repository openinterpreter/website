export const dynamic = 'force-static'
export const revalidate = false

export default function SecondBlogPost() {
  return (
    <div>
      <h1>Second Blog Post</h1>
      
      <p>September 24, 2024</p>

      <p>
        Here&apos;s the content of the second blog post. Let&apos;s make it different from the first one.
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
    </div>
  )
} 