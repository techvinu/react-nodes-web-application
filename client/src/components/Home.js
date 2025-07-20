import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Shield, 
  Zap, 
  Code, 
  Users, 
  ArrowRight,
  CheckCircle,
  Github,
  ExternalLink
} from 'lucide-react';

const Home = ({ healthData }) => {
  const features = [
    {
      icon: Server,
      title: 'Full-Stack Architecture',
      description: 'Complete React frontend with Node.js/Express backend, ready for production deployment.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built-in security with CORS, Helmet, rate limiting, and input validation.'
    },
    {
      icon: Zap,
      title: 'Modern Development',
      description: 'Hot reload, ESLint, Prettier, and comprehensive testing setup included.'
    },
    {
      icon: Code,
      title: 'Production Ready',
      description: 'Docker support, logging, error handling, and environment configuration.'
    }
  ];

  const techStack = [
    { name: 'React 18', description: 'Modern frontend framework' },
    { name: 'Node.js', description: 'JavaScript runtime' },
    { name: 'Express.js', description: 'Web application framework' },
    { name: 'React Query', description: 'Data fetching library' },
    { name: 'Winston', description: 'Logging library' },
    { name: 'Docker', description: 'Containerization' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              React + Node.js
              <span className="block text-blue-600">Web Application</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A production-ready full-stack web application built with modern technologies 
              and best practices. Secure, scalable, and developer-friendly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/users"
                className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>View Users</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href="https://github.com/techvinu/react-nodes-web-application"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-lg px-8 py-3 flex items-center justify-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>View Source</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Server Status */}
            {healthData && (
              <div className="mt-8 inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Server Online • Uptime: {Math.floor(healthData.data.uptime / 60)}m
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Production
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature is designed with scalability, security, and maintainability in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with the latest and most reliable technologies in the JavaScript ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore the user management system or check out the source code to see how it's built.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/users"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Explore Users</span>
            </Link>
            
            <a
              href="https://github.com/techvinu/react-nodes-web-application"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View Code</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
