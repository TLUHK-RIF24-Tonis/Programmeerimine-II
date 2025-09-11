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

```json
{
  "user_id": 1,
  "username": "diskimängija",
  "email": "kasutaja@näide.ee",
  "password": "xxxxx",
  "created_at": "26.07.2024",
  "is_active": true
}
```

### **Rada**  

```json
{
  "course_id": 1,
  "name": "Viimsi discgolfi park",
  "location": "Tallinn",
  "holes": 18,
  "par": 54
}
```

### **Mäng**

```json
{
  "game_id": 1,
  "user_id": 1,
  "course_id": 2,
  "date_played": "01.09.2025",
  "score": 62,
}
```

### **Ketas**

```json
{
  "disc_id": 1,
  "user_id": 1,
  "brand": "Innova",
  "model": "Destroyer",
  "type": "Driver",
  "speed": 12,
  "glide": 5,
  "turn": -1,
  "fade": 3
}
```

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

```json
{
  "id": 1,
  "username": "discplayer",
  "email": "user@example.ee",
  "password": "xxxxx",
  "created": "26.07.2024",
  "active": true
}
```

### **Course**  

```json
{
  "id": 1,
  "name": "Viimsi discgolfi park",
  "location": "Tallinn",
  "holes": 18,
  "par": 54
}
```

### **Game**

```json
{
  "id": 1,
  "userId": 1,
  "courseId": 2,
  "datePlayed": "01.09.2025",
  "score": 62,
}
```

### **Disc**

```json
{
  "id": 1,
  "userId": 1,
  "brand": "Innova",
  "model": "Destroyer",
  "type": "Driver",
  "speed": 12,
  "glide": 5,
  "turn": -1,
  "fade": 3
}
```
