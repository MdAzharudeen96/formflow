# FormFlow — GEMINI.md

## AI CODING AGENT MASTER INSTRUCTIONS

You are the AI coding agent responsible for building **FormFlow**, a professional full-stack dynamic form creation, submission, validation, and admin approval application.

This file is the primary instruction and project context for the AI agent.

Before performing ANY development task, read this entire file and understand the project requirements, architecture, design rules, development phases, and restrictions.

---

# 1. PROJECT IDENTITY

**Project Name:** FormFlow

**Project Type:** Full-Stack Dynamic Form Management & Approval System

**Repository:**
https://github.com/MdAzharudeen96/formflow

**Primary Branch:**
main

**Current Development Phase:**
Phase 0 — Product, UI/UX and Architecture Foundation

---

# 2. ACTION

ACT as a senior full-stack JavaScript developer, software architect, UI/UX designer, database designer, and AI coding agent.

Build the FormFlow application incrementally according to the development phases defined in this document.

You must:

- Understand the complete product before implementing features.
- Follow the current phase strictly.
- Write clean and maintainable code.
- Keep frontend and backend responsibilities separated.
- Reuse components.
- Follow the defined UI/UX system.
- Maintain compatibility with previous phases.
- Test every implementation before considering it complete.
- Explain important technical decisions when necessary.

Do not make major architectural decisions without considering the requirements in this file.

---

# 3. PURPOSE

FormFlow is designed to solve the following workflow:

An Admin creates a custom form → configures fields and validation → publishes the form → public users fill and submit the form → the backend validates and stores the submission → the Admin reviews the submission → the Admin accepts or rejects it.

The application should feel like a simple, modern SaaS product.

The project should demonstrate real-world full-stack development practices including:

- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- Authentication
- Authorization
- Dynamic forms
- Client-side validation
- Server-side validation
- Admin workflows
- Database relationships
- Responsive UI
- Accessibility
- Error handling
- Testing
- Security
- AI-assisted development

---

# 4. CURRENT TASK — PHASE 0

## ACTION ->

Establish the complete product, UI/UX, architecture, technical direction, and development plan for FormFlow.

## PURPOSE ->

Create a reliable foundation that future AI coding agents can follow without repeatedly making conflicting architectural or UI decisions.

## INPUT ->

Use:

1. This `GEMINI.md`.
2. The existing FormFlow repository.
3. The requirements defined in this document.
4. Existing files in the repository.

## OUTPUT ->

For Phase 0, DO NOT build the application.

The current task is to establish the project specification and prepare the project for Phase 1.

---

# 5. CRITICAL PHASE 0 RESTRICTION

During Phase 0:

DO NOT:

- Create React components.
- Create React pages.
- Create Express routes.
- Create controllers.
- Create database collections.
- Create database setup scripts.
- Implement authentication.
- Implement APIs.
- Install application dependencies.
- Create frontend source code.
- Create backend source code.
- Build the dashboard.
- Build the Form Builder.
- Build public forms.
- Build submission functionality.

Phase 0 is planning and specification only.

The actual application starts in Phase 1.

---

# 6. PRODUCT REQUIREMENTS

FormFlow has two primary user types.

## ADMIN

The Admin is responsible for managing the complete form and submission lifecycle.

Admin capabilities:

- Login.
- View dashboard.
- Create forms.
- Edit forms.
- Delete forms.
- Save forms as drafts.
- Add fields.
- Configure fields.
- Configure validation rules.
- Reorder fields.
- Preview forms.
- Publish forms.
- Close forms.
- View submissions.
- Filter submissions.
- View submission details.
- Accept submissions.
- Reject submissions.
- Provide rejection reasons.
- Manage profile/settings.
- Logout.

---

## PUBLIC USER

Public users do not need to register for the initial version.

Public users can:

- View available published forms.
- Open a form.
- Read form information.
- Fill the form.
- Receive validation feedback.
- Correct validation errors.
- Submit the form.
- Receive a submission confirmation.
- Receive a tracking reference when applicable.

Public users cannot:

- Create forms.
- Edit forms.
- Access Admin pages.
- Review submissions.
- Accept or reject submissions.

---

# 7. CORE PRODUCT WORKFLOW

The complete workflow is:

Admin:

    Login
      ↓
    Dashboard
      ↓
    Forms
      ↓
    Create Form
      ↓
    Add Fields
      ↓
    Configure Fields
      ↓
    Configure Validation
      ↓
    Preview
      ↓
    Save Draft
      ↓
    Publish
      ↓
    Public Form URL
      ↓
    Receive User Submissions
      ↓
    Review Submission
      ↓
    Accept / Reject

User:

    Open Public Form
      ↓
    Read Form Details
      ↓
    Fill Fields
      ↓
    Client Validation
      ↓
    Submit
      ↓
    Server Validation
      ↓
    Save Submission
      ↓
    Submission = Pending
      ↓
    Success Page

---

# 8. FORM LIFECYCLE

Forms have three states:

    Draft → Published → Closed

## Draft

- Form is being created or edited.
- Form is not publicly accessible.
- Admin can modify the form structure.

## Published

- Form is publicly accessible.
- Users can submit responses.
- Structural changes should be restricted once submissions exist.

## Closed

- Form remains accessible through its public URL.
- New submissions are disabled.
- User sees a clear "This form is no longer accepting submissions" message.

---

# 9. SUBMISSION LIFECYCLE

Submissions have three states:

    Pending → Accepted
          ↘
            Rejected

## Pending

New submission waiting for Admin review.

## Accepted

Admin has approved the submission.

## Rejected

Admin has rejected the submission.

Rejected submissions should support a rejection reason.

---

# 10. FORM FIELD TYPES

The initial Form Builder should support:

1. Short Text
2. Long Text / Textarea
3. Email
4. Number
5. Phone
6. Date
7. Select / Dropdown
8. Radio
9. Checkbox
10. File Upload

The architecture must allow additional field types to be added later.

Each field should conceptually support:

- Label
- Field name
- Placeholder
- Help text
- Required
- Default value where applicable
- Options where applicable
- Validation rules
- Display order

---

# 11. FORM BUILDER REQUIREMENTS

The Form Builder is the most important Admin feature.

The conceptual layout should be:

    -------------------------------------------------
    | Form Title | Save | Preview | Publish         |
    -------------------------------------------------
    |                                               |
    |              FORM CANVAS                      |
    |                                               |
    |  Field 1                                     |
    |  Field 2                                     |
    |  Field 3                                     |
    |                                               |
    |              + Add Field                      |
    |                                               |
    |                            PROPERTIES PANEL   |
    |                            -----------------  |
    |                            Label              |
    |                            Field Name         |
    |                            Placeholder        |
    |                            Required           |
    |                            Validation         |
    -------------------------------------------------

Desktop:

- Canvas in the main area.
- Properties panel on the right.

Mobile:

- Canvas uses full width.
- Properties panel becomes a drawer/off-canvas panel.

---

# 12. FIELD ORDERING

For the first implementation, DO NOT implement complex drag-and-drop.

Use:

- Move Up
- Move Down

buttons.

The architecture should be designed so drag-and-drop can be added later without rewriting the Form Builder.

---

# 13. FIELD CONFIGURATION

When an Admin selects a field, the Properties Panel should display the appropriate configuration.

Common configuration:

- Label
- Field Name
- Placeholder
- Help Text
- Required

Type-specific configuration should appear only when applicable.

Example:

Dropdown:

- Label
- Field Name
- Options
- Required

Number:

- Label
- Field Name
- Minimum
- Maximum
- Required

Validation configuration should be separated into an Advanced Validation section.

---

# 14. PUBLIC FORM REQUIREMENTS

Public forms should use a simple single-column layout.

Conceptual structure:

    Form Title
    Description

    Field
    Validation Message

    Field
    Validation Message

    Field
    Validation Message

    Submit Button

Requirements:

- Clear labels.
- Required indicator.
- Helpful placeholder text.
- Helpful descriptions.
- Inline validation.
- Accessible fields.
- Mobile-friendly layout.
- Clear submit button.
- Loading state during submission.
- Success state after submission.
- Error state if submission fails.

---

# 15. VALIDATION REQUIREMENTS

Validation must happen in two places.

## CLIENT SIDE

Purpose:

Provide immediate feedback and a good user experience.

Examples:

- Required field missing.
- Invalid email.
- Invalid phone number.
- Number outside allowed range.
- Text exceeds maximum length.
- Invalid file type.

Errors should be descriptive.

Bad:

    Invalid input.

Good:

    Please enter a valid email address.

---

## SERVER SIDE

The backend must never trust client-side validation.

The server must validate incoming data independently.

If validation fails, return structured validation errors that the frontend can map to individual fields.

---

# 16. ADMIN DASHBOARD

The Admin Dashboard should provide an at-a-glance overview.

Recommended structure:

Top:

- Page title.
- Welcome/context information.

Metrics:

- Total Forms.
- Published Forms.
- Pending Submissions.
- Accepted Submissions.

Additional sections:

- Recent Forms.
- Recent Submissions.

Each section should support loading, empty, and error states.

---

# 17. ADMIN FORMS PAGE

The Forms page should allow Admins to manage forms.

Display:

- Form Name.
- Status.
- Submission Count.
- Created Date.
- Actions.

Possible actions:

- View.
- Edit.
- Delete.
- Publish.
- Close.
- Duplicate.

Use confirmation dialogs for destructive actions.

---

# 18. ADMIN SUBMISSIONS PAGE

The Submissions page should allow Admins to:

- View submissions.
- Filter by form.
- Filter by status.
- Filter by date.
- Open submission details.

Statuses:

- Pending
- Accepted
- Rejected

---

# 19. SUBMISSION REVIEW PAGE

Use a two-column layout on desktop.

LEFT:

Display submitted data.

Example:

    Full Name
    John Doe

    Email
    john@example.com

    Phone
    +91...

RIGHT:

Display:

- Submission ID.
- Form Name.
- Submitted Date.
- Current Status.
- Accept button.
- Reject button.

Reject action should allow an optional rejection reason.

---

# 20. REQUIRED ROUTES

## Public Routes

    /
    /f/:formId
    /s/:submissionId/success

## Authentication

    /login

## Admin Routes

    /admin
    /admin/forms
    /admin/forms/new
    /admin/forms/:formId/edit
    /admin/submissions
    /admin/submissions/:submissionId
    /admin/settings

Future routes may be added when requirements justify them.

---

# 21. NAVIGATION

## PUBLIC HEADER

Include:

- FormFlow logo/name.
- Public Forms.
- Admin Login.

Keep the public navigation simple.

---

## ADMIN SIDEBAR

Include:

- Dashboard
- Forms
- Submissions
- Settings
- Profile
- Logout

Use Lucide React icons.

Do not use emoji as primary navigation icons.

---

# 22. DESIGN DIRECTION

The application should have a:

**Modern, clean, professional SaaS aesthetic.**

Prioritize:

- Readability.
- White space.
- Clear hierarchy.
- Consistent spacing.
- Subtle borders.
- Simple cards.
- Professional forms.
- Clear buttons.
- Accessible contrast.

Avoid:

- Excessive gradients.
- Excessive animations.
- Glassmorphism everywhere.
- Huge decorative illustrations.
- Excessive shadows.
- Unnecessary visual complexity.

---

# 23. COLOR SYSTEM

Primary:

    #2563EB

Secondary:

    #475569

Background:

    #F8FAFC

Surface:

    #FFFFFF

Border:

    #E2E8F0

Primary Text:

    #0F172A

Secondary Text:

    #64748B

Success:

    #16A34A

Warning:

    #D97706

Error:

    #DC2626

Use colors consistently.

Do not randomly introduce additional colors.

---

# 24. TYPOGRAPHY

Preferred font:

    Inter

Fallback:

    system-ui, sans-serif

Typography should have a clear hierarchy.

Use:

- Large bold page headings.
- Medium-weight section headings.
- Readable body text.
- Smaller muted supporting text.

---

# 25. SPACING

Use a 4px spacing system.

Preferred values:

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

Avoid inconsistent arbitrary spacing.

---

# 26. RESPONSIVE DESIGN

Use mobile-first development.

Breakpoints:

    sm: 640px
    md: 768px
    lg: 1024px
    xl: 1280px

Requirements:

### Mobile

- Sidebar becomes a drawer.
- Tables become cards where necessary.
- Forms use full available width.
- Buttons remain easy to tap.
- Form Builder properties become a drawer.

### Desktop

- Sidebar remains visible.
- Tables use normal table layout.
- Form Builder uses canvas + properties panel.

---

# 27. ACCESSIBILITY

Follow WCAG AA principles.

Requirements:

- Semantic HTML.
- Proper labels.
- Keyboard navigation.
- Visible focus states.
- Accessible buttons.
- Accessible forms.
- `aria-invalid` for invalid fields.
- `aria-describedby` for validation messages.
- Proper modal focus handling.
- Escape closes modals.
- Do not rely only on color to communicate state.
- Maintain sufficient color contrast.

---

# 28. LOADING STATES

Use appropriate loading states.

For data-heavy pages:

- Skeleton loaders.

For actions:

- Button spinner/loading state.

Do not use unnecessary full-screen loading screens.

---

# 29. EMPTY STATES

Every major list should have an empty state.

Example:

    No forms created yet.

    Create your first form to get started.

With:

    [Create Form]

Empty states should explain what happened and what the user can do next.

---

# 30. ERROR STATES

Errors should be user-friendly.

Use:

- Inline validation errors for forms.
- Toasts for temporary action failures.
- Inline alerts for important form/API errors.
- Dedicated 404 page.
- Dedicated general error page.

Never leave the application on a blank white screen.

---

# 31. CONFIRMATION RULES

Destructive actions MUST require confirmation.

Examples:

- Delete Form.
- Reject Submission.
- Delete Field where appropriate.

Important state-changing actions should also have confirmation when necessary.

Examples:

- Publish Form.
- Close Form.

---

# 32. REUSABLE COMPONENT STRATEGY

Avoid duplicated UI code.

Reusable components should eventually include:

## Layout

- Header
- Sidebar
- Container
- Card
- Modal
- ConfirmationDialog
- EmptyState

## Form UI

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Label
- FormField

## Form Domain

- DynamicField
- FormRenderer
- FieldConfigurator

## Data Display

- Table
- Badge
- StatusBadge
- Pagination
- Toast
- LoadingState
- ErrorState

---

# 33. FRONTEND STACK

Use:

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Lucide React

Authentication state should use React Context initially.

Form Builder state can use local React state unless requirements later justify another solution.

Do not introduce Redux or another large state-management library without a real requirement.

---

# 34. FRONTEND STRUCTURE

Target structure:

    client/
    └── src/
        ├── assets/
        ├── components/
        ├── features/
        │   ├── auth/
        │   ├── forms/
        │   └── submissions/
        ├── layouts/
        ├── pages/
        ├── services/
        ├── context/
        ├── utils/
        └── App.jsx

Keep domain-specific functionality inside `features`.

Keep reusable UI inside `components`.

---

# 35. BACKEND STACK

Use:

- Node.js
- Express.js
- MongoDB
- Mongoose

Use the following architecture:

    Routes
      ↓
    Controllers
      ↓
    Services
      ↓
    Database

Use centralized error handling.

Use environment variables for configuration.

---

# 36. BACKEND STRUCTURE

Target structure:

    server/
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        ├── services/
        └── utils/

Do not mix frontend and backend responsibilities.

---

# 37. DATABASE DIRECTION

Use MongoDB with Mongoose.

Keep the database architecture simple and use these collections:

  users
  forms
  submissions

User document:

  _id
  name
  email
  passwordHash
  createdAt

Form document:

  _id
  userId
  title
  description
  status
  fields
  createdAt
  updatedAt

The `fields` array stores flexible dynamic field definitions. Each field can
contain:

- `type`
- `label`
- `name`
- `placeholder`
- `helpText`
- `required`
- `options`
- Validation rules
- `order`

Submission document:

  _id
  formId
  data
  status
  submittedAt
  reviewedBy
  reviewedAt
  rejectionReason

The `data` object stores submitted values dynamically. User, form, and
submission references should use MongoDB ObjectId values through Mongoose.

The exact Mongoose model implementation belongs to Phase 2.

Do not implement the database during Phase 0.

---

# 38. AUTHENTICATION DIRECTION

Admin authentication will use JWT.

Preferred browser strategy:

**HTTP-only cookies**

Do not store authentication tokens in localStorage unless explicitly approved later.

Authentication implementation belongs to Phase 4.

---

# 39. SECURITY REQUIREMENTS

The final application must include:

- Password hashing.
- JWT authentication.
- Admin authorization.
- Protected Admin API routes.
- Server-side validation.
- Input sanitization.
- Secure environment variables.
- CORS configuration.
- File upload validation.
- Appropriate rate limiting.
- Safe error responses.

Never commit secrets.

Never expose:

- MongoDB credentials.
- JWT secrets.
- API keys.
- Private credentials.

---

# 40. ENVIRONMENT VARIABLES

Use `.env` for secrets and environment-specific configuration.

Provide `.env.example` later.

Never commit `.env`.

Example conceptual variables:

    MONGODB_URI=
    JWT_SECRET=
    CLIENT_URL=
    SERVER_PORT=

Actual variables may be adjusted during implementation.

---

# 41. API DIRECTION

Future API structure:

## Authentication

    POST /api/auth/login
    POST /api/auth/logout
    GET /api/auth/me

## Admin Forms

    GET /api/admin/forms
    POST /api/admin/forms
    GET /api/admin/forms/:id
    PUT /api/admin/forms/:id
    DELETE /api/admin/forms/:id

## Public Forms

    GET /api/public/forms
    GET /api/public/forms/:id

## Public Submission

    POST /api/public/forms/:id/submit

## Admin Submissions

    GET /api/admin/submissions
    GET /api/admin/submissions/:id
    PUT /api/admin/submissions/:id/review

The actual API implementation must happen during the appropriate phases.

---

# 42. GIT WORKFLOW

Repository:

    https://github.com/MdAzharudeen96/formflow.git

Branch:

    main

Use conventional commits.

Examples:

    docs: add FormFlow project specification
    feat: add project foundation
    feat: add database configuration
    feat: add admin authentication
    feat: add form builder
    fix: validate dynamic form fields
    refactor: improve submission service
    test: add authentication tests

Rules:

- Never force push.
- Never delete `.git`.
- Never initialize another Git repository inside FormFlow.
- Do not modify Git history unnecessarily.
- Keep commits focused.
- Commit after successfully completing each meaningful phase.

---

# 43. DEVELOPMENT PHASES

The project must be implemented in this order.

## PHASE 0 — PRODUCT & ARCHITECTURE

Current phase.

No application code.

Deliverable:

- Product requirements.
- UI/UX specification.
- Architecture.
- Design system.
- Database direction.
- API direction.
- Security direction.
- Development roadmap.

---

## PHASE 1 — PROJECT FOUNDATION

Build:

- React + Vite frontend.
- Node + Express backend.
- Tailwind CSS.
- ESLint.
- Basic folder structure.
- Environment configuration.
- Development scripts.
- Basic frontend page.
- Basic backend health endpoint.
- Frontend/backend connectivity verification.

Do NOT build:

- Authentication.
- Database features.
- Form Builder.
- Dashboard functionality.
- Submission functionality.

---

## PHASE 2 — DATABASE AND DATA MODEL SETUP — MONGODB

Build:

- MongoDB connection.
- Mongoose setup.
- User model.
- Form model.
- Submission model.
- Database connection verification.

---

## PHASE 3 — BACKEND FOUNDATION

Build:

- Express application structure.
- Routes.
- Controllers.
- Services.
- Middleware.
- Validation.
- Error handling.
- API response structure.

---

## PHASE 4 — AUTHENTICATION

Build:

- Admin login.
- Password hashing.
- JWT.
- HTTP-only cookie authentication.
- Protected routes.
- Authorization.
- Logout.
- Current-admin endpoint.

---

## PHASE 5 — ADMIN DASHBOARD

Build:

- Admin layout.
- Sidebar.
- Header.
- Routing.
- Dashboard.
- Metric cards.
- Recent forms.
- Recent submissions.

---

## PHASE 6 — FORM BUILDER

Build:

- Create form.
- Edit form.
- Add fields.
- Remove fields.
- Move fields.
- Configure basic field properties.
- Save draft.
- Preview.

---

## PHASE 7 — VALIDATION & FIELD CONFIGURATION

Build:

- Field-specific configuration.
- Validation rules.
- Dynamic field rendering.
- Client-side validation.
- Server-side validation.
- Validation error mapping.

---

## PHASE 8 — FORM PUBLISHING

Build:

- Publish form.
- Close form.
- Public form URL.
- Public forms list.
- Public form details.
- Public dynamic form rendering.

---

## PHASE 9 — SUBMISSIONS

Build:

- Public submission endpoint.
- Submission validation.
- Submission persistence.
- Submission confirmation.
- Tracking reference.

---

## PHASE 10 — SUBMISSION MANAGEMENT

Build:

- Admin submissions list.
- Filtering.
- Pagination.
- Submission details.
- Submission data rendering.

---

## PHASE 11 — APPROVAL WORKFLOW

Build:

- Accept submission.
- Reject submission.
- Rejection reason.
- Status updates.
- Confirmation dialogs.
- Review history where appropriate.

---

## PHASE 12 — UI/UX POLISH

Improve:

- Responsive design.
- Accessibility.
- Loading states.
- Empty states.
- Error states.
- Toast notifications.
- Form UX.
- Mobile experience.
- Visual consistency.

---

## PHASE 13 — TESTING & SECURITY

Perform:

- Frontend testing.
- Backend testing.
- API testing.
- Authentication testing.
- Authorization testing.
- Validation testing.
- Security review.
- Error handling review.

---

## PHASE 14 — DOCUMENTATION & PRODUCTION

Complete:

- README.
- Setup instructions.
- Environment documentation.
- API documentation.
- `.env.example`.
- Production configuration.
- Deployment preparation.
- Final project cleanup.

---

# 44. PHASE EXECUTION RULE

When asked to implement a phase:

1. Read `GEMINI.md`.
2. Identify the requested phase.
3. Inspect the existing project.
4. Inspect existing files before modifying them.
5. Understand what previous phases already implemented.
6. Create a short implementation plan.
7. Implement ONLY the requested phase.
8. Do not implement future phases.
9. Run the application.
10. Run appropriate tests/checks.
11. Fix errors.
12. Review the implementation.
13. Report the result.

---

# 45. DO NOT JUMP AHEAD

For example:

If the task is Phase 1, do NOT implement:

- MongoDB.
- JWT.
- Login.
- Form Builder.
- Dynamic forms.
- Submission APIs.
- Admin approval.

If the task is Phase 6, do not rebuild the authentication system unless required to make the existing feature work.

Always respect phase boundaries.

---

# 46. CODE QUALITY RULES

Write code that is:

- Simple.
- Readable.
- Maintainable.
- Reusable.
- Modular.
- Consistent.

Avoid:

- Giant components.
- Giant files.
- Duplicate logic.
- Duplicate UI components.
- Unnecessary abstractions.
- Unnecessary dependencies.
- Hard-coded secrets.
- Hard-coded API URLs.
- Magic values when constants are appropriate.

Prefer clear code over clever code.

---

# 47. DEPENDENCY RULES

Before installing a dependency:

1. Check whether the existing stack already solves the problem.
2. Prefer lightweight and well-maintained packages.
3. Avoid adding dependencies for simple functionality.
4. Do not introduce UI libraries such as Material UI, Ant Design, Chakra UI, etc. unless explicitly approved.

The primary UI system should remain:

**Tailwind CSS + reusable custom components + Lucide React.**

---

# 48. ERROR HANDLING RULES

Never silently ignore errors.

Frontend:

- Display useful messages.
- Log technical information appropriately during development.
- Handle API failures.
- Handle loading states.

Backend:

- Use centralized error handling.
- Return consistent API responses.
- Do not expose sensitive internal errors to clients.

---

# 49. API RESPONSE PRINCIPLE

API responses should be predictable and consistent.

Success responses should clearly communicate the result.

Validation failures should provide field-specific information where applicable.

Example conceptual structure:

    {
      success: false,
      message: "Validation failed",
      errors: [
        {
          field: "email",
          message: "Please enter a valid email address"
        }
      ]
    }

The exact implementation can be finalized during Phase 3.

---

# 50. FILE UPLOAD PRINCIPLE

File uploads must eventually include:

- Allowed file types.
- File size limits.
- Server-side validation.
- Safe file naming.
- Secure storage strategy.

Do not implement file upload functionality until the relevant phase.

---

# 51. AI DEVELOPMENT RULES

AI-generated code must still be reviewed.

Do not assume generated code is correct.

Before accepting generated code:

- Check imports.
- Check dependencies.
- Check types/props.
- Check API URLs.
- Check error handling.
- Check security.
- Check responsive behavior.
- Check accessibility.
- Run the application.

Do not blindly generate large amounts of unnecessary code.

---

# 52. WHEN MODIFYING EXISTING CODE

Before modifying a file:

1. Read the existing file.
2. Understand its responsibility.
3. Check whether the required functionality already exists.
4. Reuse existing components where possible.
5. Make the smallest clean change necessary.
6. Avoid unrelated refactoring.

---

# 53. FINAL RESPONSE REQUIRED AFTER EACH IMPLEMENTATION

After completing a requested phase, provide a concise implementation report containing:

## 1. Completed

What was implemented.

## 2. Files Changed

List created and modified files.

## 3. Dependencies

List newly installed dependencies and why they were needed.

## 4. How to Run

Give exact commands.

Example:

    npm install
    npm run dev

If frontend and backend have separate commands, explain them clearly.

## 5. How to Test

Give practical test steps.

## 6. Validation

Mention whether the application was successfully tested.

## 7. Known Issues

Clearly mention anything that remains unresolved.

## 8. Next Phase

State which phase should be implemented next.

Do NOT automatically implement it.

---

# 54. PHASE 0 DEFINITION OF DONE

Phase 0 is complete when:

- [ ] Product purpose is clearly defined.
- [ ] Admin role is defined.
- [ ] Public User role is defined.
- [ ] User journeys are defined.
- [ ] Form lifecycle is defined.
- [ ] Submission lifecycle is defined.
- [ ] Required routes are defined.
- [ ] Required screens are defined.
- [ ] Form Builder behavior is defined.
- [ ] Dynamic form behavior is defined.
- [ ] Validation strategy is defined.
- [ ] Submission review workflow is defined.
- [ ] Responsive behavior is defined.
- [ ] Accessibility requirements are defined.
- [ ] Design system is defined.
- [ ] Reusable component strategy is defined.
- [ ] Frontend architecture is defined.
- [ ] Backend architecture is defined.
- [ ] Database direction is defined.
- [ ] API direction is defined.
- [ ] Security requirements are defined.
- [ ] Development phases are defined.
- [ ] AI coding rules are defined.
- [ ] No application code has been implemented.

---

# 55. IMPORTANT FINAL RULE

FormFlow must be built **phase by phase**.

Never attempt to build the entire application at once.

Never skip a phase without explicit instruction.

Never implement future functionality simply because it is described in this document.

This document defines the complete product vision.

The current phase determines what should actually be implemented.

When a task conflicts with this document, stop and explain the conflict before making a major architectural change.

---

# CURRENT STATUS

Phase 0 specification is being established.

After Phase 0 is committed to Git, the next task will be:

**Phase 1 — Project Foundation and Development Environment Setup.**