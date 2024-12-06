import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="mb-8">
      <div className="flex justify-between items-center">
        <ul className="flex gap-4">
          <li>
            <Link 
              href="/" 
              className="underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="https://github.com/openinterpreter/open-interpreter" 
              className="underline"
            >
              CLI
            </Link>
          </li>
          {/* <li>
            <Link 
              href="/desktop" 
              className="underline"
            >
              Actions
            </Link>
          </li> */}
          {/* <li>
            <Link 
              href="/events" 
              className="underline"
            >
              Events
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className="underline"
            >
              Blog
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  )
} 