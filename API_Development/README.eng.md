# 平 Project: DiscGolf Tracker API //  

### Author: Tõnis Pütsepp //  

[*ESTONIAN VERSION*](README.md)

---

## 📘 Project Overview

This **API** project helps disc golf players manage their:

- **Profile**
- **Courses**
- **Games and results**
- **Statistics and equipment**

### 🧩 Initial Resources

| Main Resource | Description | *Additional Resources* | Description |
|:--------------|:------------|:------------------------|:------------|
| **Users**          | The player using the API              | PlayerStats | Statistics for a specific user             |
| **Courses**        | Overview of a disc golf course        | Hole        | A single basket (hole) on a course         |
| **Games**          | A single game played by a user        | Score       | Number of throws per basket by each player |
| **Discs**          | Save and manage your discs                | Bag         | User’s collection of discs                 |

### Optional Future Features

- Player achievements (e.g., hole-in-one)
- User comments on course conditions
- Ratings and reviews

## 🚩 Main Endpoints

Below are the REST API endpoints grouped by resource.

---

### 🔐 Authentication & Authorization

| Method | Endpoint | Description | Access |
|:-------|:----------|:-------------|:--------|
| **POST** | `/users` | Create a new user | Public |
| **POST** | `/auth/login` | Log in | Public |

---

### 👤 Users

| Method | Endpoint | Description | Access |
|:--------|:----------|:-------------|:--------|
| **GET** | `/users` | Get all users | Admin |
| **GET** | `/users/:id` | Get user by ID | Logged-in |
| **POST** | `/users/:id/status` | Change user active status | Admin |

---

### 🕹️ Games

| Method | Endpoint | Description | Access |
|:--------|:----------|:-------------|:--------|
| **GET** | `/games` | Get all games | Admin |
| **GET** | `/games/myGames` | Get games for the logged-in user | Logged-in |
| **GET** | `/games/:id` | Get game by ID | Logged-in |
| **POST** | `/games/add` | Add new game | Logged-in |

---

### 🥏 Discs

| Method | Endpoint | Description | Access |
|:--------|:----------|:-------------|:--------|
| **GET** | `/discs` | Get all discs | Logged-in |
| **GET** | `/discs/:id` | Get disc by ID | Logged-in |
| **POST** | `/discs` | Add a new disc | Logged-in |
| **GET** | `/discs/user/:id` | Get all discs belonging to a specific user | Logged-in |
| **POST** | `/discs/user/disc/check` | Check if user(:id) owns disc(:id) | Admin |

---

### 🏞️ Courses

| Method | Endpoint | Description | Access |
|:--------|:----------|:-------------|:--------|
| **GET** | `/courses` | Get all courses | Logged-in |
| **GET** | `/courses/:id` | Get course by ID | Logged-in |
| **POST** | `/courses` | Add new course | Logged-in |

---

## ⚙️ Functionality

| Resource | Create | Read | Update | Delete |
|:---------|:-------|:-----|:--------|:--------|
| **Users**     | Register | View profile | Edit profile | Soft delete only |
| **Courses**   | Add course | View courses | Update course | Delete course |
| **Games**     | Create game | View game | Update score | Delete game |
| **Bags**      | Create bag | View bag | Update bag | Delete bag |

## 🧱 Data Models

### **User**

```typescript
{
  id: 1,
  username: "discplayer",
  email: "user@example.ee",
  password: "xxxxx",
  created: "26.07.2024",
  active: true
}
```

### **Course**  

```typescript
{
  id: 1,
  name: "Viimsi discgolfi park",
  location: "Tallinn",
  holes: 18,
  par: 54
}
```

### **Game**

```typescript
{
  id: 1,
  userId: 1,
  courseId: 2,
  datePlayed: "01.09.2025",
  score: 62,
}
```

### **Disc**

```typescript
{
  id: 1,
  brand: "Innova",
  model: "Destroyer",
  type: "Driver",
  speed: 12,
  glide: 5,
  turn: -1,
  fade: 3
}
```

### **UserDiscs**

```typescript
{
  userId: 1,
  discId: 2,
  addedAt: "25.09.2025";
}
```

📦 **src**  
Main source folder containing all modules and services.

├── 📂 **auth**  
│   Handles authentication and authorization logic.  
│   ├── `authController.ts` – Manages login and registration. 
│   ├── `isAdmin.ts` – Checks if user has admin rights.  
│   └── `isLoggedMiddleware.ts` – Middleware to verify if user is logged in.
│  
├── 📂 **courses**  
│   Course management.
│   ├── `coursesController.ts` – Handles course CRUD operations.  
│   ├── `coursesInterface.ts` – Defines course data types.  
│   ├── `coursesRouter.ts` – Defines API routes for courses.  
│   └── `coursesService.ts` – logic for courses.
│  
├── 📂 **discs**  
│   Disc management. 
│   ├── `discsController.ts` – Handles disc requests.  
│   ├── `discsInterface.ts` – Disc data model.  
│   ├── `discsRouter.ts` – Defines API routes for discs.
│   └── `discsService.ts` – logic for disc management.
│  
├── 📂 **games**  
│   Game module.  
│   ├── `gamesController.ts` – Handles game-related requests.  
│   ├── `gamesInterface.ts` – Game data structure.
│   ├── `gamesRouter.ts` – API routes for games.
│   └── `gamesService.ts` – logic for game processing.
│  
├── 📂 **general**  
│   General services used across multiple modules.  
│   ├── `hashService.ts` – Password hashing and validation (bcrypt).  
│   └── `jwtService.ts` – JSON Web Token generation and validation. 
│  
├── 📂 **users**  
│   User management module.  
│   ├── `usersController.ts` – Handles user API requests.  
│   ├── `userService.ts` – User-related business logic.  
│   ├── `usersInterface.ts` – User data types and structures.  
│   └── `usersRouter.ts` – Defines user API routes.  
│  
├── 📂 **utilites**  
│   General utility functions for reuse.
│  
├── `config.ts` – Configuration file (environment variables, connections, etc.)  
├── `data.ts` – May contain seed data or database setup. 
├── `index.ts` – Application entry point; starts Express server.  
│  
📜 **package.json** – Dependencies and scripts.
📜 **package-lock.json** – Locked dependency versions.
📜 **tsconfig.json** – TypeScript compiler configuration .
📜 **README.md** – Project documentation.

### 🧠 Architecture

The project follows the following structure:

- **Controller** – Handles HTTP requests and responses
- **Service** – Contains business logic and data processing
- **Interface** – Defines data structures
- **Router** – Defines API endpoints

## 🚀 How to run this project

**1. Project Setup (Install Dependencies)**  

**Requirements:**

- Node.js (v16 or newer)

- npm

```bash
git clone <repository URL>
cd API_Development/code
```

**Install dependencies:**

```bash
npm install
```

**2. Execution**

### A. Development Mode 🛠️

Development mode often uses ts-node or nodemon to automatically compile and restart the server after code changes.

Run with a script:

```bash
npm run dev
# OR
npm start
```

Run directly with ts-node (if no script is available):

```bash
npx ts-node index.ts
```

**3. Verification and Testing**

Once the server has started, a message should appear in the terminal:

```bash
API is running on http://localhost:3000
```

Make a GET request (e.g., in a browser or ThunderClient) to the address: [http://localhost:3000/]

The expected successful response is: **{"success":true,"message":"API is running!"}**.

**🧾 Technologies**

- Node.js (v18+)
- TypeScript
- Express.js
- JWT for authentication
- bcrypt for password hashing

### 🔑 Authentication & Token Usage

**Roles:**

`user` – regular user

`admin` – application administrator

By default, new users are assigned the user role. Only admins have full access to all endpoints.

**Logging in**

Use an `API` client such as `ThunderClient` or `Postman` and send:

**Regular user example:**

```json
"email": "Kangutaja123@yahoo.com",
"password": "12345"
```

or

```json
"username": "Kangutaja",
"password": "12345"
```

**Admin user example:**

```json
"email": "KollaneK@mail.com",
"password": "12345"
```

After a successful login `POST /auth/login`, you will receive a `JWT token`. Copy the token and include it in the Authorization header for further requests.

`The token secret is located in config-test.ts in the project root.`

**Creating a New User**

Send a `POST` request to `/users` with:

```json
"email": "example@email.com",
"username": "your_username",
"password": "your_password"
```
