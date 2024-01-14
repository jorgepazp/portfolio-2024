"use client"
import ThreeScene from '@/app/components/ThreeScene'
import Image from 'next/image'

export default function Home() {
  return (
  <div className='h-screen w-screen relative bg-slate-900'>
    <h2 className="font-serif text-6xl font-800">I'm J<span className='scale-x-50 '>o</span>rge Paz</h2>
    <div className="h-full  w-full absolute top-0">
    <ThreeScene />
    </div>
  </div>
  )
}
