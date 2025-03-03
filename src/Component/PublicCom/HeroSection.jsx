import React from 'react'
import { useNavigate } from 'react-router-dom'
function HeroSection() {
  let navigate = useNavigate()
  return (
    <div id='home' className="font-sans mt-24 mb-24" style={{ marginTop: 200 }} >
      <div className="text-center max-w-2xl max-md:max-w-md mx-auto">
        <div>
          <h2 className=" md:text-4xl text-3xl font-extrabold mb-4 md:!leading-[45px]">
            Pakistan{" "}
            <span className="text-blue-600">Location </span>
            Api
          </h2>
          <p className="mt-6 text-sm leading-relaxed max-sm:text-center">
          Our Pakistan Location API provides precise and comprehensive location data for users across Pakistan. Whether you need details about cities, provinces,  our API ensures fast, reliable, and up-to-date results. Easily integrate our service to access accurate area-based information, making location-based applications seamless and efficient.
          </p>
          {/* <div className="grid sm:grid-cols-3 gap-6 items-center mt-12">
            <div className="flex flex-col items-center text-center">
              <h5 className="font-bold text-2xl text-blue-600 mb-2">10+</h5>
              <p className=" text-sm font-semibold">
                Years Experience
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h5 className="font-bold text-2xl text-blue-600 mb-2">890</h5>
              <p className=" text-sm font-semibold">Cases Solved</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h5 className="font-bold text-2xl text-blue-600 mb-2">250</h5>
              <p className=" text-sm font-semibold">
                Business Partners
              </p>
            </div>
          </div> */}
          <div className="mt-20 flex gap-x-6 gap-y-4 justify-center max-sm:flex-col max-sm:mx-4">
            <button
              onClick={() => navigate('/register')}
              type="button"
              className="bg-blue-600 hover:bg-transparent hover:text-blue-600 border border-blue-600 transition-all text-white font-bold text-sm rounded px-6 py-3 max-sm:w-full"
            >
              Start a free trial
            </button>
            <button
              type="button"
              className="bg-transparent hover:bg-gray-800 hover:text-white border border-gray-800 transition-all font-bold text-sm rounded px-6 py-3 max-sm:w-full"
            >
              API documentation
            </button>
          </div>

        </div>
      </div>
      <br /><br />
    </div>
  )
}

export default HeroSection
