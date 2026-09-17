import React from 'react'
import image from '../assets/card1.png'

const about = () => {
  return (
   <>
    <div className="bg-[#F7F2EB] w-full">

      {/* Story */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-8 md:px-20 py-24">

        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt="Elvor Threads craftsmanship"
            className="w-full h-140 object-cover object-top-right "
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] text-[#8B9A6E] font-medium">
            About Elvor Threads
          </p>

          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-[#3A362F] leading-tight">
            Our Story
          </h1>

          <p className="text-base leading-relaxed tracking-wide text-[#5C5750]">
            Elvor Threads started with a simple frustration: closets full of clothes,
            yet nothing that felt quite right. Trends moved fast, quality didn't keep up,
            and every season meant starting over.
          </p>

          <p className="text-base leading-relaxed tracking-wide text-[#5C5750]">
            We build differently. Every piece is designed to outlast the season it was
            made for — considered fabrics, honest construction, and a palette that
            never goes out of place in your wardrobe. No noise, no gimmicks. Just clothing
            that fits into your life as easily as it fits your body.
          </p>
        </div>

      </div>

      {/* Mission */}
      <div className="bg-[#EAE2D6] px-8 md:px-20 py-16">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4">
          <p className="text-xs tracking-[0.3em] text-[#8B9A6E] font-medium">
            Our Mission
          </p>

          <p className="text-2xl md:text-3xl font-light tracking-wide text-[#2F3A25] leading-snug">
            To create timeless clothing that moves with you — through every season,
            every occasion, every version of yourself.
          </p>
        </div>
      </div>

    </div>
   </>
  )
}

export default about