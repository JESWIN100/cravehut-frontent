import React from 'react'
import { Link } from 'react-router-dom';
export default function UserErrorPage() {
    const notFoundStyles = `
    .four_zero_four_bg {
      background-image: url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif');
      background-size: cover;
      background-position: center;
    }
    .link_404 {
      @apply text-white bg-green-600 px-6 py-2 rounded inline-block;
    }
  `;
  return (
    <div>
           <section className="page_404 py-10 bg-white font-serif">
      <style>
        {notFoundStyles}
      </style>
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="four_zero_four_bg h-96">
              <h1 className="text-9xl text-white">404</h1>
            </div>
            <div className="contant_box_404 mt-[-4rem]">
              <h3 className="text-4xl font-bold">Look like you're lost</h3>
              <p className="text-lg mt-2">The page you are looking for is not available!</p>
              {/* <a href="/" className="link_404 mt-4">Go to Home</a> */}
              <Link to={'/'}>
              <button className="btn btn-success p-5 pt-15">Go to Home</button> 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
