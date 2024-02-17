"use client"
import ThreeScene from '@/app/components/ThreeScene'
import Image from 'next/image'
import LandingPage from './sections/landing'
import Projects from './sections/projects'

export default function Home() {
  return (
  <main className='h-screen w-screen relative flex justify-center'>
    <div className="h-full overflow-x-hidden">
    {/* <ThreeScene /> */}
    <LandingPage/>
    <Projects/>
    </div>
  </main>
  )
}
