import React from 'react';

interface BannerAreaProps {
  imageUrl?: string;
}

const BannerArea: React.FC<BannerAreaProps> = ({ imageUrl }) => {
  // Default banner if none provided
  const defaultBanner = "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1080";
  
  return (
    <div className="banner-container relative h-[270px] w-full max-w-[1080px] mx-auto overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/70 to-red-900/70 z-10"></div>
      <img 
        src={imageUrl || defaultBanner} 
        alt="Freestyle Battle Banner" 
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
          Freestyle Battle
        </h1>
      </div>
    </div>
  );
};

export default BannerArea