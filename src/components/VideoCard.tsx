
import { useState } from "react";
import { Heart, ShoppingBag, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface VideoCardProps {
  id: string;
  videoUrl: string;
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
  };
  description: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

const VideoCard = ({ id, videoUrl, thumbnail, creator, description, product }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Thumbnail shown until video is ready */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${thumbnail})` }}></div>
      )}
      
      {/* Video */}
      <video
        id={`video-${id}`}
        src={videoUrl}
        className={cn("w-full h-full object-cover", videoLoaded ? "opacity-100" : "opacity-0")}
        loop
        onClick={togglePlay}
        onLoadedData={handleVideoLoaded}
      />
      
      {/* Overlay for controls */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"
        onClick={togglePlay}
      >
        {/* Play/Pause indicator (only shows briefly) */}
        {isPlaying ? null : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-16 border-t-transparent border-b-transparent border-l-white ml-1"></div>
            </div>
          </div>
        )}
        
        {/* Video info */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center mb-2">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <span className="ml-2 text-white font-medium text-shadow">{creator.name}</span>
          </div>
          <p className="text-white text-sm mb-2 text-shadow line-clamp-2">{description}</p>
          
          {/* Product info */}
          <Link to={`/product/${product.id}`} className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 mt-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1">
              <p className="text-white font-medium text-shadow">{product.name}</p>
              <p className="text-white/80 text-sm text-shadow">${product.price.toFixed(2)}</p>
            </div>
            <button className="bg-poppy-pink text-foreground p-2 rounded-full ml-2">
              <ShoppingBag size={18} />
            </button>
          </Link>
        </div>
        
        {/* Right side actions */}
        <div className="absolute right-4 bottom-32 flex flex-col space-y-4">
          <button 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm",
              isLiked ? "bg-poppy-pink text-white" : "bg-black/20 text-white"
            )}
            onClick={toggleLike}
          >
            <Heart size={20} fill={isLiked ? "white" : "none"} className={isLiked ? "animate-heart-beat" : ""} />
          </button>
          
          <button className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white">
            <Share size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
