import React from 'react'
import saleimg from '../assets/saleimg1.png'
import { Link } from 'react-router-dom'

const sale = () => {
  return (
   <>
   <div className="w-[95%] bg-[#8B9A6E] h-64 overflow-hidden rounded-2xl ml-12 mt-10">

  <div className="flex h-full items-center justify-between">

    {/* Text Section */}
    <div className="flex flex-col items-start justify-center pl-12">

      <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F3A25]/70">
        Summer Sale
      </span>

      <h2 className="mt-2 text-4xl font-bold uppercase tracking-wide text-[#F7F2EB]">
        Up to 40% Off
      </h2>

      <p className="mt-2 text-sm text-[#F7F2EB]/80">
        Refresh your wardrobe with our latest styles.
      </p>

<Link to='/search?category=tshirt'>
      <button className="mt-5 rounded-full bg-[#2F3A25] px-7 py-2.5 text-sm font-semibold text-[#F7F2EB] transition duration-300 hover:bg-[#F7F2EB] hover:text-[#2F3A25]">
        Shop Now
      </button></Link>

    </div>

    {/* IMAGE SECTION — unchanged */}
    <div className="flex h-full items-center justify-end">
      <img
        src={saleimg}
        alt="Sale"
        className="h-full w-3xl object-cover object-[center_30%] "
      />
    </div>

  </div>

</div>
   </>
  )
}

export default sale