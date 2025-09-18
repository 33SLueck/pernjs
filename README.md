# PERN Stack Projekt: Schritt-für-Schritt-Anleitung

Diese Anleitung erklärt, wie du ein vollständiges PERN-Projekt (PostgreSQL, Express, React, Node.js) nachbauen kannst. Sie enthält alle wichtigen Terminal-Befehle, Dateierklärungen und Tipps für Einsteiger.

---

## 1. Projektstruktur

Das Projekt besteht aus zwei Hauptteilen:
- **backend/**: Node.js/Express-Server mit Prisma (ORM) und PostgreSQL
- **frontend/**: React-App mit Vite

```
pernjs/
  backend/
    prisma/
      schema.prisma
      migrations/
    routes/
      BooksRoutes.js
      ReviewsRoutes.js
    server.js
    package.json
    .env
  frontend/
    src/
      pages/
        BookList.jsx
        BookDetails.jsx
      components/
        Reviews.jsx
      App.jsx
      main.jsx
    package.json
    index.html
    vite.config.js
  .gitignore
```

---

## 2. Backend: Express, Prisma & PostgreSQL

### a) Initialisierung

```bash
# Backend-Ordner anlegen und initialisieren
mkdir backend && cd backend
npm init -y

# Notwendige Pakete installieren
npm install express cors dotenv @prisma/client
npm install --save-dev prisma nodemon
```

### b) Wichtige Dateien

- **server.js**  
  Startet den Express-Server, bindet die Routen ein und verbindet Prisma.

- **prisma/schema.prisma**  
  Definiert die Datenbankstruktur (Modelle für Bücher und Reviews).

- **routes/BooksRoutes.js**  
  Routen für Bücher (CRUD).

- **routes/ReviewsRoutes.js**  
  Routen für Reviews (CRUD).

- **.env**  
  Enthält die Datenbank-URL, z.B.:
  ```
  DATABASE_URL="postgresql://user:pass@localhost:port/dbname"
  ```

### c) Prisma einrichten & Migration

```bash
# Prisma initialisieren
npx prisma init

# schema.prisma anpassen (siehe oben)
# Migration ausführen (erstellt Tabellen in der DB)
npx prisma migrate dev --name init --schema=prisma/schema.prisma

# Prisma Client generieren
npx prisma generate
```

### d) Server starten

In package json fügen wir ein script ein um via npm run dev nodemon zu starten

```js

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon server.js"
  },

```

```bash
# Mit nodemon (automatischer Neustart bei Änderungen)
npm run dev
```

---

## 3. Frontend: React mit Vite

### a) Initialisierung

Wir wechseln in den ordner frontend und erstellen unser vite projekt
```bash
# Im Hauptverzeichnis:
npm create vite@latest .
cd frontend

# Abhängigkeiten installieren
npm install
npm install react-router tailwindcss @tailwindcss/vite
```
in der datei vite.config.js muss nun noch tailwind als plugin eingetragen werden werden 

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

```

und in der index.css eingetragen werden

```css
@import "tailwindcss";

```

### b) Wichtige Dateien

- **src/pages/BookList.jsx**  
  Zeigt alle Bücher an, ermöglicht Löschen/Hinzufügen.

- **src/pages/BookDetails.jsx**  
  Zeigt Details zu einem Buch und dessen Reviews.

- **src/components/Reviews.jsx**  
  Listet Reviews zu einem Buch auf, ermöglicht das Hinzufügen.

- **src/App.jsx**  
  Definiert die Routen (z.B. `/`, `/books/:id`).

- **src/main.jsx**  
  Einstiegspunkt für React.

- **index.html**  
  Root-HTML-Datei.

### c) Frontend starten

```bash
npm run dev
```

---

## 4. API-Endpunkte (Beispiele)

- **GET /api/v1/** – Alle Bücher
- **GET /api/v1/:id** – Einzelnes Buch inkl. Reviews
- **POST /api/v1/** – Neues Buch anlegen
- **DELETE /api/v1/:id** – Buch löschen
- **POST /api/v1/reviews/add** – Review zu Buch anlegen

---

## 5. Hinweise & Tipps

- **Datenbank:** Stelle sicher, dass PostgreSQL läuft und die Zugangsdaten in `.env` stimmen.
- **Prisma:** Nach jeder Änderung an `schema.prisma` eine Migration ausführen!
- **Frontend/Backend:** Beide Server müssen parallel laufen (Ports beachten).
- **Fehlermeldungen:** Immer die Server-Logs und die Browser-Konsole prüfen.

---

## 6. Weiterführende Links

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [React Router Docs](https://reactrouter.com/)
- [Vite Docs](https://vitejs.dev/)

---

Viel Erfolg beim Nachbauen!
