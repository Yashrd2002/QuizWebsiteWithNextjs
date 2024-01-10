import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className=' h-screen back flex justify-center items-center'>
      <Link href={"/questions"} className='bg-blue-500 text-white px-6 py-2 rounded-lg'>Start Quiz</Link>
    </main>
  )
}
