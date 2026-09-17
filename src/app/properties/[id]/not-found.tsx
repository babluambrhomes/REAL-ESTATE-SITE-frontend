import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2> Product Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/properties">Return Property List</Link>
    </div>
  )
}