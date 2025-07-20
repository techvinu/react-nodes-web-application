# React + Node.js Web Application

A production-ready full-stack web application built with React frontend and Node.js/Express backend.

## Features

- **Frontend**: React 18 with modern hooks and functional components
- **Backend**: Node.js with Express.js REST API
- **Security**: CORS, Helmet, Rate limiting, Input validation
- **Development**: Hot reload, ESLint, Prettier
- **Production**: Docker support, Environment configuration
- **Testing**: Jest for both frontend and backend
- **Logging**: Winston for structured logging

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/techvinu/react-nodes-web-application.git
cd react-nodes-web-application
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

### Development

Start both frontend and backend in development mode:
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

### Docker

1. Build and run with Docker Compose:
```bash
npm run docker:up
```

2. Stop containers:
```bash
npm run docker:down
```

## Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── App.js         # Main App component
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   ├── middleware/        # Custom middleware
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── app.js             # Express application
│   └── package.json       # Backend dependencies
├── docker-compose.yml     # Docker configuration
└── package.json           # Root package.json
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run all tests
- `npm run lint` - Run linting
- `npm run docker:up` - Start with Docker

## Environment Variables

### Server (.env)
```
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

## License

MIT License - see LICENSE file for details.
