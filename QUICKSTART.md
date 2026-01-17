# 🚀 InvestWise Quick Start Guide

## ✅ Localhost is Now Working!

The application has been fully implemented and both frontend and backend are running successfully.

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 🎯 What's Been Built

### Backend Features (Port 5000)
- ✅ User authentication (register/login with JWT)
- ✅ User profile management
- ✅ Portfolio tracking and management
- ✅ Holdings (stocks, mutual funds, ETFs, bonds)
- ✅ Financial goals tracking
- ✅ Risk assessment system
- ✅ Dashboard with analytics
- ✅ Investment recommendations
- ✅ Transaction history
- ✅ PostgreSQL database with Prisma ORM

### Frontend Features (Port 3000)
- ✅ Modern responsive UI with Tailwind CSS
- ✅ Landing page with features showcase
- ✅ User registration and login
- ✅ Protected dashboard
- ✅ Portfolio management interface
- ✅ Financial goals page
- ✅ Risk assessment page
- ✅ User profile management
- ✅ Real-time data from backend API

## 🏃 Running the Application

### Option 1: Quick Start (Both Servers)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using the Troubleshoot Script

```bash
./troubleshoot-app.sh
```

Then start the servers as shown above.

## 📋 Testing the Application

### 1. Create an Account
1. Visit http://localhost:3000
2. Click "Get Started" or "Sign up"
3. Fill in the registration form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: +1 (555) 123-4567
   - Password: password123
4. Click "Create Account"

### 2. Explore the Dashboard
After registration, you'll be automatically logged in and see:
- Portfolio summary (starts at $0)
- Active goals count
- Investment recommendations
- Quick action buttons

### 3. Create a Portfolio
1. Click "Portfolios" in the sidebar
2. Click "New Portfolio"
3. Name your portfolio (e.g., "Long Term Growth")
4. Add holdings to track investments

### 4. Set Financial Goals
1. Click "Goals" in the sidebar
2. Create goals like:
   - Retirement fund: $1,000,000
   - House down payment: $50,000
   - Emergency fund: $25,000

### 5. Complete Risk Assessment
1. Click "Risk Profile" in the sidebar
2. Take the assessment to get personalized recommendations

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Portfolio
- `GET /api/portfolios` - Get all portfolios
- `POST /api/portfolios` - Create portfolio
- `GET /api/portfolios/:id` - Get single portfolio
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio

### Holdings
- `POST /api/portfolios/:portfolioId/holdings` - Add holding
- `PUT /api/portfolios/:portfolioId/holdings/:holdingId` - Update holding
- `DELETE /api/portfolios/:portfolioId/holdings/:holdingId` - Delete holding

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/recommendations` - Get recommendations

### Risk Assessment
- `GET /api/risk-assessment` - Get risk assessment
- `POST /api/risk-assessment` - Create/update assessment

## 🗄️ Database

**Connection Details:**
- Host: localhost
- Port: 5432
- Database: investwise_dev
- User: investwise_user
- Password: investwise_pass

**View Database:**
```bash
cd backend
npx prisma studio
```

## 🛠️ Development Commands

### Backend
```bash
cd backend
npm run dev          # Start development server
npm start           # Start production server
npx prisma studio   # Open Prisma Studio (database GUI)
npx prisma generate # Generate Prisma Client
npx prisma db push  # Push schema changes to database
```

### Frontend
```bash
cd frontend
npm run dev   # Start development server
npm run build # Build for production
npm start     # Start production server
```

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://investwise_user:investwise_pass@localhost:5432/investwise_dev"
JWT_SECRET="investwise_dev_jwt_secret_key_2024_secure_random_string"
JWT_REFRESH_SECRET="investwise_dev_refresh_secret_key_2024_secure_random_string"
JWT_EXPIRE="15m"
JWT_REFRESH_EXPIRE="7d"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎨 Tech Stack

### Backend
- Node.js & Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs for password hashing
- Helmet, CORS, Rate Limiting (security)

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- Lucide React (icons)

## 📝 Project Structure

```
IW/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, JWT config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Main server file
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   ├── components/      # React components
│   │   ├── lib/             # API client, auth context
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── .env.local
│
└── QUICKSTART.md            # This file
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Check if port 5000 is available
lsof -i :5000
```

### Frontend won't start
```bash
# Check if port 3000 is available
lsof -i :3000

# Clear Next.js cache
rm -rf frontend/.next
cd frontend && npm run dev
```

### Database connection issues
```bash
# Test database connection
psql -h localhost -U investwise_user -d investwise_dev

# Recreate database
sudo -u postgres psql -c "DROP DATABASE IF EXISTS investwise_dev;"
sudo -u postgres psql -c "CREATE DATABASE investwise_dev;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE investwise_dev TO investwise_user;"

# Push schema again
cd backend
npx prisma db push
```

## 🎉 Success!

Your InvestWise application is now fully functional with:
- ✅ Complete backend API
- ✅ Modern frontend interface
- ✅ Database setup and migrations
- ✅ Authentication system
- ✅ Portfolio management
- ✅ Financial planning tools

Visit http://localhost:3000 to get started!
