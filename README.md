# 🏥 MedaCare Frontend

This is the frontend codebase for **MedaCare**, a health-focused application built with **React** and **Vite**. The project follows a **feature-based** folder structure for scalability and maintainability.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mindahun21/medaCare-FE.git
cd medaCare-FE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

---

## 📁 Project Structure

```text
.
├── public/                     # Static assets
│   ├── images/                # App images (e.g., logo, medacare.png)
│   └── vite.svg               # Vite logo (default)
├── src/
│   ├── App.tsx                # Root component
│   ├── main.tsx               # App entry point
│   ├── styles.css             # Global styles
│   ├── data/                  # Static or seeded data
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions/helpers
│   ├── services/              # Global API clients & service logic
│   │   └── apiClient.ts
│   ├── features/              # Feature-based modules
│   │   ├── authentication/
│   │   │   ├── components/    # Auth UI components
│   │   │   │   ├── AuthBanner.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── services/      # Auth-related services (API calls, etc.)
│   │   │   │   └── authApi.ts
│   │   │   └── types.ts       # Type definitions for authentication
│   │   └── dashboard/         # (To be developed)
│   ├── pages/                 # Route-level components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── NotFound.tsx
│   ├── ui/                    # Reusable UI components
│   │   └── shared/            # Shared UI elements (buttons, inputs, etc.)
├── eslint.config.js           # ESLint configuration
├── vite.config.ts             # Vite configuration (TypeScript)
├── index.html                 # HTML template
├── tsconfig.json              # TypeScript compiler configuration
├── package.json
├── package-lock.json
└── README.md                  # Project overview and setup instructions

```

---

## 🧪 Development Conventions

- Use **feature-based structure**: keep components, services, slices, and tests grouped by feature (e.g., authentication, dashboard).
- Shared components go in `src/ui/shared/`.
- Reusable logic should be moved to `hooks/` or `utils/` where appropriate.
- Use `authApi.js` to manage all API requests related to authentication.
- Use `apiClient.js` to centralize Axios or other HTTP configurations.

---

## 🛠 Tech Stack

- **React** with functional components and hooks
- **Vite** for fast development
- **Tailwind CSS** (recommended to be added if not yet)
- **React Router** for routing (expected)
- **ESLint** for code linting

---

## ✅ Future Plans

- [ ] Add `dashboard` features (e.g., patient list, appointment booking)
- [ ] Setup authentication with JWT or OAuth
- [ ] Integrate with backend APIs
- [ ] Add unit/integration tests

---

## 🤝 Contributing

1. Create a new branch from `main`
2. Follow the feature-based folder structure
3. Open a PR with clear description and screenshots (if applicable)

---
