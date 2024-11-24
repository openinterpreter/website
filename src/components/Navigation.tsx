import Link from 'next/link'

export default function Navigation() {
  return (
    <nav style={{ marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }} className="flex-col items-start gap-4 md:flex-row md:items-center">
        <ul style={{ 
          display: 'flex', 
          gap: '2rem' 
        }} className="w-full md:w-auto">
          <li>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ 
                width: '0.8em', 
                height: '0.8em', 
                backgroundColor: '#0000EE', 
                borderRadius: '50%',
                display: 'inline-block',
                verticalAlign: 'middle',
                marginTop: '-0.1em'
              }} />
            </Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
        <div className="w-full md:w-auto">
          <input 
            type="text" 
            placeholder="email@example.com" 
          />
          {' '}
          <button>
            Join Mailing List
          </button>
        </div>
      </div>
    </nav>
  )
} 