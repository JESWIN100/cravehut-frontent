import React from 'react';
import Category from '../../components/user/Category';
import Restaurants from '../../components/user/Restaurants';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category Section */}
      <section>
        <Category />
      </section>

      {/* Restaurants Section */}
      <section className="mt-10">
        <Restaurants />
      </section>
      <section className='relative px-6 py-6 max-w-full mx-16'>
  <div className="bg-center text-white py-16 px-6 rounded-lg shadow-lg text-center">
    <img 
      src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-8b70-51f7-bc18-a7910b50c58a/raw?se=2025-04-03T16%3A26%3A41Z&sp=r&sv=2024-08-04&sr=b&scid=92336f2a-f8a6-52c3-b8b4-29d249b0a634&skoid=0abefe37-d2bd-4fcb-bc88-32bccbef6f7d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-03T03%3A36%3A49Z&ske=2025-04-04T03%3A36%3A49Z&sks=b&skv=2024-08-04&sig=HkNtzS/kw595rDIUfuxlj63bAyytB7UC1V58F864W9E%3D" 
      alt="Descriptive Alt Text" 
      className="w-full  mx-auto  rounded-lg shadow-md"
    />
  </div>
</section>

    </div>
  );
}
