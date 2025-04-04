import { CirclePlus, Star } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryDetailPage() {
  const items = [
    {
      image: 'https://media.istockphoto.com/id/168855393/photo/gourmet-salad.jpg?s=612x612&w=0&k=20&c=bnDzlcKlZYR8NZQXOXb1fbF6x3sV8LnE5pu6rQA2LpI=',
      title: 'Chicken Kebab',
      price: 350,
      restaurant: 'Malabar Hut',
      rating: 4.4,
    },
    {
      image: 'https://media.istockphoto.com/id/168855393/photo/gourmet-salad.jpg?s=612x612&w=0&k=20&c=bnDzlcKlZYR8NZQXOXb1fbF6x3sV8LnE5pu6rQA2LpI=',
      title: 'Chicken Fry',
      price: 220,
      restaurant: 'Spice Junction',
      rating: 4.2,
    },
    {
      image: 'https://media.istockphoto.com/id/168855393/photo/gourmet-salad.jpg?s=612x612&w=0&k=20&c=bnDzlcKlZYR8NZQXOXb1fbF6x3sV8LnE5pu6rQA2LpI=',
      title: 'Chicken Curry',
      price: 150,
      restaurant: 'Spice Junction',
      rating: 4.3,
    },
  ];

  const {id}=useParams()
  console.log(id);
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Popular Dishes</h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img className="w-full h-48 object-cover" src={item.image} alt={item.title} />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.restaurant}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star /> {item.rating}
                </div>
                <span className="text-lg font-bold text-green-600">₹{item.price}</span>
              </div>
              <button className="mt-4  text-blackfont-semibold py-2 rounded-lg transition">
              <CirclePlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
