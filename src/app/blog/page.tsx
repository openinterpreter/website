import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = false

export default function Blog() {
  return (
    <div>
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
    </div>
  )
} 