
import React, { useEffect, useState } from "react";

interface VideoFeedProps {
  streamUrl?: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ streamUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("https://lakeview.secondbrains.tech/cam/office_3.jpg");
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    // Set initial image
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      console.error("Failed to load image");
      setError("Failed to load image");
      setIsLoading(false);
    };
    img.src = imageUrl + "?t=" + timestamp;

    // Set up refresh interval (30 seconds)
    const refreshInterval = setInterval(() => {
      setTimestamp(Date.now());
    }, 30000); // 30 seconds

    return () => {
      clearInterval(refreshInterval);
    };
  }, [imageUrl]);

  // Update the image when timestamp changes
  useEffect(() => {
    const refreshImage = async () => {
      setIsLoading(true);
      try {
        const img = new Image();
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
          setError("Failed to load image");
          setIsLoading(false);
        };
        img.src = imageUrl + "?t=" + timestamp;
      } catch (err) {
        console.error("Error refreshing image:", err);
        setError("Error refreshing image");
        setIsLoading(false);
      }
    };

    refreshImage();
  }, [timestamp, imageUrl]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Improved vignette effect overlay - heavier at the edges, z-index below widgets */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 180px 80px rgba(0, 0, 0, 0.85)",
        background: "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.85) 95%)"
      }}></div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="animate-pulse text-white text-xl">Loading feed...</div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 z-10">
          <div className="mb-4 text-xl text-red-400">{error}</div>
          <div className="w-full max-w-md h-48 bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📷</div>
              <div>Image feed unavailable</div>
              <div className="text-sm mt-2 text-gray-500">Using mock background</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Image element to display the feed */}
      <img
        src={`${imageUrl}?t=${timestamp}`}
        alt="Live feed"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ display: isLoading || error ? 'none' : 'block' }}
      />
      
      {/* Center focus square overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[60vh] h-[60vh] border border-white/20 rounded-md"></div>
        </div>
      </div>
      
      {/* Fallback background in case image fails to load */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 -z-10"
        style={{
          backgroundImage: "url('https://lakeview.secondbrains.tech/cam/office_4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </div>
  );
};

export default VideoFeed;
