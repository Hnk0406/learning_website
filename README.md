# UPANISHAD Learning Platform – Stage 1

Pixel-perfect MERN scaffolding for the UPANISHAD learning platform, based on provided UI screenshots.

> **Stage 1 only** – focuses on project initialization, design tokens, basic routing, assets, and a proof-of-layout login screen.

---

## Tech Stack

- **Frontend**: React 18, Vite, React Router DOM
- **Styling**: Global CSS design tokens in `theme.css`
- **Backend**: Node.js, Express, CORS, dotenv
- **Architecture**: MERN-ready (MongoDB wired only through config; no models yet)

---

## Folder Structure

```text
project/
  backend/
    src/
      controllers/
      routes/
      models/
      middleware/
      config/
      server.js
      app.js
    package.json

  frontend/
    public/
      assets/
        extracted/
    src/
      pages/
        ProofHome.jsx
      components/
      styles/
        theme.css
      App.jsx
      main.jsx
    package.json

  metadata/
    screenshot_analysis.json

  .env.example
  README.md
```

---

## Setup Instructions

### 1. Backend

```bash
cd project/backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000` (or the port in `.env`). A simple health endpoint is available at:

- `GET /api/health` – returns `{ status: "ok", stage: 1 }`

### 2. Frontend

```bash
cd project/frontend
npm install
npm run dev
```

Vite will print the local dev URL (usually `http://localhost:5173`).

---

## Design System

Global design tokens live in `frontend/src/styles/theme.css`:

- **Color palette** based on screenshots (primary blues, pink gradient, dark background).
- **Spacing scale** (4–48 px) and **radius scale** (inputs/cards/buttons).
- **Typography** using a Poppins-like sans-serif stack.

`ProofHome.jsx` consumes these tokens to keep spacing, colors, and typography consistent with the UI mockups.

---

## Proof Page

`frontend/src/pages/ProofHome.jsx` implements:

- Left panel with the **UPANISHAD** logo and tagline.
- Right panel with a static login card (username/password fields and primary Login button).

This verifies that the theme, layout primitives, and asset paths are wired correctly before implementing the rest of the flows in later stages.

---

## Environment Variables

Copy `.env.example` to `.env` files as needed:

```bash
cd project/backend
cp ../.env.example .env   # or create manually on Windows
```

Update:

- `PORT` – backend port (default `5000`).
- `MONGODB_URI` – MongoDB connection string (used in later stages).
- `JWT_SECRET` – will be required when auth is implemented.
- `VITE_API_BASE_URL` – frontend base URL for API calls.

---

## Stage 1 Scope

Included:

- Full MERN-ready folder structure.
- Backend Express server with CORS & JSON parsing.
- Frontend React + routing + theme tokens.
- Extracted assets under `frontend/public/assets/extracted/`.
- UI analysis in `metadata/screenshot_analysis.json`.
- Proof-of-layout login page.

Not yet included (for later stages):

- Real authentication, authorization, or sessions.
- Database models and business logic.
- Dynamic dashboard, courses, and learning flows.
- API integration between frontend and backend.
