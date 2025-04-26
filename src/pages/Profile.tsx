
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, Package, Heart, Clock, LogOut } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

// Sample data
const sampleOrders = [
  {
    id: "ord001",
    date: "Apr 15, 2025",
    total: 67.98,
    status: "Delivered",
    items: [
      {
        id: "p1",
        name: "Glow Foundation SPF 30",
        price: 42.99,
        image: "https://images.unsplash.com/photo-1596704017254-9b5e3d5c0a1a?auto=format&fit=crop&q=80",
      },
      {
        id: "p2",
        name: "Multi-Use Cream Blush",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1596704147170-a87a3827628c?auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ord002",
    date: "Mar 28, 2025",
    total: 32.50,
    status: "Delivered",
    items: [
      {
        id: "p3",
        name: "Long-Lasting Setting Spray",
        price: 32.50,
        image: "https://images.unsplash.com/photo-1596704129662-3ce19c8b817a?auto=format&fit=crop&q=80",
      },
    ],
  },
];

const sampleSavedProducts = [
  {
    id: "p1",
    name: "Glow Foundation SPF 30",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1596704017254-9b5e3d5c0a1a?auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "p2",
    name: "Multi-Use Cream Blush",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1596704147170-a87a3827628c?auto=format&fit=crop&q=80",
    rating: 4.5,
    reviewCount: 84,
  },
  {
    id: "p3",
    name: "Long-Lasting Setting Spray",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1596704129662-3ce19c8b817a?auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewCount: 63,
    isNew: true,
  },
  {
    id: "p4",
    name: "Volumizing Mascara",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1631214548558-308a69b2098c?auto=format&fit=crop&q=80",
    rating: 4.6,
    reviewCount: 42,
  },
];

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const handleLogout = () => {
    // Logout logic would go here
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    // Redirect to login page
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Profile" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Emily Johnson</h1>
              <p className="text-gray-600">emily.johnson@example.com</p>
            </div>
            <Button 
              variant="outline" 
              className="ml-auto flex items-center"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="orders" className="flex items-center justify-center">
              <Package size={16} className="mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center justify-center">
              <Heart size={16} className="mr-2" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center">
              <Settings size={16} className="mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            {sampleOrders.length > 0 ? (
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <div key={order.id} className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          <span className="text-sm text-gray-500">{order.date}</span>
                        </div>
                        <p className="font-medium">Order #{order.id}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {order.status}
                        </div>
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center rounded border border-gray-100 p-2">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-sm">
                <Package size={40} className="mb-4 text-gray-400" />
                <h2 className="mb-2 text-xl font-medium text-gray-900">No orders yet</h2>
                <p className="mb-6 text-center text-gray-600">
                  Your order history will appear here once you make a purchase.
                </p>
                <Button className="bg-poppy-pink text-foreground hover:bg-poppy-pink/90">
                  Start Shopping
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            {sampleSavedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {sampleSavedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    isNew={product.isNew}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-sm">
                <Heart size={40} className="mb-4 text-gray-400" />
                <h2 className="mb-2 text-xl font-medium text-gray-900">No saved items</h2>
                <p className="mb-6 text-center text-gray-600">
                  Items you like will appear here for easy access.
                </p>
                <Button className="bg-poppy-pink text-foreground hover:bg-poppy-pink/90">
                  Explore Products
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Account Settings</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="mb-2 font-medium">Personal Information</h3>
                  <p className="text-sm text-gray-600">Update your personal details and account preferences.</p>
                  <Button variant="outline" className="mt-2">
                    Edit Profile
                  </Button>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="mb-2 font-medium">Shipping Addresses</h3>
                  <p className="text-sm text-gray-600">Manage your shipping addresses for faster checkout.</p>
                  <Button variant="outline" className="mt-2">
                    Manage Addresses
                  </Button>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="mb-2 font-medium">Payment Methods</h3>
                  <p className="text-sm text-gray-600">Add or remove payment methods for your account.</p>
                  <Button variant="outline" className="mt-2">
                    Manage Payments
                  </Button>
                </div>
                
                <div className="pb-4">
                  <h3 className="mb-2 font-medium">Notifications</h3>
                  <p className="text-sm text-gray-600">Customize your notification preferences.</p>
                  <Button variant="outline" className="mt-2">
                    Notification Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Profile;
