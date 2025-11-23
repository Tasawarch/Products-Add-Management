
# Products Add managemnent

## Overview

This repository is a simple full‑stack web application that demonstrates a typical modern web stack:

- `my-backend-project/` — Node.js + Express backend providing REST APIs for products and users, using Mongoose to persist data to MongoDB.
- `react-app/` — React single‑page application (Vite) that consumes backend APIs and provides UI pages (login, signup, add product, view products).

The backend is organized by resource under `api/` (e.g. `api/products`, `api/users`) with controllers, routes, schemas, and services.

## Main Features

- Product management: create and list products (`/api/products`).
- User management and authentication scaffolding (routes and libraries included).
- MongoDB persistence using Mongoose models & schemas.
- Middleware: CORS and cookie parsing configured for client-server interactions.
- Frontend: React + Vite with client routing (`react-router-dom`) and Tailwind/PostCSS tooling.

## Tech Stack

- Backend: Node.js, Express, Mongoose (MongoDB), `jsonwebtoken`, `argon2`/`bcrypt`, `cookie-parser`, `cors`.
- Frontend: React, Vite, `react-router-dom`, Tailwind CSS (PostCSS).


## Suggested CV bullets

- Built a full‑stack application with React (Vite) frontend and Node/Express backend, integrating MongoDB via Mongoose.
- Implemented RESTful product and user endpoints and integrated password hashing and JWT authentication patterns.
- Organized code with controllers, services, routes, and schemas to improve maintainability.
