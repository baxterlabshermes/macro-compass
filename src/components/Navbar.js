'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAV = [
  { label: 'Home', href: '/' },
  { group: 'Markets', links: ['/food-water','/energy','/hard-assets','/ipo-pipeline','/consumer-apparel','/wellness-leisure'], dropdown: true },
  { label: 'Synthesis', href: '/synthesis' },
  { label: 'News', href: '/news' },
]

function sectorName(path) {
  const map = {
    '/food-water': 'Food & Water',
    '/energy': 'Energy',
    '/hard-assets': 'Hard Assets',
    '/ipo-pipeline': 'IPO Pipeline',
    '/consumer-apparel': 'Consumer & Apparel',
    '/wellness-leisure': 'Wellness & Leisure',
  }
  return map[path] || path
}

export default function Navbar() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const [open, setOpen] = useState(false)

  useEffect(() => { if (typeof window !== 'undefined') setOpen(false) }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#141420]/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center h-14 gap-3">

          <Link href="/" className="shrink-0">
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Macro Compass</span>
          </Link>

          {/* ── Desktop nav items ── */}
          <div className="hidden lg:flex items-center gap-1 ml-6">
            {NAV.filter(n => !n.dropdown).map(item => (
              <Link key={item.href} href={item.href} replace
                className={`px-3 py-2 rounded-lg text-[14px] transition-colors ${pathname===item.href ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50 hover:text-white'}`}>
                {item.label}
              </Link>
            ))}

            {/* ── Dropdown toggle for Markets ── */}
            <div className="relative">
              <button onClick={() => setOpen(!open)}
                className={`px-3 py-2 rounded-lg text-[14px] flex items-center gap-1 transition-colors ${pathname.startsWith('/food') || pathname.startsWith('/energy') || pathname.startsWith('/hard') || pathname.startsWith('/ipo') || pathname.startsWith('/consumer') || pathname.startsWith('/wellness') ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50 hover:text-white'}`}>
                Markets
                <svg className="w-3 h-3" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" fill="none" strokeWidth={2} /></svg>
              </button>

              {open && (
                <div onMouseLeave={() => setOpen(false)} className="absolute top-full left-0 mt-1 w-56 bg-[#1a1a28] border border-white/[0.08] rounded-xl py-2 shadow-xl">
                  {[
                    { group: 'Commodities', items: ['/food-water','/energy'] },
                    { group: 'Equity Plays', items: ['/ipo-pipeline','/consumer-apparel','/wellness-leisure'] },
                    { group: 'Hard Assets', items: ['/hard-assets'] },
                  ].map(col => (
                    <div key={col.group} className="mt-1 last:mb-0">
                      <p className="px-4 pb-1 text-[9px] uppercase tracking-widest text-white/25 font-semibold">{col.group}</p>
                      {col.items.map(link => (
                        <Link key={link} href={link} onClick={() => setOpen(false)} replace
                          className={`block px-4 py-2.5 text-[13px] transition-colors ${pathname===link ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50 hover:text-white hover:bg-white/[0.03]'}`}>
                          {sectorName(link)}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Live badge + mobile menu */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.1] border border-emerald-500/[0.18]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-medium tracking-wide">LIVE</span>
            </span>
            {/* Mobile hamburger */}
            <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg transition-colors ${open ? 'bg-white/[0.08]' : ''}`}>
              <svg className="w-5 h-5 text-white/60" stroke="currentColor" viewBox="0 0 24 24"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} fill="none" strokeWidth={2} strokeLinecap="round"/></svg>
            </button>
          </div>

        </div>

        {/* Mobile dropdown panel */}
        {open && (
          <div className="absolute top-14 left-0 right-0 z-50 lg:hidden">
            <div className="bg-[#1a1a28] border-t border-white/[0.06] py-3 px-3 space-y-1">
              {NAV.filter(n => !n.dropdown).map(item => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} replace
                  className={`block px-3 py-3 rounded-lg text-[14px] ${pathname===item.href ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50'}`}>
                  {item.label}
                </Link>
              ))}

              {NAV.filter(n => n.dropdown).flatMap(g => g.links).map(link => (
                <div key={link}>
                  <Link href={link} onClick={() => setOpen(false)} replace
                    className={`block px-3 py-2.5 rounded-lg text-[13px] ${pathname===link ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50'}`}>
                    {sectorName(link)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </nav>
  )
}
