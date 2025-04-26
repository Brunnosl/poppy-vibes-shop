
import { useState, useRef, useEffect } from "react";
import VideoCard from "./VideoCard";

// Sample data for videos
const sampleVideos = [
  {
    id: "1",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-makeup-facing-a-small-mirror-39655-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1596704017254-9b5e3d5c0a1a?auto=format&fit=crop&q=80",
    creator: {
      name: "BeautyByJulia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    },
    description: "My go-to foundation routine for summer! This product gives the perfect dewy finish without feeling heavy.",
    product: {
      id: "p1",
      name: "Glow Foundation SPF 30",
      price: 42.99,
    },
  },
  {
    id: "2",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-putting-cream-blush-on-cheekbones-and-lips-701-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1596704147170-a87a3827628c?auto=format&fit=crop&q=80",
    creator: {
      name: "MakeupByAlex",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    },
    description: "This cream blush is a game changer! One product for cheeks and lips that lasts all day.",
    product: {
      id: "p2",
      name: "Multi-Use Cream Blush",
      price: 24.99,
    },
  },
  {
    id: "3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-having-her-makeup-done-by-artist-39654-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1596704129662-3ce19c8b817a?auto=format&fit=crop&q=80",
    creator: {
      name: "GlamWithSam",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
    },
    description: "Professional makeup tips for your next special event. This setting spray will keep everything in place all night!",
    product: {
      id: "p3",
      name: "Long-Lasting Setting Spray",
      price: 32.50,
    },
  },
];

const VideoFeed = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show one video at a time
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoElement = entry.target.querySelector("video");
            if (videoElement) {
              videoElement.play().catch((error) => {
                console.error("Error playing video:", error);
              });
              
              // Get the index from the data attribute
              const index = Number(entry.target.getAttribute("data-index"));
              setCurrentVideoIndex(index);
            }
          } else {
            const videoElement = entry.target.querySelector("video");
            if (videoElement) {
              videoElement.pause();
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7, // At least 70% of the item must be visible
      }
    );

    const feedItems = document.querySelectorAll(".video-feed-item");
    feedItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      feedItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="w-full video-feed-container overflow-y-scroll snap-y snap-mandatory" ref={feedRef}>
      {sampleVideos.map((video, index) => (
        <div 
          key={video.id} 
          className="w-full h-full snap-start snap-always video-feed-item"
          data-index={index}
        >
          <VideoCard {...video} />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
