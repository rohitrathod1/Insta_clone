# 📸 Insta Clone – MERN Stack Social Media App

A full-stack Instagram Clone built using the **MERN (MongoDB, Express, React, Node.js) stack** with **Socket.io** for real-time messaging.  
This application allows users to **register, post photos, like, comment, follow/unfollow, and chat in real time** with a modern responsive UI.

---

## 🚀 Features

- 🔐 **User Authentication:** Register, Login, Logout using JWT and Cookies  
- 🧑‍🤝‍🧑 **Follow / Unfollow Users**  
- 🖼️ **Post Photos** with captions  
- 💬 **Comment System** with instant updates  
- ❤️ **Like / Unlike Posts** (real-time updates)  
- 💬 **Real-Time Chat** using Socket.io  
- 🌓 **Dark Mode UI** built with Tailwind CSS  
- 📱 **Fully Responsive Design** (Mobile, Tablet, Desktop)  
- ⚙️ **Backend APIs** for users, posts, and messages  
- ☁️ **Deployed frontend and backend** on a single server  

---

## 🧩 Screenshots

**Login Page**  
![Login Page](./screenshots/login.png)  

**Home Feed**  
![Home Feed](./screenshots/home.png)  

**Profile Page**  
![Profile Page](./screenshots/profile.png)  

**Real-Time Chat**  
![Chat](./screenshots/chat.png)  

> Note: Replace image paths with your actual screenshots in the `screenshots/` folder.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Redux Toolkit  
- Tailwind CSS  
- Axios  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.io  
- Cookie-Parser  
- CORS  
- Dotenv  

---

## ⚙️ Project Structure

insta_clone/
├── backend/
│ ├── index.js
│ ├── routes/
│ ├── utils/
│ └── socket/
├── frontend/
│ ├── src/
│ ├── dist/ (after build)
│ └── package.json
├── screenshots/
│ ├── login.png
│ ├── home.png
│ ├── profile.png
│ └── chat.png
└── package.json

🌐 Deployment

Backend serves the frontend build automatically using Express.

Access both API endpoints and frontend UI from the same base URL after deployment.

💡 Future Enhancements

Add notifications for likes and comments

Implement image compression and cloud storage (Cloudinary)

Add stories and reels section

Improve real-time performance

👨‍💻 Author

Rohit Rathod
💼 Full Stack Web Developer (MERN)
📧 [Your Email Here]
🌐 [Your Portfolio or LinkedIn Here]
