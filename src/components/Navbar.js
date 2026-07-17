'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Sectors', isDropdown: true },
  { label: 'Synthesis', href: '/synthesis' },
  { label: 'News', href: '/news' },
]

const SECTORS = [
  { group: 'Commodities', links: ['/food-water','/energy','/hard-assets'] },
  { group: 'Opportunities', links: ['/ipo-pipeline','/consumer-apparel','/wellness-leisure'] },
]

function sectorName(p) {
  const m = { '/food-water':'Food & Water', '/energy':'Energy', '/hard-assets':'Hard Assets',
              '/ipo-pipeline':'IPO Pipeline', '/consumer-apparel':'Consumer & Apparel',
              '/wellness-leisure':'Wellness & Leisure' }
  return m[p] || p
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    window.addEventListener('mousedown', h)
    return () => window.removeEventListener('mousedown', h)
  }, [open])

  const isSector = SECTORS.some(s => s.links.some(l => pathname === l))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#141420]/92 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-14 flex items-center gap-3">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 text-[15px] font-bold tracking-tight text-white/90">
          Macro Compass
        </Link>

        {/* Desktop nav + dropdown */}
        <div className="hidden lg:flex items-center gap-0.5 ml-2">
          {NAV.filter(v => !v.isDropdown).map(item => (
            <Link key={item.href} href={item.href} replace
              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all duration-150 ${pathname===item.href ? 'text-white bg-white/[0.08]' : 'text-white/50 hover:text-white/80'}`}>
              {item.label}
            </Link>
          ))}

          {/* Sector dropdown */}
          <div ref={ref} className="relative">
            <button onClick={() => setOpen(!open)} disabled={pathname.startsWith('/synthesis') || pathname === '/news'}
              className={`pl-3 pr-2.5 py-1.5 rounded-lg text-[13px] transition-all duration-150 flex items-center gap-1 ${isSector ? 'text-white bg-white/[0.08]' : 'text-white/50 hover:text-white/80'}`}>
              Sectors
              <svg className={`w-3 h-3 text-white/40 transition-transform duration-200 ${open?'rotate-180':''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor"><path d="M3 4.5l3 3 3-3"/></svg>
            </button>
            {open && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
                <div className="absolute top-full left-0 mt-2 bg-[#1a1a28] border border-white/[0.10] rounded-xl shadow-2xl py-2 w-52">
                  {SECTORS.map(g => (
                    <div key={g.group} className="mb-1 last:mb-0">
                      <p className="px-4 py-1 text-[9px] uppercase tracking-widest text-white/25 font-semibold">{g.group}</p>
                      {g.links.map(link => (
                        <Link key={link} href={link} onClick={() => setOpen(false)} replace
                          className={`block px-4 py-2 text-[13px] transition-colors ${pathname===link ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/[0.04]'}`}>
                          {sectorName(link)}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: live badge + mobile menu */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.1] border border-emerald-500/[0.18]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-medium tracking-wide">LIVE</span>
          </span>
          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg transition-colors ${open?'bg-white/[0.08]':''}`}>
            <svg className="w-5 h-5 text-white/60" stroke="currentColor" viewBox="0 0 24 24"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} fill="none" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Mobile dropdown panel */}
        {open && (
          <div className="absolute top-14 left-0 right-0 z-50 lg:hidden">
            <div className="bg-[#1a1a28] border-t border-white/[0.06] py-3 px-3 space-y-1">
              {NAV.filter(v=>!v.isDropdown).map(v => (
                <Link key={v.href} href={v.href} onClick={() => setOpen(false)} replace
                  className={`block px-3 py-3 rounded-lg text-[14px] ${pathname===v.href ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50'}`}>
                  {v.label}
                </Link>
              ))}
              {SECTORS.map(g => (
                <div key={g.group} className="mt-3">
                  <p className="px-3 pb-1.5 text-[9px] uppercase tracking-widest text-white/20 font-semibold">{g.group}</p>
                  {g.links.map(link => (
                    <Link key={link} href={link} onClick={() => setOpen(false)} replace
                      className={`block px-3 py-2.5 rounded-lg text-[13px] ${pathname===link ? 'text-white font-medium bg-white/[0.06]' : 'text-white/50'}`}>
                      {sectorName(link)}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </nav>
  )
}
