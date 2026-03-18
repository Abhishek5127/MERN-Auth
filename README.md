# MERN-Auth

MERN authentication is a simple developing project which stores user's data like email, name, passwords and then stores them in database (MongoDB Atlas). It performs functions like signup, login, reset password and many more.

## Features

- User registration and authentication
- Email verification system
- Password reset functionality
- JWT-based authentication
- MongoDB Atlas integration
- Nodemailer for email services
- React frontend with Vite
- Express.js backend

## Tech Stack

- **Frontend**: React 19.1.1, Vite, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Security**: bcryptjs for password hashing

## Installation

### Prerequisites

- Node.js installed on your system
- MongoDB Atlas account (or local MongoDB instance)
- Email service credentials for Nodemailer

### Setup

1. Clone the repository:
bash
git clone https://github.com/abhishek5127/MERN-Auth.git
cd MERN-Auth


2. Install server dependencies:
bash
cd server
npm install


3. Install client dependencies:
bash
cd ../client/mern-auth-app
npm install


4. Configure environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Set up your MongoDB connection string
   - Configure your email service credentials for Nodemailer

## Usage

### Starting the Server

bash
cd server
npm run server


### Starting the Client

bash
cd client/mern-auth-app
npm run dev


### Available Scripts

**Server:**
- `npm start` - Start the server with Node.js
- `npm run server` - Start the server with nodemon for development

**Client:**
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Project Structure


MERN-Auth/
├── server/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Authentication middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── config/              # Configuration files
│   ├── templates/           # Email templates
│   ├── server.js            # Main server file
│   └── package.json
└── client/mern-auth-app/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/          # Page components
    │   ├── assets/         # Static assets
    │   ├── context/        # React context
    │   ├── css/           # Stylesheets
    │   └── main.jsx        # Entry point
    ├── public/
    ├── package.json
    └── vite.config.js


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project does not specify a license. Please contact the repository owner for usage permissions.