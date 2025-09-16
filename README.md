# Odul Platform

A comprehensive Next.js 14 application scaffold featuring points, rewards, lottery, and gamification features with a sleek dark theme.

## 🎨 Features

### Core Platform
- **Dashboard**: Overview of your points, activities, and quick actions
- **Points System**: Earn and track points through various activities
- **Wheel of Fortune**: Spin to win points and prizes
- **Lottery**: Buy tickets and participate in weekly draws
- **Rewards Store**: Redeem points for digital rewards and gift cards
- **Contact System**: Send messages and view communication history
- **Settings**: Manage profile, notifications, and integrations

### Technical Features
- **Next.js 14** with App Router and TypeScript
- **Auth.js (NextAuth)** with magic link authentication
- **Prisma ORM** with PostgreSQL database
- **Tailwind CSS** with custom dark theme
- **shadcn/ui** components for consistent UI
- **Responsive Design** with collapsible sidebar
- **Docker Support** with multi-stage builds
- **CI/CD Pipeline** with GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x LTS
- pnpm (preferred package manager)
- PostgreSQL database (or Docker for local development)

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd odulplatformu
   pnpm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/odulplatformu"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secure-secret-here"
   
   # Email settings (optional for development)
   EMAIL_SERVER_HOST="smtp.mailtrap.io"
   EMAIL_SERVER_PORT="2525"
   EMAIL_SERVER_USER="your-mailtrap-user"
   EMAIL_SERVER_PASSWORD="your-mailtrap-password"
   EMAIL_FROM="noreply@odulplatformu.com"
   DISABLE_EMAIL_SENDING="true"
   ```

3. **Database Setup**
   
   **Option A: Using Docker (Recommended)**
   ```bash
   # Copy and start services
   cp docker-compose.example.yml docker-compose.yml
   docker-compose up -d postgres
   ```
   
   **Option B: Local PostgreSQL**
   ```bash
   # Create database
   createdb odulplatformu
   ```

4. **Database Migration & Seeding**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run migrations
   pnpm prisma migrate dev
   
   # Seed demo data
   pnpm prisma seed
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```
   
   Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The platform uses Auth.js with magic link authentication:

1. Navigate to the login page
2. Enter your email (use `admin@example.com` for demo)
3. Check console for magic link (when `DISABLE_EMAIL_SENDING=true`)
4. Click the link to sign in

## 🎨 Theme & Design

### Color Scheme
- **Background**: `#24292e` (Dark gray)
- **Accent**: `#360028` (Deep purple)
- **Text**: White for optimal contrast

### Layout
- **Sidebar**: Collapsible left navigation (desktop) / overlay drawer (mobile)
- **Responsive**: Optimized for all screen sizes
- **Dark Theme**: Consistent dark theme throughout

## 📁 Project Structure

```
odulplatformu/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── points/          # Points management
│   │   ├── wheel/           # Wheel of fortune
│   │   ├── lottery/         # Lottery system
│   │   ├── rewards/         # Rewards store
│   │   ├── contact/         # Contact system
│   │   └── telegram-verify/ # Telegram integration
│   ├── dashboard/           # Dashboard pages
│   │   ├── points/         # Points page
│   │   ├── wheel/          # Wheel page
│   │   ├── lottery/        # Lottery page
│   │   ├── rewards/        # Rewards page
│   │   ├── contacts/       # Contacts page
│   │   └── settings/       # Settings page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (redirects to dashboard)
├── components/              # Reusable components
│   ├── ui/                 # shadcn/ui components
│   ├── auth-provider.tsx   # NextAuth provider
│   ├── header.tsx          # Top navigation
│   └── sidebar.tsx         # Sidebar navigation
├── lib/                    # Utilities and configurations
│   ├── auth/              # Auth configuration
│   ├── prisma.ts          # Prisma client
│   └── utils.ts           # Utility functions
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeding
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── docker-compose.example.yml # Docker Compose configuration
├── Dockerfile             # Docker container configuration
└── .github/workflows/     # CI/CD pipelines
```

## 🐳 Docker Development

### Full Stack with Docker
```bash
# Copy and customize docker-compose
cp docker-compose.example.yml docker-compose.yml

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Build Docker Image
```bash
# Build production image
docker build -t odulplatformu .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  odulplatformu
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm typecheck        # TypeScript type checking
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Database
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:seed      # Seed database with demo data
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:reset     # Reset database (dev only)
```

## 🗄️ Database Schema

### Core Models
- **User**: User accounts and profiles
- **Account/Session**: NextAuth authentication
- **PointTransaction**: Point earning/spending history
- **WheelSpin**: Wheel of fortune results
- **LotteryTicket**: Lottery ticket purchases
- **Reward**: Available rewards in the store
- **ContactMessage**: User messages and support
- **TelegramVerification**: Telegram account linking

## 🔧 API Endpoints

### Authentication
- `GET/POST /api/auth/*` - NextAuth endpoints

### Platform Features
- `GET/POST /api/points` - Points management
- `GET/POST /api/wheel` - Wheel of fortune
- `GET/POST /api/lottery` - Lottery system
- `GET/POST /api/rewards` - Rewards store
- `GET/POST /api/contact` - Contact messages
- `GET/POST /api/telegram-verify` - Telegram verification

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your domain URL
- `NEXTAUTH_SECRET`: Secure random string
- Email configuration for magic links
- Optional: Telegram bot token

### Production Checklist
- [ ] Set secure `NEXTAUTH_SECRET`
- [ ] Configure email provider (disable `DISABLE_EMAIL_SENDING`)
- [ ] Set up PostgreSQL database
- [ ] Run database migrations
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Auth.js](https://authjs.dev/) for authentication
- [Prisma](https://prisma.io/) for database ORM
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Lucide](https://lucide.dev/) for icons