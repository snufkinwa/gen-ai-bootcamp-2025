# Front End - Technical Specification

## Technology Stack

- **Frontend**: Next.js 15.1.7, React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI Primitives
- **Animation**: Framer Motion
- **Auth**: Amazon Cognito
- **Infrastructure**: AWS Amplify (frontend), EC2 free tier (backend)

## Application Structure

```
frontend-nextjs/
├── public/                # Static assets
├── src/
│   ├── components/        # UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and services
│   ├── pages/             # Page components
│   └── styles/            # Global styles
├── .env.local             # Environment variables
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Key Pages

- **Home** (`/`): Landing page
- **Auth**: Login (`/login`) and Signup (`/signup`)
- **Dashboard** (`/dashboard`): User progress tracking
- **Learning Tools**:
  - Kana Writing Game (`/kana-game`)
  - Pronunciation Practice (`/pronunciation`)
  - Visual Novel (`/visual-novel`)

## Responsive Design

- Mobile-first with breakpoints at 768px and 1024px

## Authentication

- Registration and email verification via Cognito
- JWT tokens stored securely
- Protected routes redirect to login

## Hosting Configuration

### AWS Amplify (Frontend)

- Build command: `npm run build`
- Output directory: `.next`
- Node.js 18.x

### EC2 Free Tier (Backend)

- t2.micro instance with FastAPI
- Gunicorn + Nginx
- API endpoints for evaluation and data services

## CI/CD

- Code Rabbit for automated code reviews
- Automatic deployment to Amplify on merge to main

## Security

- Content Security Policy implementation
- JWT token security with rotation
- Input validation and XSS protection
