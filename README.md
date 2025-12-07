# Telco Frontend Repository Overview

## 1. Introduction

This repository (`telco-frontend`) contains the frontend application for a telecommunications digital product store. The app allows users to browse and purchase products such as data packages, voice bundles, streaming subscriptions, and roaming plans.

The project is built with **React** and **Vite**, and integrates with:

* **Supabase** (Auth, Profiles, Products, Transaction History, Complaints, User Behaviour)
* **Node.js Recommendation API** (`/recommend`) that forwards requests to a Python-based ML service
* The **Machine Learning repository** (`telco-model`) which trains and exports models (ONNX)

The UI is designed to provide a fully responsive, modern, and seamless customer journey from onboarding to checkout and after-purchase experience.

---

## 2. Project Purpose and Workflow

### Purpose

* Deliver a complete **customer-facing storefront** for browsing and purchasing telco products
* Support **end-to-end checkout** (cart → forms → payment → receipt)
* Provide **behavior-based personalized recommendations**
* Offer **customer support tools** such as complaint submission and transaction history

### High-Level User Workflow

1. **Authentication** via Supabase
2. **Profile Setup** (name, phone, address, preferences)
3. **Product Discovery** (home, dashboard, catalogue, promos, recommendations)
4. **Cart & Checkout**
5. **Transaction Creation** via Supabase REST
6. **Post-Purchase**: receipt page, transaction history, complaint center

---

## 3. Folder Structure

### `/` (Root)

* `README.md` — Project documentation (this file)
* `CONTRIBUTING.md` — Contribution rules
* `package.json` / `package-lock.json` — Project dependencies
* `vite.config.js` — Vite setup
* `.env` — Environment variables (ignored)
* `.gitignore` — Ignored files

### `/src`

#### 1) Entry & Routing

* `main.jsx` — App entry point
* `App.jsx` — Routing logic (public + protected routes)
* `components/ProtectedRoute.jsx` — Redirects unauthenticated users

#### 2) Context

* `context/CartContext.jsx` — Manages items, totals, add/remove/clear cart

#### 3) Components

Navbar, footer, cart sidebar, and all home components (Hero, Categories, CTA, PopularProduct, WhyChoose)

#### 4) Pages

* **Home** — Landing page
* **Login / Signup / Reset Password**
* **Dashboard** — Quick actions, active package, recommendations
* **Product** — Product catalogue
* **Promo** — Promo listing
* **Profile** — Account settings + links
* **SetupProfile** — First-time onboarding
* **Checkout** — Multi-step checkout (contact → address → payment)
* **History** — Transaction list with filters, sorting, pagination
* **ComplaintsCenter** — Submit complaints
* **Receipt** — Purchase summary

#### 5) Services (API)

Inside `src/services/`:

* `authApi.js` — Authentication
* `profilesApi.js` — Profile fetch/update
* `productApi.js` — Product listings
* `transactionApi.js` — Transaction creation/history
* `complaintsApi.js` — Complaints
* `userBehaviourApi.js` — Behaviour tracking
* `recommendationApi.js` — Calls `/api/recommend` → returns product IDs
* `sessionListener.js` — Supabase session helper

#### 6) Styles

All CSS files for each page/component, inside `src/styles/`.

---

## 4. Getting Started Guide

### Prerequisites

* Node.js 18+
* npm
* Git
* Supabase project (URL + anon key)
* Optional: Recommendation API running locally

### Setup Steps

#### 1. Clone Repository

```bash
git clone https://github.com/telco-system-recommendation/telco-frontend.git
cd telco-frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create `.env`:

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Optional: Recommendation API
VITE_MODEL_API_BASE=http://localhost:3000
```

#### 4. Run Development Server

```bash
npm run dev
```

#### 5. Build for Production

```bash
npm run build
```

#### 6. Preview Build

```bash
npm run preview
```

---

## 5. Testing & Quality

### Manual Testing Checklist

#### Authentication

* Signup, login, logout
* Reset password via email

#### Profile

* SetupProfile saves data to Supabase
* Profile updates show in Dashboard & Checkout

#### Checkout Flow

* Card input formatting (number, expiry, CVV)
* E-wallet phone digits-only
* Bank transfer option
* Transaction created successfully

#### Transaction History

* Opened from Dashboard → back returns to Dashboard
* Opened from Profile → back returns to Profile
* Filtering, sorting, pagination

#### Complaints

* Submit complaint
* Data saved in `complaints` table

#### Receipt

* Loads only when checkout passes valid navigation state

---

## 6. Integration with Backend & Machine Learning

### How the Frontend Communicates

```
Frontend → Node.js Recommendation API → FastAPI ML Service → Response → Supabase → Frontend UI
```

### Backend Responsibilities

* Handle `/api/recommend` (Node.js)
* Forward behavior data to FastAPI ML service
* Use Supabase REST for all data operations

### Frontend Responsibilities

* Collect user data (category + behaviour)
* Call `/api/recommend`
* Fetch product details for recommended IDs
* Render “Rekomendasi Model” section

### Important Notes

* Frontend **does not load ML models**
* Models live entirely in the `telco-model` repository
* Recommendation API abstracts predictions from frontend

---

## 7. Support

Refer to:

* `CONTRIBUTING.md`
* Backend repository
* ML repository (`telco-model`)

This ensures the frontend remains clean, modular, maintainable, and fully integrated within the Telco recommendation ecosystem.

---
