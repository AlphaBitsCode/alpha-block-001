
import React, { useEffect, useRef, useState } from "react";

interface VideoFeedProps {
  streamUrl?: string;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultStreamUrl = streamUrl || "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;

    // Configure video stream
    const configureVideoStream = async () => {
      try {
        if ('srcObject' in videoElement) {
          try {
            // Attempt to load the video
            videoElement.src = defaultStreamUrl;
            
            videoElement.onloadeddata = () => {
              setIsLoading(false);
            };
            
            videoElement.onerror = () => {
              setError("Failed to load video stream");
              // Fall back to test pattern
              setIsLoading(false);
            };
            
            videoElement.load();
            videoElement.play().catch(e => {
              console.error("Video playback failed:", e);
              setError("Video playback failed. Please check your connection.");
            });
          } catch (err) {
            console.error("Error setting up video:", err);
            setError("Error setting up video stream");
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access camera");
        setIsLoading(false);
      }
    };

    configureVideoStream();

    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
      }
    };
  }, [defaultStreamUrl]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="animate-pulse text-white text-xl">Loading video feed...</div>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4">
          <div className="mb-4 text-xl text-red-400">{error}</div>
          <div className="w-full max-w-md h-48 bg-gray-800 rounded-md flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📹</div>
              <div>Video feed unavailable</div>
              <div className="text-sm mt-2 text-gray-500">Using mock background</div>
            </div>
          </div>
        </div>
      )}
      
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay 
        playsInline
        muted
        loop
      />
      
      {/* Fallback background in case video fails to load */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 -z-10"
        style={{
          backgroundImage: "url('/lovable-uploads/0c9d9da8-7161-4586-9d26-7e5198d297ad.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </div>
  );
};

export default VideoFeed;
