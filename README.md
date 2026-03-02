# Digital Citizen Service Portal (Assam Inspired)

Full-stack MERN government-style citizen portal with citizen and admin dashboards.

## Stack
- Frontend: React + Vite + Tailwind + Recharts
- Backend: Node.js + Express + MongoDB + JWT + Multer + Razorpay (with demo fallback)

## Features
- OTP-based registration (demo OTP flow), JWT login, role-based access.
- Services catalog (23 services pre-seeded: Government + Non-Government).
- Citizen dashboard: profile, apply for services, track status, payment history, notifications.
- Admin dashboard: user management, application approval/rejection, service CRUD, payment overview, broadcast notifications, analytics cards + chart.
- Secure middleware: `helmet`, input validation, password hashing (`bcrypt`), upload filtering for PDF/JPG/PNG.

## Folder Structure
- `backend/` API server, models, controllers, routes
- `frontend/` web app UI

## Setup
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Demo Admin
Create an admin directly in MongoDB by setting `role: "admin"` for a user record, or add a seed script if needed.

## Deployment
- Frontend: Netlify (`frontend/dist` build output)
- Backend: Render/Railway (Node service)
- MongoDB: Atlas
- Set `VITE_API_URL` and backend env vars in platform settings.

## Production Notes
- Replace demo OTP with SMS/email provider.
- Enable HTTPS + strong JWT secret.
- Add Razorpay keys for live payments.
- Move uploads to cloud storage (Firebase/S3) for scale.
