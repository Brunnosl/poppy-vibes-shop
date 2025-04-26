
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Share2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

// Sample product data
const sampleProduct = {
  id: "p1",
  name: "Glow Foundation SPF 30",
  description: "A lightweight, hydrating foundation with SPF 30 that gives your skin a natural, dewy glow. Perfect for all skin types, especially dry to normal.",
  price: 42.99,
  images: [
    "https://images.unsplash.com/photo-1596704017254-9b5e3d5c0a1a?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596704147170-a87a3827628c?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596704129662-3ce19c8b817a?auto=format&fit=crop&q=80",
  ],
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-makeup-facing-a-small-mirror-39655-large.mp4",
  colors: [
    { name: "Fair", value: "#F5DBCB" },
    { name: "Light", value: "#E8C9B0" },
    { name: "Medium", value: "#D8B397" },
    { name: "Tan", value: "#C29A80" },
    { name: "Deep", value: "#9A7056" },
  ],
  reviews: [
    {
      id: "r1",
      user: { name: "Emily J.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
      rating: 5,
      date: "2 weeks ago",
      comment: "I love this foundation! It gives me the perfect dewy finish without looking greasy. The SPF is a huge bonus.",
    },
    {
      id: "r2",
      user: { name: "Melissa T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" },
      rating: 4,
      date: "1 month ago",
      comment: "Great coverage and feels lightweight. I would give 5 stars but it could last a bit longer throughout the day.",
    },
  ],
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
};

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(sampleProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log("Added to cart:", {
      product: sampleProduct,
      color: selectedColor,
      quantity,
    });
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <div className="relative bg-white">
        {/* Back button */}
        <div className="absolute left-4 top-4 z-10">
          <Link to="/" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
            <ArrowLeft size={18} />
          </Link>
        </div>
        
        {/* Action buttons */}
        <div className="absolute right-4 top-4 z-10 flex space-x-2">
          <button 
            onClick={toggleLike}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm",
              isLiked && "text-poppy-pink"
            )}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
            <Share2 size={18} />
          </button>
        </div>
        
        {/* Product image slider */}
        <div className="relative aspect-square w-full overflow-hidden">
          {showVideo ? (
            <video 
              src={sampleProduct.videoUrl} 
              className="h-full w-full object-cover"
              controls
              autoPlay
            />
          ) : (
            <img 
              src={sampleProduct.images[selectedImage]} 
              alt={sampleProduct.name} 
              className="h-full w-full object-cover" 
            />
          )}
          
          {/* Video button overlay */}
          {!showVideo && (
            <button 
              className="absolute bottom-4 right-4 flex items-center space-x-2 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm"
              onClick={toggleVideo}
            >
              <Play size={14} fill="white" />
              <span>Watch Video</span>
            </button>
          )}
          
          {/* Thumbnail navigation */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {sampleProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index);
                  setShowVideo(false);
                }}
                className={cn(
                  "h-12 w-12 overflow-hidden rounded-md border-2 transition-all",
                  selectedImage === index && !showVideo
                    ? "border-poppy-pink"
                    : "border-white/50"
                )}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="h-full w-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Product details */}
      <div className="px-4 py-6">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{sampleProduct.name}</h1>
          <span className="text-xl font-bold text-gray-900">${sampleProduct.price.toFixed(2)}</span>
        </div>
        
        {/* Rating */}
        <div className="mb-4 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={cn(
                  "h-4 w-4", 
                  i < Math.floor(sampleProduct.rating) ? "text-yellow-400" : "text-gray-300"
                )}
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {sampleProduct.rating} ({sampleProduct.reviewCount} reviews)
            </span>
          </div>
        </div>
        
        {/* Color selection */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-medium text-gray-900">Shade</h3>
          <div className="flex flex-wrap gap-2">
            {sampleProduct.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2",
                  selectedColor.name === color.name 
                    ? "border-poppy-pink" 
                    : "border-transparent"
                )}
              >
                <span 
                  className="h-10 w-10 rounded-full" 
                  style={{ backgroundColor: color.value }}
                ></span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">Selected: {selectedColor.name}</p>
        </div>
        
        {/* Quantity */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-medium text-gray-900">Quantity</h3>
          <div className="flex w-32 items-center rounded-md border border-gray-300">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)}
              className="flex h-10 w-10 items-center justify-center text-gray-600"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="flex h-10 w-10 items-center justify-center border-x border-gray-300 text-center">
              {quantity}
            </span>
            <button 
              onClick={() => handleQuantityChange(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center text-gray-600"
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>
        
        {/* Add to cart button */}
        <Button 
          onClick={handleAddToCart}
          className="mt-2 w-full bg-poppy-pink text-foreground py-6 hover:bg-poppy-pink/90"
        >
          <ShoppingBag className="mr-2" size={18} />
          Add to Cart
        </Button>
        
        {/* Product tabs */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-gray-700">
              {sampleProduct.description}
            </p>
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-sm text-gray-500">Formulation</span>
                <span className="text-sm">Liquid</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-sm text-gray-500">Skin Type</span>
                <span className="text-sm">All Types</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-sm text-gray-500">Coverage</span>
                <span className="text-sm">Medium, Buildable</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-sm text-gray-500">Finish</span>
                <span className="text-sm">Dewy</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Size</span>
                <span className="text-sm">30ml / 1 fl oz</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {sampleProduct.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={review.user.avatar} 
                        alt={review.user.name} 
                        className="h-10 w-10 rounded-full object-cover" 
                      />
                      <div className="ml-3">
                        <p className="font-medium">{review.user.name}</p>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={cn(
                                  "h-3.5 w-3.5", 
                                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                                )}
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Product;
