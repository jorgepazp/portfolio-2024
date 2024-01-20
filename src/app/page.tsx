"use client"
import ThreeScene from '@/app/components/ThreeScene'
import Image from 'next/image'
import LandingPage from './sections/landing'

export default function Home() {
  return (
  <main className='h-screen w-screen relative flex justify-center'>
    <div className="h-full ">
    {/* <ThreeScene /> */}
    <LandingPage/>
    </div>
  </main>
  )
}
