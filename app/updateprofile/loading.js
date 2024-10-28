import React from "react";
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-bounce">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-2"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      );
  }