
import Navbar from "@/components/Navbar";
import VideoFeed from "@/components/VideoFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg h-screen relative">
        <div className="pt-0 md:pt-16 pb-16 md:pb-0 flex flex-col h-full">
          <VideoFeed />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Index;
