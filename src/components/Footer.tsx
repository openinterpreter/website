import Link from 'next/link'

export default function Footer() {
  return (
    <div className="w-full flex justify-between items-end font-['Times_New_Roman'] text-[17px]">
      <div className="flex items-center gap-6">
        <ul className="flex gap-4">
        <li>
            <Link 
              href="https://github.com/KillianLucas/open-interpreter" 
              target="_blank"
            >
              Github
            </Link>
          </li>
          <li>
            <Link 
              href="https://github.com/KillianLucas/open-interpreter" 
              target="_blank"
            >
              Discord
            </Link>
          </li>
          <li>
            <Link 
              href="mailto:help@openinterpreter.com" 
            >
              E-Mail
            </Link>
          </li>
        </ul>
        
        <div>
          <input 
            type="text" 
            placeholder="email@example.com"
            className="text-[17px]"
          />
          { ' ' }
          <button className="text-[17px]">
            Join Mailing List
          </button>
        </div>
      </div>
      
      {/* <img 
        src="/interpreter.png"
        alt="Description"
        className="w-96"
      /> */}
    </div>
  )
} 