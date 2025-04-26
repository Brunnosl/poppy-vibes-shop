
import { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ 
  id, 
  image, 
  name, 
  price, 
  quantity, 
  variant, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    } else {
      handleRemove();
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    // Animate out before removal
    setTimeout(() => {
      onRemove(id);
    }, 300);
  };

  return (
    <div 
      className={`flex items-start border-b border-gray-100 py-4 transition-opacity duration-300 ${
        isRemoving ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Product image */}
      <Link to={`/product/${id}`} className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover" 
        />
      </Link>
      
      {/* Product details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${id}`} className="text-base font-medium text-gray-800 hover:text-poppy-pink">
              {name}
            </Link>
            {variant && (
              <p className="mt-1 text-sm text-gray-500">{variant}</p>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center rounded-lg border border-gray-200">
            <button 
              onClick={handleDecrement}
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-poppy-pink"
            >
              <Minus size={16} />
            </button>
            <span className="flex h-8 w-8 items-center justify-center text-sm">
              {quantity}
            </span>
            <button 
              onClick={handleIncrement}
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-poppy-pink"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Remove button */}
          <button 
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
