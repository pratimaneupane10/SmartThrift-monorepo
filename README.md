# SmartThrift (Thriftmarket)

Monorepo combining the frontend and backend for the SmartThrift / Thriftmarket capstone project.

## Structure

```
SmartThrift-monorepo/
├── frontend/    # React Native app (buyer, seller, admin screens)
└── backend/     # Node.js/Express/MongoDB API + Python Flask ML service
```

## Running locally (frontend ↔ backend ↔ MongoDB)

### 1. Backend

```bash
cd backend
npm install
npm run dev        # or: node server.js
```

`backend/.env` already has `MONGO_URI`, `JWT_SECRET`, `PORT=5000`. On start you should see:
```
MongoDB Connected: <atlas-host>
Server running on http://0.0.0.0:5000
```
Verify it's alive: open `http://localhost:5000` in a browser — you should see "Server is working".

(Optional) ML recommendation service, in a second terminal:
```bash
cd backend
python ml_service.py
```

### 2. Point the frontend at your backend

Edit `frontend/src/api/config.js` and set `API_BASE_URL`:

| How you're running the app          | API_BASE_URL to use                  |
|--------------------------------------|---------------------------------------|
| iOS Simulator                        | `http://localhost:5000`               |
| Android Emulator (AVD)               | `http://10.0.2.2:5000`                |
| Expo Go on a real phone              | `http://<your-computer-LAN-IP>:5000`  |

Find your LAN IP: `ipconfig` (Windows, look for "IPv4 Address") or `ifconfig | grep inet` (Mac/Linux). Phone and computer must be on the same Wi-Fi.

### 3. Frontend

```bash
cd frontend
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a`/`i` for an emulator/simulator.

### 4. Try it end-to-end

- **Sign up** on the app → this calls `POST /api/auth/register` → creates a real `User` document in MongoDB, returns a JWT stored on-device.
- **Log in** → calls `POST /api/auth/login`, verifies the password against the DB.
- **Home feed** → calls `GET /api/products`. If your database has no products yet, the screen falls back to the built-in mock items so it still renders — add a product (via `POST /api/products` as a seller/admin, or directly in MongoDB) to see real data show up.

## What's wired up so far

- Auth: Login & Sign Up screens call the real backend and store a JWT (`src/api/authApi.js`, `src/context/AuthContext.js`)
- Products: Home feed fetches from `GET /api/products`, with mock-data fallback while your DB is empty (`src/api/productsApi.js`)
- Not yet wired: orders, wishlist, chat, notifications, admin — these screens still use mock/local state. Ask if you want these connected next.

## Notes

- `node_modules` and `.git`/`.expo` folders were excluded from this bundle — run `npm install` in each subfolder to restore dependencies.
- Backend is also deployed at `https://thriftmarket-backend.onrender.com` (Render, Root Directory: `Backend`, build: `npm install`, start: `node server.js`) if you'd rather point the frontend there instead of running it locally.
