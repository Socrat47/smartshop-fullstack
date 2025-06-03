# 🛒 SmartShop – Graduation Project

**SmartShop** is a modern e-commerce platform developed as a graduation project. The project is divided into three main parts:

- ✅ Backend – TypeScript, Express, MongoDB, Prisma
- ✅ Web Frontend – React, TailwindCSS, PrimeReact
- 📱 Mobile App – React Native (in a separate repository) → [smartshop-mobile](https://github.com/Socrat47/smartshop-mobile.git)

> This repository contains the **Backend** and **Web Frontend** only.

---

## 📁 Project Structure

```
SmartShopFull/
├── backend/       # RESTful API (TypeScript, Express)
└── frontend/      # Web interface (React, TailwindCSS, PrimeReact)
```

---

## 🚀 Technologies Used

### 🧩 Backend
- **TypeScript** – Strongly-typed and maintainable server code
- **Express.js** – Lightweight Node.js web framework
- **MongoDB** – NoSQL database for flexibility and scalability
- **Prisma** – Type-safe ORM for MongoDB
- **JWT (jsonwebtoken)** – Secure authentication and session management
- **bcrypt** – Password hashing
- **Multer** – File/image uploading middleware

### 🎨 Frontend (Web)
- **React** – Component-based UI development
- **Tailwind CSS** – Utility-first CSS framework for styling
- **PrimeReact** – Rich UI components like forms, tables, and modals
- **React Router** – Multi-page routing system
- **Zustand** – Lightweight global state management (used for cart and auth)
- **Axios** – For making HTTP requests to the backend
- **JSX** – JavaScript + HTML syntax extension

### 📱 Mobile App (Separate Repo)
- **React Native** – Cross-platform mobile development
- **TypeScript (TSX)** – Type-safe mobile code
- 🔗 [smartshop-mobile GitHub Repo](https://github.com/Socrat47/smartshop-mobile.git)

---

## ⚙️ Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

> Make sure to define your MongoDB URI in a `.env` file.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> The frontend requires an `.env` file with the backend API base URL.

---

## 🔐 User Roles

- 👤 **User:** Browse products, manage cart, place orders
- 🛠️ **Admin:** Add/delete products, manage users and orders

---

## 🧠 Features

- 🔐 JWT-based login and access control
- 🛒 Cart management with Zustand
- 🔍 Product listing, filtering, and detail pages
- 📤 Product image uploading (via Multer)
- 🧾 Order creation and tracking
- ⚙️ Admin panel for product CRUD operations

---

## 📱 Mobile App

The mobile application is maintained in a separate repository:

➡️ [smartshop-mobile (GitHub)](https://github.com/Socrat47/smartshop-mobile.git)

---

## 👨‍💻 Author
- **GitHub:** [@Socrat47](https://github.com/Socrat47)

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
