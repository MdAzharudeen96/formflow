# FormFlow

FormFlow is a planned full-stack form creation, submission, validation, and
admin approval system.

## Project Status

Phase 7 - Dynamic form rendering and data collection.

The complete product requirements, user journeys, lifecycle rules, UI/UX
direction, architecture, security requirements, and phased roadmap are defined
in [GEMINI.md](GEMINI.md).

The React/Vite frontend and Express backend foundation are in place. The
backend now includes MongoDB/Mongoose data models, admin authentication with
JWT, and anonymous dynamic form submissions with draft and submitted states.

## MongoDB Setup

Create a root `.env` file based on `.env.example` and set the MongoDB, JWT,
and admin seed variables. Keep credentials private; `.env` files are ignored
by Git.

Seed the admin with `npm run seed:admin --workspace server`, then start the
backend with `npm run start --workspace server`. The server connects to
MongoDB before listening on port 3000.

## Planned Technology

- React and Vite
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Lucide React
- Node.js and Express
- MongoDB and Mongoose

## Phase 7 Boundary

This phase adds dynamic public form rendering, draft saving, and submission
validation. Admin review and approval workflows belong to later phases.

## Next Phase

Phase 8 - Form publishing.