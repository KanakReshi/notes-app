<h1 align="center">📝 NoteSpace</h1>

<p align="center">
  A clean, full-screen sticky-notes app built with <strong>React + Vite</strong>.<br/>
  Your notes survive page refreshes. Your theme preference too.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed-GitHub%20Pages-222?style=flat-square&logo=github" />
</p>

---

## ✨ Features

| Feature | Details |
|---|---|
| ✏️ **Add / Edit / Delete** | Full CRUD for your notes |
| 🎨 **Colorful Cards** | 6 pastel colors auto-assigned per note |
| 🌙☀️ **Dark / Light Mode** | Toggle with one click, remembered across sessions |
| 💾 **localStorage** | Notes and theme persist after page refresh |
| 📐 **Fit-to-screen layout** | Sidebar form + scrollable notes grid, no overflow |
| ⚡ **Instant updates** | Powered by Vite HMR in development |

---

## 🚀 Live Demo

> **[kanakreshi.github.io/notes-app](https://kanakreshi.github.io/notes-app/)**

---

## 🛠️ Tech Stack

- **React 19** — UI & state management
- **Vite 8** — blazing-fast dev server & bundler
- **Tailwind CSS v4** — utility-first base styles
- **Custom CSS** — premium dark/light theme, animations, glassmorphism
- **localStorage API** — client-side persistence
- **GitHub Actions** — automated CI/CD deployment

---

## 📦 Run Locally

```bash
# Clone the repo
git clone https://github.com/KanakReshi/notes-app.git
cd notes-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Deployed automatically to GitHub Pages on every push to `main` via GitHub Actions.

---

## 📁 Project Structure

```
notes-app/
├── public/
├── src/
│   ├── App.jsx       # Main component — state, logic, JSX
│   ├── App.css       # Custom premium styling & theme system
│   ├── index.css     # Tailwind import + Google Fonts
│   └── main.jsx      # React entry point
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions CI/CD
├── vite.config.js
└── package.json
```

---

## 📄 License

MIT — feel free to use, fork, and build on it.

---

<p align="center">Made with ❤️ by <a href="https://github.com/KanakReshi">KanakReshi</a></p>
