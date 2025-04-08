
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {

  // Apply 'dark' class to <html> element


  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
  <header className="bg-white shadow p-4">
    <h1 className="text-xl font-bold text-blue-600">Muntasir’s Blog</h1>
    <Link href="/create">
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
      ➕ Create Post
    </button>
    </Link>
  
  </header>

  <main className="p-6">{children}</main>

  <footer className="text-center text-xs text-gray-500 py-4">
    © {new Date().getFullYear()} Muntasir Hossen
  </footer>
</div>

  )
}
