import Image from 'next/image';

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <div className="relative mb-12">
        <Image 
          src="/symbol.png" 
          alt="ByterVerse Logo" 
          width={120} 
          height={120}
          className="relative z-10"
        />
      </div>      
      <p className="text-primary text-lg font-medium mt-6 flex items-center space-x-1">
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