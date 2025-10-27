# 平 Projekt: Discgolfi Haldus API //

### Autor: Tõnis Pütsepp //

*Scroll down for ENGLISH version*

---

## 📘 Millest see projekt räägib?  

Selle projekti eesmärk on luua **discgolfi API**, mille abil mängijad saavad mugavalt:

- Hallata enda profiili,
- Luua ja jälgida discgolfi radasid,
- Lisada mängitud mänge ja tulemusi
- Jälgida statistikat ja varustust.  

### 🧩 Ressursid

|Põhiresurss|Kirjeldus|*Täiendav ressurss*|Kirjeldus|
|:-|:-|:-|:-|
|**Users**|API-t kasutav mängija ehk kasutaja|PlayerStats|Statistika konkreetse kasutaja kohta|
|**Courses**|Discgolfi raja ülevaade|Hole|Seotud konkreetse rajaga (üks korv)|
|**Games**|Üks mäng, mida kasutaja on mänginud konkreetsel rajal|Score|Iga mängija visete arv korvi kohta|
|**Discs**|Halda kogumit|Bag|Kasutaja ketaste kogum|

### Täiendavad võimalused (võib-olla)

- Mängija saavutused nt: hole-in-one,
- Kasutajate kommentaarid raja tingimustest,
- Hinnangud ja ülevaated.

### 🚩 Põhilõpp-punktid

Alljärgnevad tabelid kirjeldavad projekti erinevate ressursside REST API endpoint’e.

---

### Autoriseerimine & autentimine

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:-------|:---------|:----------|:---------|
| **POST** | `/users` | Loo kasutaja | Avalik |
| **POST** | `/auth/login` | Logi sisse | Avalik |

### 👤 Users

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:-----------|
| **GET** | `/users` | Saa kõik kasutajad | Admin |
| **GET** | `/users/:id` | Saa kasutaja id alusel | Sisse logitud |
| **POST** | `/users/:id/status` | Muuda kastuaja aktiivsus staatust | Admin |

---

### 🕹️ Games

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:-----------|
| **GET** | `/games` | Saa kõik mängud |Admin|
| **GET** | `/games/myGames` | Kasutaja mängud |Sisse logitud|
| **GET** | `/games/:id` | Saa mäng id alusel |Sisse logitud|
| **POST** | `/games/add` | Lisa mäng |Sisse logitud|

---

### 🥏 Discs

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:-----------|
| **GET** | `/discs` | Saa kõik kettad |Sisse logitud|
| **GET** | `/discs/:id` | Saa ketas id alusel |Sisse logitud|
| **POST** | `/discs` | Lisa uus ketas |Sisse logitud|
| **GET** | `/discs/user/:id` | Saa kettad mis kuuluvad kindlale kasutajale |Sisse logitud|
| **POST** | `/discs/user/disc/check` | Vaata kas kasutajal (:id) on selline ketas (:id) |Admin|

---

### 🏞️ Courses

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:----------|
| **GET** | `/courses` | Saa kõik rajad |Sisse logitud|
| **GET** | `/courses/:id` | Saa rada id alusel |Sisse logitud|
| **POST** | `/courses` | Lisa uus rada | Sisse logitud |

---

## ⚙️ Funktsionaalsus

|Resurss|Loo|Loe|Uuenda|Kustuta|
|:-|:-|:-|:-|:-|
|**Users**|Registreerimine|Profiili vaatamine|Profiili muutmine|Kui siis *soft-delete*|
|**Courses**|Lisa rada|Vaata radu|Uuenda rada|Kustuta rada|
|**Games**|Loo mäng|Vaata mängu|Uuenda skoori|Kustuta mäng|
|**Discs**|Lisa uus ketas|Vaata kettaid|Uuenda ketaste kogumit|Kustuta kogumist ketas|

---

## 🧱 Mudelid (Andmestruktuurid)

### **Kasutaja**

```typescript
{
  id: 1,
  username: "diskimängija",
  email: "kasutaja@näide.ee",
  password: "xxxxx",
  created_at: "26.07.2024",
  active: true
}
```

### **Rada**  

```typescript
{
  id: 1,
  name: "Viimsi discgolfi park",
  location: "Tallinn",
  holes: 18,
  par: 54
}
```

### **Mäng**

```typescript
{
  id: 1,
  userId: 1,
  courseId: 2,
  datePlayed: "01.09.2025",
  score: 62,
}
```

### **Ketas**

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

### **Kasutajate kettad**

```typescript
{
  userId: 1,
  discId: 2,
  addedAt: "25.09.2025";
}
```

## 📂 Projekti struktuur

📦 **src**  
Peamine lähtekoodikataloog, kus asuvad kõik moodulid ja teenused.

├── 📂 **auth**  
│   Autentimise ja autoriseerimise loogika.  
│   ├── `authController.ts` – haldab kasutaja sisselogimist ja registreerimist.  
│   ├── `isAdmin.ts` – kontrollib, kas kasutajal on administraatoriõigused.  
│   └── `isLoggedMiddleware.ts` – middleware, mis kontrollib, kas kasutaja on sisse logitud.  
│  
├── 📂 **courses**  
│   Radade haldus.  
│   ├── `coursesController.ts` – haldab raja CRUD-päringuid.  
│   ├── `coursesInterface.ts` – määratleb raja andmetüübid.  
│   ├── `coursesRouter.ts` – määratleb radade API teed.  
│   └── `coursesService.ts` – sisaldab radadega seotud loogikat.  
│  
├── 📂 **discs**  
│   Ketaste haldus.  
│   ├── `discsController.ts` – haldab plaadipäringuid.  
│   ├── `discsInterface.ts` – plaadi andmemudel.  
│   ├── `discsRouter.ts` – API teed plaatide jaoks.  
│   └── `discsService.ts` – äriloogika plaatide haldamiseks.  
│  
├── 📂 **games**  
│   Mängude moodul.  
│   ├── `gamesController.ts` – haldab mängudega seotud päringuid.  
│   ├── `gamesInterface.ts` – mängu andmestruktuur.  
│   ├── `gamesRouter.ts` – API teed mängudele.  
│   └── `gamesService.ts` – äriloogika mängude töötlemiseks.  
│  
├── 📂 **general**  
│   Üldised teenused, mida kasutatakse mitmes moodulis.  
│   ├── `hashService.ts` – parooolide räsimine ja kontrollimine (nt bcrypt).  
│   └── `jwtService.ts` – JSON Web Tokeni (JWT) genereerimine ja valideerimine.  
│  
├── 📂 **users**  
│   Kasutajate halduse moodul.  
│   ├── `usersController.ts` – haldab kasutajatega seotud API päringuid.  
│   ├── `userService.ts` – kasutajate äriloogika ja andmehaldus.  
│   ├── `usersInterface.ts` – kasutajate andmetüübid ja struktuurid.  
│   └── `usersRouter.ts` – defineerib kasutajate API teed.  
│  
├── 📂 **utilites**  
│   Üldised utiliidid (mõeldud taaskasutatavate funktsioonide jaoks).  
│  
├── `config.ts` – konfiguratsioonifail (keskkonnamuutujad, ühendused jne).  
├── `data.ts` – võib sisaldada algandmeid või andmebaasiühenduse seadeid.  
├── `index.ts` – rakenduse põhisissepääs, Express serveri käivitamine.  
│  
📜 **package.json** – projekti sõltuvused ja skriptid.  
📜 **package-lock.json** – täpsed sõltuvuste versioonid.  
📜 **tsconfig.json** – TypeScripti kompilaatori seaded.  
📜 **README.md** – projekti dokumentatsioon.  

---

## 🧠 Arhitektuur

### Projekt järgib arhitektuuri:

**Controller** – haldab HTTP-päringuid ja vastuseid

**Service** – sisaldab äriloogikat ja andmetöötlust

**Interface** – määratleb andmestruktuurid

**Router** – määratleb API endpoint’id

## 🚀 Kuidas käivatad antud projekti  

**1. Projekti Ettevalmistamine (Sõltuvuste paigaldamine)**  

### Eeltingimused  

- Node.js (Versioon 16 või uuem)

- Npm

**Kloonige repositoorium**  

```bash
git clone <repositooriumi URL>
cd API_Development/code
```

**Ava terminal ning paigalda kõik vajalikud paketid:**

```bash
npm install
```

---

### Käivitamine

### Arendusrežiim (Dev Mode) 🛠️

**1. Käivita skriptiga:**

```bash
npm run dev
# VÕI
npm start
```

**2. Käivita otse ts-node abil (kui skripti pole):**

```bash
npx ts-node index.ts
```

**3. Kontroll ja Testimine**  

Kui server on käivitunud, peaks bashis ilmuma teade:

```bash
API is running on http://localhost:3000
```

Tee GET päring (näiteks brauseris või ThunderClientis) aadressile: [http://localhost:3000/]

Eeldatav edukas vastus on: **{"success":true,"message":"API is running!"}**.  

### 🧾 Tehnoloogiad

- Node.js (v18+)

- TypeScript

- Express.js

- JWT autentimiseks

- bcrypt paroolide räsimiseks

### 🔑 Kuidas toimub logimine ja token'i kasutus

**Rollid:**
- `user` - tava kasutaja
- `admin` - rakenduse administraator

Uue kastutaja tegemisel määratakse vaikimis rolliks tavaline kastuaja. Tava kasutajana on **limiteeritud juurdepääsuga** osadele lõpp-punktidele. Et pääseda kõikidele ressursidele **peab olema admin**.

**Sisse logimiseks:**

Kasutades mingisugust `API` testimis tarkvara nt: `ThunderClient` saada päringu kehas kaasa:

**Tavaline kasutaja:**

```json
"email": "Kangutaja123@yahoo.com",
  või
"username": "Kangutaja",
"password": "12345"
```

**Admin kastuaja:**

```json
"email": "KollaneK@mail.com",
  või
"username": "KollaneKoll",
"password": "12345"
```

Sisselogimiseks on vaja kas `email` või `username`, aga saab ka mõlemaga.

- Seejärel tee `POST` päring `auth/login` lõpp-punktile, ning saad tokeni.
- Kopeeri saadud token järgmiste päringute jaoks päisesse kaasa.
- Õigused on olemas, et edasi toimetada `API`-s.

`Projekti juurkaustas on fail nimega config-test.ts kus sees on tokeni saladus.`

**Kasutaja loomiseks:**

Kasutades järjekordselt `API`-le info saatmiseks mõeldud tarkvara tee `POST` päring: `/users` lõpp-punktile.

Päringu kehasse sisesta andmed:

```json
"email": "suvaline@email.com",
"username": "vali_ise",
"password": "midagisuvalist"
```

Seejärel kasuta üleval olevat sisselogimis juhendit ja saad ligipääsu `API`-le

<br>
<br>

# 平 Project: DiscGolf Tracker API //  

### Author: Tõnis Pütsepp //  

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
