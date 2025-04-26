
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";

// Sample cart data
const initialCartItems = [
  {
    id: "item1",
    productId: "p1",
    name: "Glow Foundation SPF 30",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1596704017254-9b5e3d5c0a1a?auto=format&fit=crop&q=80",
    quantity: 1,
    variant: "Fair",
  },
  {
    id: "item2",
    productId: "p2",
    name: "Multi-Use Cream Blush",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1596704147170-a87a3827628c?auto=format&fit=crop&q=80",
    quantity: 1,
    variant: "Coral",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const shippingCost = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shippingCost;
  
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  
  const handleCheckout = () => {
    // Checkout logic would go here
    console.log("Proceeding to checkout with items:", cartItems);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center text-gray-800">
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <h1 className="text-lg font-bold">Your Cart</h1>
          <div className="w-6"></div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-3xl px-4 py-6">
        {cartItems.length > 0 ? (
          <>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 border-b border-gray-100 pb-2">
                <h2 className="text-lg font-medium text-gray-900">
                  Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                </h2>
              </div>
              
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    variant={item.variant}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-gray-900">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="mt-6 w-full bg-poppy-pink text-foreground py-6 hover:bg-poppy-pink/90"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-80 flex-col items-center justify-center rounded-lg bg-white p-8 shadow-sm">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="mb-2 text-xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mb-6 text-center text-gray-600">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/">
              <Button className="bg-poppy-pink text-foreground hover:bg-poppy-pink/90">
                Explore Products
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Navbar />
    </div>
  );
};

export default Cart;
