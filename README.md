# Digital Citizen Service Portal (Assam Inspired)

Production-focused full-stack portal with citizen and admin dashboards, service management, applications, document upload, payment records, and analytics.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth/Security: JWT, bcrypt, helmet, rate limit, validation

## Features
- OTP registration + JWT login with role-based access
- Government and non-government service catalog
- Citizen dashboard for applications, uploads, tracking, and payments
- Admin dashboard for users, applications, status control, and analytics
- Payment transaction ID generation and history
- PWA manifest + responsive government-style UI

## Setup

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Summary
- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `GET /api/services`
- `POST /api/applications` (multipart docs)
- `GET /api/applications/mine`
- `PATCH /api/applications/:id/status` (admin)
- `POST /api/payments`
- `GET /api/admin/users` (admin)
- `GET /api/admin/analytics` (admin)

## Deployment
- Frontend: Netlify (set `VITE_API_URL`)
- Backend: Render/Railway (set env from `.env.example`)
- Enable SSL at hosting provider and domain mapping.
