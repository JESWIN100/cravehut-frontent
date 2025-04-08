import { Search, Star, Frown, Sliders } from 'lucide-react';
import { useState } from 'react';

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  const reviews = [
    { 
      id: 1, 
      customer: "John Doe", 
      restaurant: "Burger King", 
      rating: 4, 
      comment: "Great burgers and fast service! The fries were crispy and delicious.",
      date: "2023-05-14"
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      restaurant: "Pizza Hut", 
      rating: 5, 
      comment: "Best pizza in town! The crust was perfect and the toppings were fresh.",
      date: "2023-05-13"
    },
    { 
      id: 3, 
      customer: "Mike Johnson", 
      restaurant: "Sushi Palace", 
      rating: 3, 
      comment: "Good sushi but expensive for the portion size. Service was excellent though.",
      date: "2023-05-12"
    },
    { 
      id: 4, 
      customer: "Sarah Williams", 
      restaurant: "Taco Bell", 
      rating: 2, 
      comment: "Order was wrong and the food was cold. Disappointing experience.",
      date: "2023-05-11"
    },
    { 
      id: 5, 
      customer: "David Brown", 
      restaurant: "McDonald's", 
      rating: 4, 
      comment: "Consistently good quality. The new burger is worth trying!",
      date: "2023-05-10"
    },
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6 lg:ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Customer Reviews</h1>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Sliders className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{review.customer}</h3>
                    <p className="text-sm text-gray-500">{review.restaurant}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium text-gray-700">{review.rating}.0</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">{review.date}</span>
                  <div className="flex space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-800">Reply</button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Frown size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No reviews found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination */}
        {filteredReviews.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
            <div className="text-sm text-gray-500 mb-2 sm:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">15</span> reviews
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}