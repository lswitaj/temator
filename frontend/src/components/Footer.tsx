import React from 'react';
import { Github, Headphones, Mic } from 'lucide-react';
import { STRINGS } from '../strings';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Mic className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-gray-400">{STRINGS.footer.copyright}</span>
        </div>
        
        <div className="flex space-x-6">
          <a 
            href="#" 
            className="text-gray-400 hover:text-red-400 transition-colors"
            aria-label={STRINGS.footer.githubLabel}
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-red-400 transition-colors"
            aria-label={STRINGS.footer.musicLabel}
          >
            <Headphones className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;