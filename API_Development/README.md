# Projekt: Discgolfi Haldus API //

### Autor: Tõnis Pütsepp //

*Scroll down for ENGLISH version*

---

## Millest see projekt räägib?  

Selle projekti eesmärk on luua **discgolfi API**, mille abil mängijad saavad mugavalt:

- Hallata enda profiili,
- Luua ja jälgida discgolfi radasid,
- Lisada mängitud mänge ja tulemusi
- Jälgida statistikat ja varustust.  

### Ressursid

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

---

## Funktsionaalsus

|Resurss|Loo|Loe|Uuenda|Kustuta|
|:-|:-|:-|:-|:-|
|**Users**|Registreerimine|Profiili vaatamine|Profiili muutmine|Kui siis *soft-delete*|
|**Courses**|Lisa rada|Vaata radu|Uuenda rada|Kustuta rada|
|**Games**|Loo mäng|Vaata mängu|Uuenda skoori|Kustuta mäng|
|**Discs**|Lisa uus ketas|Vaata kettaid|Uuenda ketaste kogumit|Kustuta kogumist ketas|

---

## Mudelid (Andmestruktuurid)

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

## Kuidas käivatad antud projekti  

**1. Projekti Ettevalmistamine (Sõltuvuste paigaldamine)**  
Mine bashis oma projekti põhikausta (kus asuvad failid nagu index.ts ja package.json) ning paigalda kõik vajalikud paketid:

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

<br>
<br>

# Project: DiscGolf Tracker API //  

### Author: Tõnis Pütsepp //  

---

## Project Overview

This **API** project helps disc golf players manage their:

- **Profile**
- **Courses**
- **Games and results**
- **Statistics and equipment**

### Initial Resources

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

## Functionality

| Resource | Create | Read | Update | Delete |
|:---------|:-------|:-----|:--------|:--------|
| **Users**     | Register | View profile | Edit profile | Soft delete only |
| **Courses**   | Add course | View courses | Update course | Delete course |
| **Games**     | Create game | View game | Update score | Delete game |
| **Bags**      | Create bag | View bag | Update bag | Delete bag |

## Data Models

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

<br>

## How to run this project

**1. Project Setup (Install Dependencies)**  

In your bash, navigate to the project's root folder (where files like index.ts and package.json are located) and install all required packages:

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
