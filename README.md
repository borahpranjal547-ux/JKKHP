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
- Public application tracking using generated tracking ID
- Admin dashboard for users, applications, status control, and analytics
- Payment transaction ID generation and history with ownership/amount checks
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

## How to Check This Website
1. Start MongoDB locally (or set hosted URI in `backend/.env`).
2. Run backend and frontend using the setup commands above.
3. Open `http://localhost:5173`.
4. Register a citizen account, verify OTP using `/api/auth/verify-otp` payload, then login.
5. Go to Citizen Dashboard:
   - Apply for a service.
   - Upload PDF/JPG/PNG document(s).
   - Note the generated Tracking ID.
   - Complete payment from pending application card.
6. Use **Track Application** menu and enter tracking ID to verify live status.
7. Create an admin user manually in MongoDB by setting role=`admin` for one account.
8. Login as admin and verify:
   - User block/unblock
   - Application status update
   - Analytics counters

## API Summary
- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/login`
- `GET /api/services`
- `POST /api/applications` (multipart docs)
- `GET /api/applications/mine`
- `GET /api/applications/track/:trackingId`
- `PATCH /api/applications/:id/status` (admin)
- `POST /api/payments`
- `GET /api/admin/users` (admin)
- `GET /api/admin/analytics` (admin)

## Deployment
- Frontend: Netlify (set `VITE_API_URL`)
- Backend: Render/Railway (set env from `.env.example`)
- Enable SSL at hosting provider and domain mapping.
