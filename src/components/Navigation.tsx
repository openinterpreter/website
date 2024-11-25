import Link from 'next/link'

export default function Navigation() {
  return (
    <nav style={{ marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <ul style={{ 
          display: 'flex', 
          gap: '1rem' 
        }}>
          <li>
            <Link 
              href="/" 
              style={{ textDecoration: 'underline' }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/cli" 
              style={{ textDecoration: 'underline' }}
            >
              CLI
            </Link>
          </li>
          <li>
            <Link 
              href="/tool-standard" 
              style={{ textDecoration: 'underline' }}
            >
              Tool Standard
            </Link>
          </li>
          <li>
            <Link 
              href="/events" 
              style={{ textDecoration: 'underline' }}
            >
              Events
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              style={{ textDecoration: 'underline' }}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
} 