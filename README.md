# Frontend Dashboard Application

A modern, responsive React dashboard application with authentication, product management, and real-time analytics.

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/MINALOTFY10/frontend-task
cd frontend-task
npm install
```

### Run Locally (Development)

```bash
npm run dev
```

The application will be available at **http://localhost:5173**
You can login as guest to test the application.

### 3. Environment Configuration (Optional)

Create a `.env.local` file for development (optional):

```env
VITE_API_URL=https://dummyjson.com
```

For Docker builds, the API URL is set in `docker-compose.yml`:

```yaml
args:
  VITE_API_URL: https://dummyjson.com
```

## Build & Deployment

### 1. Build for Production

```bash
npm run build
```

### 2. Preview Production Build Locally

```bash
npm run preview
```

## Deployment Options

### Option A: Vercel (Recommended for Serverless)

1. Push your code to GitHub
2. Visit https://vercel.com
3. Click "New Project" and import your repository
4. Select "React" framework preset
5. Environment variables: Set `VITE_API_URL=https://dummyjson.com`
6. Deploy

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Option B: Docker (Recommended for Production Servers)

**Build and run with Docker:**

```bash
docker-compose up --build
```

The app will be available at **http://localhost:8080**

**Docker Commands:**

```bash
# Build and start
docker-compose up --build

# Stop containers
docker-compose down

# Check running containers
docker-compose ps
```
