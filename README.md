# Full-Stack Next.js Dashboard with Authentication

A complete full-stack web application built with the Next.js App Router. This project features a modern tech stack and includes user authentication, a protected dashboard, full CRUD functionality for notes, and user profile management.

---

## 📸 Screenshots

* **Login Page**
    
* **Dashboard**
    
<img src="assets/Screenshot 2025-10-02 002302.png" alt="dashboard" width="200" height="200">


* **Profile Page**
    

---

## ✨ Core Features

* **User Authentication**: Secure user signup and login functionality using JWT (JSON Web Tokens).
* **Protected Routes**: Middleware to protect sensitive routes (like the dashboard) from unauthorized access.
* **Full CRUD Functionality**: Users can Create, Read, Update, and Delete their own notes.
* **Profile Management**: Users can view and update their profile information.
* **Responsive Design**: A clean and modern UI built with Tailwind CSS that works on all devices.
* **API Layer**: A complete backend API built with Next.js Route Handlers.
* **Database Integration**: MongoDB integration using Mongoose for data persistence.

---

## 🛠️ Tech Stack

* **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend**: [Next.js](https://nextjs.org/) (Route Handlers), [Mongoose](https://mongoosejs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/)
* **Authentication**: [JWT](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* **API Client**: [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a connection string from MongoDB Atlas.

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd your-repo-name
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up environment variables**
    Create a file named `.env.local` in the root of your project and add the following variables.
    ```env
    # Your MongoDB connection string
    MONGODB_URI="your_mongodb_connection_string"

    # A strong, random secret for signing JWTs
    JWT_SECRET="your_jwt_secret_key"
    ```
5.  **Run the development server**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🗺️ API Endpoints

The application includes the following API endpoints, built with Next.js Route Handlers.

| Method | Endpoint                 | Description                     | Protected |
| :----- | :----------------------- | :------------------------------ | :-------: |
| `POST` | `/api/auth/signup`       | Register a new user             |    No     |
| `POST` | `/api/auth/login`        | Log in a user and get a token   |    No     |
| `GET`  | `/api/auth/logout`       | Log out a user                  |    No     |
| `GET`  | `/api/user/profile`      | Get the logged-in user's profile|    Yes    |
| `PUT`  | `/api/user/profile`      | Update the user's profile       |    Yes    |
| `POST` | `/api/notes`             | Create a new note               |    Yes    |
| `GET`  | `/api/notes`             | Get all notes for the user      |    Yes    |
| `PUT`  | `/api/notes/[noteId]`    | Update a specific note          |    Yes    |
| `DELETE`| `/api/notes/[noteId]`    | Delete a specific note          |    Yes    |

---