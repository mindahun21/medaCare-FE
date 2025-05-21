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
..
├── eslint.config.js
├── index.html
├── managed_context
│   └── metadata.json
├── package.json
├── package-lock.json
├── public
│   ├── icons
│   └── images
├── README.md
├── src
│   ├── App.tsx
│   ├── contexts
│   │   └── MessageContext.tsx
│   ├── data
│   │   ├── authSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── features
│   │   ├── authentication
│   │   │   ├── AuthSelectors.ts
│   │   │   ├── components
│   │   │   │   ├── ApplicationSubmited.tsx
│   │   │   │   ├── AuthBanner.tsx
│   │   │   │   ├── InstitutionRequestFormOne.tsx
│   │   │   │   ├── InstitutionRequestFormTwo.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── Logout.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── VerifyEmailForm.tsx
│   │   │   ├── InstitutionRequestSchema.ts
│   │   │   └── services
│   │   │       └── authApi.ts
│   │   ├── dashboard
│   │   │   ├── context
│   │   │   │   └── DashBoardContext.tsx
│   │   │   ├── hooks
│   │   │   │   ├── dashboardHooks.ts
│   │   │   │   └── user.ts
│   │   │   ├── pages
│   │   │   │   ├── Appointments.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── InstitutionDetail.tsx
│   │   │   │   ├── Institutions.tsx
│   │   │   │   ├── PatientAppointmentDetail.tsx
│   │   │   │   ├── PatientsDetail.tsx
│   │   │   │   ├── Patients.tsx
│   │   │   │   ├── PhysicianDetail.tsx
│   │   │   │   ├── Physicians.tsx
│   │   │   │   └── Schedules.tsx
│   │   │   ├── schema.ts
│   │   │   ├── services
│   │   │   │   ├── dashboardService.ts
│   │   │   │   └── user.ts
│   │   │   ├── types.ts
│   │   │   └── ui
│   │   │       ├── AddPhysicianFormOne.tsx
│   │   │       ├── AddPhysicianFormTwo.tsx
│   │   │       ├── AddPhysicianModal.tsx
│   │   │       ├── AppointmentsTable.tsx
│   │   │       ├── InstitutionTable.tsx
│   │   │       ├── LeftSideBar.tsx
│   │   │       ├── PatientsTable.tsx
│   │   │       ├── PhysicianTable.tsx
│   │   │       ├── RejectionReason.tsx
│   │   │       └── Table.tsx
│   │   └── profile
│   │       ├── completeProfileSchema.ts
│   │       ├── components
│   │       │   └── physician
│   │       │       ├── CompleteProfileFormOne.tsx
│   │       │       ├── CompleteProfileFormThree.tsx
│   │       │       └── CompleteProfileFormTwo.tsx
│   │       └── services
│   │           └── completeProfile.ts
│   ├── hooks
│   ├── main.tsx
│   ├── pages
│   │   ├── AccountVerified.tsx
│   │   ├── ChooseAccountType.tsx
│   │   ├── CompletePhysicianProfile.tsx
│   │   ├── Guest.tsx
│   │   ├── InstitutionRequest.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── PasswordReset.tsx
│   │   ├── PatientRedirectPage.tsx
│   │   ├── Register.tsx
│   │   └── VerifyEmail.tsx
│   ├── services
│   │   ├── apiClient.ts
│   │   └── uploadFiles.ts
│   ├── styles.css
│   ├── types
│   │   ├── auth.ts
│   │   ├── message.ts
│   │   └── user.ts
│   ├── ui
│   │   ├── GlobalMessage.tsx
│   │   ├── guest
│   │   │   ├── About.tsx
│   │   │   ├── ContactUs.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── Services.tsx
│   │   ├── Layouts
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── ProtectedRoutes.tsx
│   │   │   ├── PublicRoutes.tsx
│   │   │   └── Unauthorized.tsx
│   │   └── shared
│   │       ├── ConsultationChat.tsx
│   │       ├── inputFields
│   │       │   └── FileUploadInput.tsx
│   │       ├── PageLoader.tsx
│   │       ├── PrimaryButton.tsx
│   │       ├── Role.tsx
│   │       ├── SubmitButton.tsx
│   │       └── TextButton.tsx
│   └── utils
│       └── variables.ts
├── tasks.md
├── test.md
├── test_suite_analysis
│   └── metadata.json
├── tsconfig.json
└── vite.config.ts
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
