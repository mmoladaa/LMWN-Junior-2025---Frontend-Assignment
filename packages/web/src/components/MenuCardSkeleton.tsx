import React from "react";

const MenuCardSkeleton = () => {
  return (
    <div className="flex items-center p-2 bg-white animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>

      {/* Content skeleton */}
      <div className="ml-3 flex-1">
        {/* Name skeleton */}
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>

        {/* Price skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default MenuCardSkeleton;
