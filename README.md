# Digital Citizen Service Portal (Assam-inspired)

Production-oriented full-stack portal with citizen and admin dashboards, secure auth, service management, application lifecycle, document uploads, notifications, and payment processing flow.

## Tech stack
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express + MongoDB
- Auth: JWT + bcrypt
- Uploads: Multer (PDF/JPG/PNG)
- Payments: mock provider abstraction ready for Razorpay/Stripe wiring

## Project structure
- `backend/` API server and Mongo schemas
- `frontend/` citizen/admin portal UI

## Backend setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

`.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jkkhp
JWT_SECRET=change-me
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

## Frontend setup
```bash
cd frontend
npm install
echo 'VITE_API_URL=http://localhost:5000/api' > .env
npm run dev
```

## Key API routes
- `POST /api/auth/register`, `POST /api/auth/verify-otp`, `POST /api/auth/login`
- `GET /api/services` and admin CRUD on `/api/services`
- `POST /api/applications`, `GET /api/applications/me`, admin review with `PATCH /api/applications/:id`
- `POST /api/payments/process`, `GET /api/payments/me`
- `GET /api/admin/analytics`, `/api/admin/users`, `/api/admin/payments/export`
- `GET /api/notifications/me`

## Deployment
- Frontend: Netlify (build `npm run build`, publish `dist`)
- Backend: Render/Railway (start `npm start`, set env vars)
- Use managed MongoDB (Atlas), HTTPS enabled by host
- Set CORS `CLIENT_URL` to domain

## Security notes
- Helmet, CORS, rate limiting, JWT auth, role checks
- Express-validator input validation on auth routes
- Bcrypt password hashing
- Restricted upload MIME and size
