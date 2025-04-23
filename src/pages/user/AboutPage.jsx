import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-8 mb-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            About <span className="text-yellow-300">CraveHut</span>
          </h1>
          <p className="text-lg sm:text-xl text-center max-w-2xl mx-auto">
            Delivering happiness, one meal at a time
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 px-4 sm:px-8">
        {/* Our Story */}
        <section className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500" 
              alt="Our Story" 
              className="rounded-xl shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-4">
                <span className="text-2xl text-red-600">🍕</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              CraveHut began as a small idea in 2018 to revolutionize food delivery. What started as a passion project between food-loving friends has grown into one of India's most trusted delivery platforms. We partner with the best local restaurants and home chefs to bring you authentic flavors with unmatched convenience.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <section className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                <span className="text-2xl text-red-600">🚀</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To connect food lovers with their favorite restaurants while ensuring lightning-fast delivery, exceptional service, and meals made with love.
            </p>
          </section>

          {/* Vision */}
          <section className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-full mr-4 shadow-sm">
                <span className="text-2xl text-yellow-600">🌟</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              To become India's most loved food ecosystem where every meal is an experience and every delivery brings joy.
            </p>
          </section>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-6 bg-gray-50 rounded-xl">
          <div className="p-4">
            <div className="text-3xl font-bold text-red-600">10K+</div>
            <div className="text-gray-500 text-sm">Happy Customers</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-red-600">500+</div>
            <div className="text-gray-500 text-sm">Restaurant Partners</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-red-600">15</div>
            <div className="text-gray-500 text-sm">Cities</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-red-600">30min</div>
            <div className="text-gray-500 text-sm">Avg. Delivery</div>
          </div>
        </div>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to satisfy your cravings?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Join millions of happy customers enjoying delicious meals delivered fast.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Order Now
            </button>
            <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-8 rounded-full transition-all duration-300">
              Partner With Us
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-8">
            Have questions? Email us at <a href="mailto:hello@cravehut.com" className="text-red-500 underline">hello@cravehut.com</a>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200">
        © {new Date().getFullYear()} CraveHut. Crafted with ❤️ for food lovers everywhere.
      </footer>
    </div>
  );
};

export default AboutUs;