# BeyondChats Assignment – Full Stack Application

This project is a full-stack application built as part of the BeyondChats internship assignment. It scrapes articles, regenerates them using an LLM with reference material, and displays them in a simple frontend UI.

---

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Axios + Cheerio (scraping)
- OpenAI API (article rewriting)

### Frontend
- React
- Vite
- CSS (no external UI framework)

---

## Features

- REST APIs for article CRUD operations
- Scraping oldest BeyondChats blog articles
- Google search integration for reference articles
- Article rewriting using LLM with references
- Frontend to list and view articles
- Clean commit-by-commit development history

---

## Project Structure

# BeyondChats Assignment – Full Stack Application

This project is a full-stack application built as part of the BeyondChats internship assignment. It scrapes articles, regenerates them using an LLM with reference material, and displays them in a simple frontend UI.

---

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Axios + Cheerio (scraping)
- OpenAI API (article rewriting)

### Frontend
- React
- Vite
- CSS (no external UI framework)

---

## Features

- REST APIs for article CRUD operations
- Scraping oldest BeyondChats blog articles
- Google search integration for reference articles
- Article rewriting using LLM with references
- Frontend to list and view articles
- Clean commit-by-commit development history

---

## Project Structure

    beyondchats-assignment/
    ├── backend/
    │ ├── src/
    │ │ ├── controllers/
    │ │ ├── models/
    │ │ ├── routes/
    │ │ ├── services/
    │ │ ├── scripts/
    │ │ └── config/
    │ └── package.json
    │
    ├── frontend/
    │ ├── src/
    │ │ ├── components/
    │ │ ├── pages/
    │ │ ├── services/
    │ │ └── styles/
    │ └── package.json
    │
    ├── architecture.png
    └── README.md


---

## Architecture Overview

Refer to `architecture.png` for a high-level system design.

---

## Notes

- Environment variables are documented in `.env.example`
- Project was built incrementally with frequent commits to reflect development flow
