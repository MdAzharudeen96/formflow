# FormFlow

FormFlow is a full-stack dynamic data collection and review application.

It allows administrators to create forms with different field types, share forms with users, collect responses, save responses as drafts, and review submitted responses. Reviewers can approve or reject submissions, and rejected submissions can be corrected and submitted again.

## Features

### Admin

- Secure admin login using JWT authentication
- Admin dashboard with workspace summary
- Create dynamic forms
- Edit existing forms
- Delete forms
- Add Text, Number, Dropdown, and Date fields
- Mark fields as required or optional
- Add and manage dropdown options
- View forms in the form library
- Copy a public form link
- View submitted responses
- View submission details
- Approve submissions
- Reject submissions with a required reviewer comment
- View submission status
- Pagination for forms and submissions

### User / Public Form

- Open a form using a shared public link
- Fill in dynamic form fields
- Basic client-side and server-side validation
- Save a response as a draft
- Continue editing a draft
- Submit a completed response
- View rejection feedback
- Edit a rejected response
- Submit the corrected response again
- Submitted and approved responses become read-only

## Submission Workflow

A response follows this lifecycle:

```text
Draft
  ↓
Submitted
  ↓
 ┌───────────┐
 ↓           ↓
Approved   Rejected
              ↓
          Edit Response
              ↓
            Draft
              ↓
          Submitted
              ↓
          Approved
```

### Statuses

| Status | Description |
|---|---|
| Draft | Response has been saved but not submitted for review |
| Submitted | Response has been submitted and is waiting for review |
| Approved | Reviewer has approved the response |
| Rejected | Reviewer rejected the response and provided feedback |

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- CSS

### Backend

- Node.js
- Express
- JavaScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS

### Database

MongoDB Atlas is used as the database.

## Project Structure

```text
formflow/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── AdminLayout.jsx
│       │   ├── FormBuilder.jsx
│       │   ├── Header.jsx
│       │   ├── Navigate.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── Sidebar.jsx
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── PublicForm.jsx
│       │   └── admin/
│       │       ├── Dashboard.jsx
│       │       ├── EditForm.jsx
│       │       ├── Forms.jsx
│       │       ├── NewForm.jsx
│       │       ├── SubmissionDetails.jsx
│       │       └── Submissions.jsx
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/
│   └── src/
│       ├── config/
│       │   └── database.js
│       │
│       ├── controllers/
│       │   ├── adminController.js
│       │   ├── authController.js
│       │   ├── formController.js
│       │   ├── healthController.js
│       │   ├── notImplementedController.js
│       │   └── submissionController.js
│       │
│       ├── middlewares/
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   └── validateRequest.js
│       │
│       ├── models/
│       │   ├── Form.js
│       │   ├── Submission.js
│       │   └── User.js
│       │
│       ├── routes/
│       │   ├── adminRoutes.js
│       │   ├── adminSubmissionRoutes.js
│       │   ├── authRoutes.js
│       │   ├── formRoutes.js
│       │   ├── healthRoutes.js
│       │   ├── index.js
│       │   ├── placeholderRoutes.js
│       │   ├── publicFormRoutes.js
│       │   └── submissionRoutes.js
│       │
│       ├── scripts/
│       │   └── seedAdmin.js
│       │
│       ├── services/
│       │   ├── authService.js
│       │   ├── featureStatusService.js
│       │   ├── formService.js
│       │   └── submissionService.js
│       │
│       ├── utils/
│       │   └── apiResponse.js
│       │
│       ├── app.js
│       └── index.js
│
├── .env
├── package.json
└── README.md
```

## How It Works

### 1. Admin Login

The administrator logs in using their email and password.

The backend:

1. Finds the user by email.
2. Compares the supplied password with the stored bcrypt password hash.
3. Creates a JWT token after successful authentication.
4. The frontend sends the token with protected API requests.

Passwords are not stored as plain text.

### 2. Create a Form

An administrator can create a form with:

- Form title
- Optional description
- One or more fields

Supported field types:

- Text
- Number
- Dropdown
- Date

Each field can be marked as required.

Dropdown fields can contain multiple options.

A form must contain at least one field.

### 3. Share the Form

After creating a form, the administrator can copy its public link.

Example:

```text
http://localhost:5173/forms/<form-id>
```

The public form does not require an admin login.

### 4. Save a Draft

A user can enter partial information and save the response as a draft.

Drafts can be opened again using the submission link and completed later.

### 5. Submit a Response

When the user clicks Submit:

- Required fields are validated.
- Field values are validated.
- The response is saved with `submitted` status.
- The submission becomes available in the admin review area.

### 6. Review a Submission

An administrator can open a submitted response and:

- Approve it
- Reject it

A rejection requires a comment explaining what needs to be corrected.

### 7. Rejected Response

When a response is rejected:

- The user can see the reviewer comment.
- The user can edit the response.
- The response can be submitted again.
- After resubmission, the submission immediately shows the submitted state.

### 8. Approved Response

Once a submission is approved, it becomes read-only through the public form.

## Admin Workspace

FormFlow uses a shared admin workspace.

Administrators can work with the forms and submissions available in the workspace. This allows administrators to review submitted responses.

The form library and submission review area follow the same shared-workspace access model.

## Validation

Validation is performed on both the frontend and backend.

### Form validation

The backend checks:

- Form title is present
- Fields are provided
- Fields contain valid labels
- Field types are supported
- Dropdown fields contain valid options

### Submission validation

The application validates:

- Required fields
- Form field IDs
- Number values
- Dropdown values
- Submission status before allowed actions

Server-side validation is used so invalid data cannot be accepted only because frontend validation was bypassed.

## Authentication

Admin routes are protected by authentication middleware.

The application uses:

- JWT for authentication
- bcrypt for password hashing
- Protected frontend routes
- Authentication middleware on the backend
- Admin role validation

Only authenticated administrators can access the admin workspace.

## Database Models

### User

Stores administrator information.

Main fields:

```text
name
email
passwordHash
role
createdAt
```

Passwords are stored as bcrypt hashes.

### Form

Stores the form definition.

Main fields include:

```text
title
description
fields
createdBy
createdAt
updatedAt
```

Each field contains information such as:

```text
label
type
required
options
```

### Submission

Stores responses submitted against forms.

Main fields include:

```text
formId
data
status
rejectionComment
draftAt
submittedAt
approvedAt
rejectedAt
createdAt
updatedAt
```

## API Overview

The frontend communicates with the backend through Axios.

Base API path:

```text
/api
```

### Authentication

```text
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Forms

```text
GET    /api/forms
POST   /api/forms
GET    /api/forms/:id
PUT    /api/forms/:id
DELETE /api/forms/:id
```

### Public Forms

```text
GET /api/public/forms/:id
```

### User Submissions

```text
POST /api/submissions
GET  /api/submissions/:id
PUT  /api/submissions/:id
POST /api/submissions/:id/submit
```

### Admin Submissions

```text
GET /api/admin/submissions
GET /api/admin/submissions/:id
PUT /api/admin/submissions/:id/approve
PUT /api/admin/submissions/:id/reject
```

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
SERVER_PORT=3000
CLIENT_URL=http://localhost:5173
```

Do not commit the `.env` file or expose database credentials and JWT secrets publicly.

## Installation

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd formflow
```

### 2. Install dependencies

If dependencies are configured separately for the frontend and backend:

```bash
cd client
npm install
cd ../server
npm install
cd ..
```

### 3. Configure environment variables

Create the `.env` file in the project root and add the required MongoDB Atlas and JWT configuration.

## Creating the Initial Admin

The project includes an admin seed script:

```text
server/src/scripts/seedAdmin.js
```

Configure the database connection and environment variables first.

Then run the seed script using the command configured in the backend package scripts.

The seed script creates the administrator account and stores the password as a bcrypt hash.

## Running the Application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The frontend is normally available at:

```text
http://localhost:5173
```

The backend is normally available at:

```text
http://localhost:3000
```

## Testing the Complete Flow

A simple end-to-end test can be performed using the following sequence:

```text
1. Login as Admin
2. Create a form
3. Add multiple field types
4. Copy the public form link
5. Open the public form
6. Save a draft
7. Open the saved response again
8. Complete the required fields
9. Submit the response
10. Open the submission from the admin workspace
11. Reject the submission with a comment
12. Open the rejected response
13. Correct the information
14. Submit again
15. Verify the status changes to Submitted immediately
16. Approve the submission
17. Verify the approved response is no longer editable
```

## Error Handling

The backend uses centralized error handling for API errors.

The application provides user-friendly messages for cases such as:

- Invalid login
- Form not found
- Submission not found
- Invalid form data
- Missing required fields
- Invalid dropdown values
- Invalid number values
- Rejection without a comment
- Unauthorized admin access

## Design Approach

The UI is designed to be simple and practical rather than overly complex.

The main areas are:

- Admin dashboard
- Form library
- Form builder
- Submission review
- Public response form

Clear status labels and actions make the form lifecycle easy to understand.

## Security Considerations

The application includes basic security measures:

- Passwords are hashed using bcrypt.
- JWT is used for authenticated admin sessions.
- Protected backend routes require authentication.
- Admin routes require the admin role.
- Form and submission validation is performed on the server.
- MongoDB credentials and JWT secrets are stored in environment variables.
- Public form access is separated from protected admin access.

## Current Scope

The application focuses on the main requirements of dynamic data collection and review:

- Dynamic form creation
- Data collection
- Draft saving
- Submission
- Review
- Approval
- Rejection
- Re-submission after rejection
- Admin authentication

The implementation intentionally keeps the application straightforward and avoids unnecessary complexity.

## Future Improvements

Possible future improvements include:

- More granular roles such as separate administrator and reviewer roles
- User accounts for public form respondents
- Email notifications
- Form versioning
- Advanced search and filtering
- Audit logs
- More field types
- More detailed permission management

## License

This project was created as a technical assignment and demonstration project.
