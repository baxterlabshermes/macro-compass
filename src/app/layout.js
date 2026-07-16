import Navbar from '../components/Navbar'
import './globals.css'

export const metadata = { title: 'Macro Compass | Investment Dashboard', description: 'Global commodity, equity & IPO investment strategy dashboard' }

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased" style={{ font: '-apple-system, Segoe UI, Roboto, sans-serif' }}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
