# BrainCanvas

**BrainCanvas** is a full-stack note-taking web application built with React, Node.js, Express, and MongoDB. It allows users to securely create, edit, delete, pin, and search notes, supporting both traditional email/password login and social logins (Google & Facebook).

## Project Overview
BrainCanvas helps users manage their notes efficiently with features like:
- User authentication using JWT and OAuth (Google & Facebook)
- Create, edit, delete, and pin notes
- Search notes by title or tags
- Responsive and modern UI with React and Tailwind CSS
- Secure backend with Express and MongoDB
  
The application demonstrates a complete frontend-backend integration workflow using REST APIs and state management.

## How the Application Works

### Frontend (React)

- Handles user interactions and renders UI components.
- Stores authentication tokens in localStorage and includes them in requests to secure backend endpoints.
- Uses React state (useState) to manage notes, search queries, modal visibility (openAddEditModal), and toast notifications.
- Filters notes locally with the search bar for a fast user experience.

### Backend (Express + MongoDB)

- Serves REST API endpoints for authentication, user info, and note management.
- Uses JWT tokens to authenticate requests and Passport.js for social login.
- Handles database operations using Mongoose models.

### Authentication Flow

- Email/password login issues a JWT token stored on the frontend.
- Google/Facebook OAuth redirects return a JWT token in the URL, which React stores automatically.
- Every protected route validates the token before allowing access.

### Notes Management

- Notes are fetched and stored in React state.
- Adding, editing, deleting, or pinning notes triggers API requests, updates MongoDB, and refreshes the state.
- The search bar filters notes in real-time without extra backend calls.

## Tech Stack

- Frontend: React, Tailwind CSS, React Router, Lucide Icons
- Backend: Node.js, Express, MongoDB, Mongoose, Passport.js
- Authentication: JWT, Google OAuth, Facebook OAuth

<img width="1919" height="943" alt="Image" src="https://github.com/user-attachments/assets/d7797103-973f-463e-bcd6-1f75ea5619e1" />
<img width="1914" height="943" alt="Image" src="https://github.com/user-attachments/assets/f5e41967-d546-4fa8-b12c-b0c2f0092bed" />
