import { BarChart3, Utensils, DollarSign, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Utensils size={24} />} 
          title="Total Restaurants" 
          value="42" 
          change="+5% from last month" 
          color="bg-blue-100 text-blue-600"
        />
        <StatCard 
          icon={<DollarSign size={24} />} 
          title="Total Revenue" 
          value="$12,345" 
          change="+12% from last month" 
          color="bg-green-100 text-green-600"
        />
        <StatCard 
          icon={<Users size={24} />} 
          title="Active Customers" 
          value="1,234" 
          change="+8% from last month" 
          color="bg-purple-100 text-purple-600"
        />
        <StatCard 
          icon={<BarChart3 size={24} />} 
          title="Avg. Rating" 
          value="4.5" 
          change="+0.2 from last month" 
          color="bg-amber-100 text-amber-600"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem 
            title="New order #1234" 
            description="From Burger King - $24.50" 
            time="10 mins ago"
          />
          <ActivityItem 
            title="New review added" 
            description="4 stars for Pizza Hut" 
            time="25 mins ago"
          />
          <ActivityItem 
            title="Restaurant added" 
            description="New restaurant: Sushi Palace" 
            time="1 hour ago"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold my-1">{value}</p>
      <p className="text-sm text-gray-500">{change}</p>
    </div>
  );
}

function ActivityItem({ title, description, time }) {
  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="bg-gray-100 p-2 rounded-lg mr-4">
        <div className="w-6 h-6"></div>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <span className="text-gray-400 text-sm">{time}</span>
    </div>
  );
}