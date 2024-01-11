"use client"
import ThreeScene from '@/app/components/ThreeScene'
import Image from 'next/image'

export default function Home() {
  return (
  <div className='h-screen w-screen bg-indigo-500'>
    <ThreeScene key={"test"}/>
  </div>
  )
}
