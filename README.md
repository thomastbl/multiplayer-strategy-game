# Tears of Regret | A Multiplayer Strategy Game

**A note on AI usage**

**No AI was used to generate any code. This holds for past projects and for all those to come throughout my learning.** My use of AI is strictly educational: I rely on it to understand concepts and push myself to think, never to produce ready-made solutions.

---

## A browser-based multiplayer strategy game, inspired by titles such as _OpenFront.io_.

This project is developed self-taught as part of my move toward full-stack development. It acts as a common thread for learning web development end to end: from client-side rendering to database persistence, by way of an API and a complete authentication system.

---

## Project status

**Under active development.** The technical foundation is in place: the project has an interactive front end, a structured back end with an API, and a working authentication system connected to a PostgreSQL database. Game logic is the next major milestone.

---

## Current features

**Authentication**

- Sign-up (`/signup`) with password hashing via **bcrypt**
- Login (`/login`) with secure verification and issuance of a **JSON Web Token (JWT)**
- JWT verification middleware protecting routes against unauthenticated access
- Client-side token storage to maintain the session
- **Parameterized** SQL queries to guard against SQL injection
- Error handling and appropriate HTTP status codes

**Interface**

- Navigation between views (menu, login, sign-up).
- Smooth transitions between views via the View Transitions API
- Connection status feedback displayed on login and sign-up attempts
- Conditional display of the game-entry button based on login state
- Client-to-server communication in **JSON** through the `fetch` API
- Forms wired to the back end

**Real-time communication**

- Dedicated WebSocket server (separate from the HTTP server)
- Established two-way connection between browser clients and the server
- Foundation for upcoming real-time features (player presence, lobbies, gameplay)

**Back end & data**

- HTTP API built with **Express**
- Connection to **PostgreSQL** through a connection pool
- Secrets configured through environment variables (`.env`)
- **CORS** handling for cross-origin exchanges

---

## Tech stack

### Front end

- **HTML / CSS / vanilla JavaScript** (ES Modules)
- **Pico.css** — minimalist CSS framework
- **PixiJS** — 2D rendering (intended for displaying the game map)
- **Native** browser WebSocket API — real-time client

### Back end

- **Node.js** + **Express** - HTTP server
- **ws** — WebSocket server
- **node-postgres (pg)** — PostgreSQL driver
- **bcrypt** — password hashing
- **jsonwebtoken** — token-based authentication
- **cors** - cross-origin handling

### MVP

- [x] Authentication system (sign-up / login)
- [x] Route protection through a JWT middleware
- [x] WebSocket connection between clients and the server
- [ ] Player presence ("online" status) over WebSockets
- [ ] Creation and management of game lobbies
- [ ] Interactive map rendering with PixiJS
- [ ] Game logic (match initialization, unit creation, movement, etc.)
- [ ] Game-state synchronization between players

### Long-term vision

Ultimately, the project aims at a full multiplayer game architecture:

- Desynchronization detection
- Real-time communication
- Game AI based on utility score functions, running as a virtual player

---

## Learning notes

This project is first and foremost a learning vehicle. Among other things, it has allowed me to explore in depth:

- the **client-server** model and the **HTTP** protocol (methods, status codes, headers, body);
- building an **API** with Express (routing, middlewares);
- data **serialization / deserialization** (JSON) at the heart of network exchanges;
- web security: password **hashing**, **parameterized queries**, **CORS**, **environment variables**, **JWT** authentication and route protection;
- the **relational model** and the **SQL** language (schema, constraints, CRUD);
- connecting a Node.js application to **PostgreSQL**;
- handling **asynchronous** JavaScript (`async` / `await`, `try` / `catch`).
- structuring the codebase (client / backend, HTTP / WebSocket)

---

_This project is developed by [thomastbl](https://github.com/thomastbl)._
