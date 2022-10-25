import React from 'react'

const Hero = () => {
  return (
    <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 px-10 lg:py-0'>
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif"><span className="underline decoration-black decoration-4">Medium</span> is a place to write, read and connect</h1>
          <h2>It's easy and free to post your thinking on any topic and connect with millions of readers</h2>
        </div>
        <div className='hidden md:inline-flex h-32 lg:h-[400px]'>
          <img src="./static/images/medium-logo-letter.png" alt="medium logo letter" />
        </div>
      </div>
  )
}

export default Hero