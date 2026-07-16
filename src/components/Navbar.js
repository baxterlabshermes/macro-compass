export default function Navbar() {
  const tabs = [
    { page: '/', label: '🏠 Home' },
    { page: '/food-water', label: '🌾 Food & Water' },
    { page: '/energy', label: '⚡ Energy' },
    { page: '/hard-assets', label: '🥇 Hard Assets' },
    { page: '/ipo-pipeline', label: '🏭 IPO Pipeline' },
    { page: '/consumer-apparel', label: '👗 Consumer & Apparel' },
    { page: '/wellness-leisure', label: '🐎 Wellness & Leisure' },
    { page: '/synthesis', label: '📊 Synthesis' },
    { page: '/news', label: '📰 News' }
  ]
  
  return (
    <nav className="no-print sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-3">
        <span className="text-lg font-bold text-gold whitespace-nowrap mr-2">Macro Compass</span>
        <div className="flex gap-1 min-w-max">
          {tabs.map(t => (
            <a key={t.page} href={t.page}
               className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${t.page === '/' ? 'text-white font-semibold bg-surface' : 'text-slate-400 hover:text-white hover:bg-surface/60'}`}>
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
