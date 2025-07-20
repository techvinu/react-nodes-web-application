import React from 'react';
import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">React Nodes</h3>
            <p className="text-gray-600 text-sm">
              A production-ready full-stack web application built with React and Node.js.
              Featuring modern development practices and security best practices.
            </p>
          </div>

          {/* Links section */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>React Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://nodejs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>Node.js Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://expressjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>Express.js Guide</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Tech stack section */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18',
                'Node.js',
                'Express.js',
                'React Query',
                'React Router',
                'Axios',
                'Winston',
                'Docker'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by techvinu</span>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/techvinu/react-nodes-web-application"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 text-sm"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
              
              <span className="text-gray-400 text-sm">
                © {currentYear} React Nodes App
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
