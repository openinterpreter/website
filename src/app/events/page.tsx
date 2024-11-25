'use client'

import { useState } from 'react'

export default function EventsPage() {
  const [showPastEvents, setShowPastEvents] = useState(false)
  
  const upcomingEvents = [
    {
      title: 'Animal House Party - December',
      date: 'December 15, 2024',
      description: 'Join us for our monthly house party! Come meet fellow AI enthusiasts and developers in a casual setting.',
      link: 'https://lu.ma/animal-december',
      ctaText: 'Register here.'
    },
    {
      title: 'AI Tinkerers Meetup w/ Open Interpreter Team', 
      date: 'December 8, 2024',
      description: 'Special event featuring the Open Interpreter team. Come discuss AI agents, tools, and the future of development.',
      link: 'https://lu.ma/animal-tinkerers',
      ctaText: 'Register here.'
    }
  ]
  
  const pastEvents = [
    {
      title: 'Animal House Party - November',
      date: 'November 17, 2024',
      link: 'https://www.youtube.com/watch?v=november',
      ctaText: 'Watch Recording →'
    },
    {
      title: 'Animal House Party - October',
      date: 'October 20, 2024',
      link: 'https://www.youtube.com/watch?v=october',
      ctaText: 'Watch Recording →'
    },
    {
      title: 'Animal House Party - September',
      date: 'September 15, 2024',
      link: 'https://www.youtube.com/watch?v=september',
      ctaText: 'Watch Recording →'
    },
    {
      title: 'Animal House Party - August',
      date: 'August 18, 2024',
      link: 'https://www.youtube.com/watch?v=august',
      ctaText: 'Watch Recording →'
    }
  ]

  const EventCard = ({ event, isLast = false }: { event: { title: string, date: string, description?: string, link: string, ctaText: string }, isLast: boolean }) => (
    <div>
      <p>
        <b>{event.title}</b> <i>{event.date}</i> —
        {event.description && ` ${event.description}`} <a href={event.link} className="text-blue-600 hover:underline">
          {event.ctaText}
        </a>
      </p>
      {!isLast && <hr className="mt-6" />}
    </div>
  )

  return (
    <div className="space-y-12">
      <section>
        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <EventCard 
              key={index} 
              event={event} 
              isLast={index === upcomingEvents.length - 1}
            />
          ))}
        </div>
      </section>

      <section>
        <button
          onClick={() => setShowPastEvents(!showPastEvents)}
        >
          {showPastEvents ? 'Hide Past Events' : 'Show Past Events'}
        </button>

        {showPastEvents && (
          <div className="space-y-6 mt-6">
            {pastEvents.map((event, index) => (
              <EventCard 
                key={index} 
                event={event} 
                isLast={index === pastEvents.length - 1}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
} 