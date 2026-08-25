# FormFlow

FormFlow is a planned full-stack form creation, submission, validation, and
admin approval system.

## Project Status

Phase 2 - MongoDB and data model setup.

The complete product requirements, user journeys, lifecycle rules, UI/UX
direction, architecture, security requirements, and phased roadmap are defined
in [GEMINI.md](GEMINI.md).

The React/Vite frontend and Express backend foundation are in place. Phase 2
adds the MongoDB connection and Mongoose models for users, forms, and
submissions.

## MongoDB Setup

Create `server/.env` or a root `.env` file based on `.env.example` and set
`MONGODB_URI` to your MongoDB connection string. Keep the connection string
private; `.env` files are ignored by Git.

Start the backend with `npm run start --workspace server`. It connects to
MongoDB before listening on port 3000, and `GET /api/health` verifies the API
is running.

## Planned Technology

- React and Vite
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Lucide React
- Node.js and Express
- MongoDB and Mongoose

## Phase 2 Boundary

This phase adds database configuration and models only. Authentication, REST
routes, form-builder functionality, public forms, and submission functionality
belong to later phases.

## Next Phase

Phase 3 - Backend Foundation.