# 平 Projekt: Discgolfi Haldus API //

### Autor: Tõnis Pütsepp //

[*ENGLISH VERSION*](README.eng.md)

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
|**Courses**|Discgolfi raja ülevaade|Hole (korv)|Seotud konkreetse rajaga (üks korv)|
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
| **GET** | `/users/me` | Päri sisse logitud kasutaja andmed | Sisse logitud |
| **PATCH** | `/users/me` | Muuda sisse logitud kasutaja andmeid | Sisse logitud |
| **PATCH** | `/users/:id` | Muuda teiste kasutajate andmeid | Admin |
| **GET** | `/users` | Saa kõik kasutajad | Admin |
| **GET** | `/users/:id` | Saa kasutaja id alusel | Admin |
| **PATCH** | `/users/:id/status` | Muuda kastuaja aktiivsus staatust | Admin |
| **DELETE** | `/users/:id` | Kasutaja soft-delete | Admin |

---

### 🕹️ Games

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:-----------|
| **GET** | `/games` | Saa kõik mängud |Admin|
| **GET** | `/games/myGames` | Kasutaja mängud |Sisse logitud|
| **GET** | `/games/:id` | Saa enda kasutaja mäng id alusel |Sisse logitud|
| **POST** | `/games/add` | Lisa mäng |Sisse logitud|
| **GET** | `/games/admin/:id` | Kõikide kasutajate mängud id alusel |Admin|
| **DELETE** | `/games/:id` | Mängu soft-delete |Admin|
| **PATCH** | `/games/myGames/:id/leave` | Kustuta mäng kasutaja tasemel |Sisse logitud|
| **PATCH** | `/games/:id` | Uuenda mängu andmeid |Sisse logitud|

---

### 🥏 Discs

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:-----------|
| **GET** | `/discs` | Saa kõik kettad |Sisse logitud|
| **GET** | `/discs/:id` | Saa ketas id alusel |Sisse logitud|
| **GET** | `/discs/me` | Saa kasutajana kõik oma kettad |Sisse logitud|
| **POST** | `/discs` | Lisa uus ketas |Admin|
| **GET** | `/discs/user/:id` | Saa kettad mis kuuluvad kindlale kasutajale |Admin|
| **GET** | `/discs/user/disc/check` | Vaata kas kasutajal (:id) on selline ketas (:id) |Admin|
| **DELETE** | `/discs/:id` | Soft-delete kettale |Admin|
| **PATCH** | `/discs/:id` | Muuda ühe ketta andmeid |Admin|

---

### 🏞️ Courses

| Meetod | Endpoint | Kirjeldus | Ligipääs |
|:--------|:----------|:-----------|:----------|
| **GET** | `/courses` | Saa kõik rajad | Avalik |
| **GET** | `/courses/:id` | Saa rada id alusel | Avalik |
| **POST** | `/courses` | Lisa uus rada | Sisse logitud & Admin |
| **DELETE** | `/courses/:id` | Soft-delete rada | Sisse logitud & Admin |
| **PATCH** | `/courses/:id` | Uuenda raja andmeid | Sisse logitud & Admin |

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

**Service** – sisaldab loogikat ja andmetöötlust

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

## Käivitamine

### Arendusrežiim (Dev Mode) 🛠️

**1. Käivita skriptiga:**

```bash
npm start
```

**2. Käivita otse ts-node abil (kui skripti pole):**

```bash
npx ts-node index.ts
```

**3. Kontroll ja Testimine**  

Kui server on käivitunud, peaks terminalis ilmuma teade:

```bash
API is running on http://localhost:3000
```

Tee GET päring (näiteks brauseris või ThunderClientis) aadressile: [http://localhost:3000/]

Eeldatav edukas vastus on: **{"success":true,"message":"API is running!"}**, ning kõik API endpointid.  

### 🧾 Tehnoloogiad

- Node.js (v18+)

- TypeScript

- Express.js

- JWT autentimiseks

- bcrypt paroolide räsimiseks

- MySQL Andmebaas

- DOCKER andmebaasiga ühendumiseks

> [!IMPORTANT] API TESTIMISEKS LOO PROJEKTIS CODE KAUSTA .ENV FAIL .ENV-EXAMPLE SISUGA

## 🔑 Kuidas toimub logimine ja token'i kasutus

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

> [!NOTE]Sisselogimiseks on vaja kas `email` või `username`, aga saab ka mõlemaga.

- Tee `POST` päring `auth/login` lõpp-punktile, ning saad tokeni.
- Kopeeri saadud token järgmiste päringute jaoks päisesse kaasa.
- Õigused on olemas, et edasi toimetada `API`-s.

**Kasutaja loomiseks:**

Kasutades järjekordselt `API`-le info saatmiseks mõeldud tarkvara tee `POST` päring: `/users` lõpp-punktile.

Päringu kehasse sisesta andmed:

```json
"email": "suvaline@email.com",
"username": "vali_ise",
"password": "midagisuvalist"
```

Seejärel kasuta üleval olevat sisselogimis juhendit ja saad ligipääsu `API`-le

## 🐳DOCKERI PAIGALDAMINE  

See juhend aitab sul käivatada MySQL konteineri, luua `discgolfapp` andmebaasi, laadida skeemi ja seed-andmed ning seadistada ühendus `.env` failis

### 1. Loo MySQL docker konteiner

Konteineri seadistused:  

| Muutuja | Väärtus | Selgitus  
|:--------|:----------|:-----------|  
| `MYSQL_DATABASE` | `discgolfapp` | Luuakse andmebaas |  
| `MYSQL_ROOT_PASSWORD` | `super-secret` | Root kasutaja parool |  
| `MYSQL_USER` | `disc_golfer` | Tavaline MySQL kasutaja |  
| `MYSQL_PASSWORD` | `secret` | Selle kasutaja parool |  

### 2. Ava konteiner ja sisene `EXEC` aknasse

Logi MySQL-i:

```bash
mysql -u disc_golfer -p
```

Sisesta parool:

```bash
secret
```

### 3. Vali andembaas

```bash
USE discgolfapp;
```

### 4. Lase sisse andmebaasi skeem

Mine projekti juur kasuta:

```bash
sql/schemas.sql
```

Kopeeri selle sisu ja kleebi MySQL terminali.

### 5. Lisa seed-andmed  

```bash
sql/seed.sql
```

Kopeeri failis olev SQL MySQL terminali.

### 6. Loo `.env` fail API jaoks

Projekti juurkasuta loo `env` fail:  

```env
PORT=3000
JWT_SECRET=SiiaPaneMidagiV2gaSuvalist
SALT_ROUNDS=10
DB_HOST=localhost
DB_NAME=discgolfapp
DB_USER=disc_golfer
DB_PASSWORD=secret
DB_PORT=3306
```  

> [!IMPORTANT] DB_PORT peab olema sama, mis Dockeris määrasid  

### 7. Käivita API

```bash
npm install
npm start
```

Kui kõik korras näed:

```bash
API is running on http://localhost:3000
```
