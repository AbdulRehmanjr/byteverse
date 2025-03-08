import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Logo container with glow effect */}
      <div className="relative mb-12">
        <Image 
          src="/symbol.png" 
          alt="ByterVerse Logo" 
          width={120} 
          height={120}
          className="relative z-10"
        />
      </div>
      
      {/* Dual spinning loader */}
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin"></div>
        <div className="h-12 w-12 rounded-full border-4 border-b-blue-500 border-l-blue-500 border-t-transparent border-r-transparent animate-spin-slow absolute inset-0"></div>
      </div>
      
      {/* Loading text with staggered animation */}
      <p className="text-gray-400 text-sm font-medium mt-6 flex items-center space-x-1">
        <span className="inline-block opacity-0 animate-fade-in delay-100">L</span>
        <span className="inline-block opacity-0 animate-fade-in delay-200">o</span>
        <span className="inline-block opacity-0 animate-fade-in delay-300">a</span>
        <span className="inline-block opacity-0 animate-fade-in delay-400">d</span>
        <span className="inline-block opacity-0 animate-fade-in delay-500">i</span>
        <span className="inline-block opacity-0 animate-fade-in delay-600">n</span>
        <span className="inline-block opacity-0 animate-fade-in delay-700">g</span>
        <span className="inline-block opacity-0 animate-fade-in delay-800">.</span>
        <span className="inline-block opacity-0 animate-fade-in delay-900">.</span>
        <span className="inline-block opacity-0 animate-fade-in delay-1000">.</span>
      </p>
    </div>
  );
}