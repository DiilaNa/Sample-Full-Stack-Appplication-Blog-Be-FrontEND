# Smart Blog - Frontend

Smart Blog is a modern, full-stack blogging platform where users can seamlessly share their thoughts, engage with content, and manage their personal profile. This project focuses on high performance, clean UI/UX, and secure user interactions.

## 🚀 Features

- **User Authentication**: Secure Sign-up and Login system with JWT-based authentication
- **Create**: Users can create their blog posts
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop views
- **Role-based Access**: Different permissions for regular users, authors, and administrators

## 🛠 Technologies Used

### Frontend
- **React.js**: For building a fast, component-based user interface
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For modern, utility-first styling
- **React Router DOM**: For client-side routing and navigation
- **Axios**: For handling API requests to the backend
- **Vite**: For fast development build tool

### Backend (External API)
- **Node.js & Express**: The backbone of the server-side logic and routing
- **MongoDB**: For secure and scalable data storage
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization

## 📸 Screenshots

> Note: Add your screenshots inside a folder named `screenshots` in your repository to make these links work!

### Home Page
![Home Page](/public/screenshots/welcome.png)

### Login Page
![Login Page](/public/screenshots/login.png)

### Create Post
![Create Post](/public/screenshots/myfeed.png)

### All Posts
![All Posts](/public/screenshots/feed.png)

## 🔗 Project Links

- **Frontend Repository**: [Smart Blog Frontend](https://github.com/DiilaNa/Sample-Full-Stack-Appplication-Blog-Be-FrontEND.git)
- **Backend Repository**: [Smart Blog Backend](https://github.com/your-username/smart-blog-backend)
- **Live Demo**: [View Live Site](https://sample-full-stack-appplication-blog-five.vercel.app/)

## ⚙️ Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### 1. Clone the repository
```bash
git clone https://github.com/DiilaNa/smart-blog-frontend.git
cd smart-blog-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
VITE_API_BASE_URL=https://sample-full-stack-appplication-blog.vercel.app/api/v1
```

### 4. Run the development server
```bash
npm run dev
```

The app should now be running at http://localhost:5173 (or your Vite development port).

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── Layout.tsx       # Main layout wrapper
│   └── ...
├── context/             # React context providers
│   └── authContext.tsx  # Authentication context
├── Pages/               # Page components
│   ├── HomePage.tsx     # Home page with posts
│   ├── LoginPage.tsx    # User login
│   ├── Post.tsx         # Post management page
│   ├── RegisterPage.tsx # User registration
│   └── WelcomePage.tsx  # Welcome/landing page
├── Routes/              # Routing configuration
│   └── index.tsx        # Main router
├── services/            # API services
│   ├── Post.ts          # Post-related API calls
│   ├── api.ts           # Axios configuration
│   └── auth.ts          # Authentication services
├── App.tsx              # Main application component
└── main.tsx             # Entry point
```

## 🧭 Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in the development mode


## 🔐 Authentication Flow

The application uses JWT-based authentication with refresh token rotation:

1. User logs in with credentials
2. Server returns access and refresh tokens
3. Access token is stored in localStorage and used for API requests
4. When access token expires, refresh token is used to get a new access token
5. If refresh token is invalid, user is redirected to login

## 📊 API Endpoints

The frontend communicates with the backend API at `https://sample-full-stack-appplication-blog.vercel.app/api/v1`:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `GET /post` - Get all posts with pagination
- `POST /post/create` - Create a new post
- `GET /user/my-details` - Get current user details

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Dilan Liyanaarachchi - liyanaarachchidilan@gmail.com

Project Link: https://sample-full-stack-appplication-blog-five.vercel.app/

## 🙏 Acknowledgements

- [React](https://reactjs.org/) - The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Axios](https://github.com/axios/axios) - Promise based HTTP client