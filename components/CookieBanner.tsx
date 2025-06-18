import React from 'react';
import Link from 'next/link';

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
  onLearnMore?: () => void; // Kept for type consistency, but Link is preferred
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-slate-900 text-slate-200 p-4 shadow-lg z-50 flex flex-col sm:flex-row justify-between items-center"
      role="region"
      aria-label="Cookie Consent Banner"
    >
      <p className="text-sm mb-3 sm:mb-0 sm:mr-4">
        We use cookies to enhance your experience. By clicking "Accept", you agree to our use of cookies.
        <Link href="/cookie" legacyBehavior>
            <a 
                className="text-emerald-400 hover:text-emerald-300 underline ml-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                aria-label="Learn more about our cookie policy"
            >
                Learn More
            </a>
        </Link>
      </p>
      <div className="flex-shrink-0 flex gap-x-2">
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 transition-colors"
          aria-label="Accept cookies"
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-colors"
          aria-label="Decline cookies"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
