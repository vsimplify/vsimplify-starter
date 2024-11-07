import { Metadata } from 'next'

// Metadata for the page (optional)
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description'
}

// For static pages
export default function Page() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Page Title</h1>
      <div>
        <p>Page content goes here</p>
      </div>
    </main>
  )
}

// For pages with dynamic data fetching
// async function getData() {
//   const res = await fetch('https://api.example.com/data')
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// export default async function Page() {
//   const data = await getData()
//   return (
//     <main className="min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Page Title</h1>
//       <div>
//         {/* Render data here */}
//       </div>
//     </main>
//   )
// }
