import Navbar from '../components/Navbar'

export const metadata = { title: 'Macro Compass | Investment Dashboard', description: 'Global commodity, equity & IPO investment strategy dashboard' }

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ background: '#0f172a', color: '#e2e8f0' }}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
