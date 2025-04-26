
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
}

const ProductCard = ({ id, name, price, image, rating, reviewCount, isNew = false }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          
          {/* New badge */}
          {isNew && (
            <div className="absolute left-2 top-2 rounded-full bg-poppy-pink px-2 py-1 text-xs font-medium text-white">
              New
            </div>
          )}
          
          {/* Like button */}
          <button 
            className={cn(
              "absolute right-2 top-2 rounded-full p-1.5 transition-colors",
              isLiked 
                ? "bg-poppy-pink text-white" 
                : "bg-white/80 text-gray-600 hover:bg-white"
            )}
            onClick={toggleLike}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          {/* Quick add button */}
          <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-between bg-white/95 p-3 transition-transform duration-300 group-hover:translate-y-0">
            <span className="text-sm font-semibold">${price.toFixed(2)}</span>
            <button 
              className="rounded-full bg-poppy-pink p-2 text-white transition-transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to cart logic
              }}
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-3">
          <h3 className="mb-1 font-medium text-gray-800 line-clamp-1">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={cn(
                    "h-3.5 w-3.5", 
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  )}
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
