# Frontend Dashboard Application

A modern, responsive React dashboard application with authentication, product management, and real-time analytics.

---

## 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/MINALOTFY10/frontend-task
cd frontend-task
npm install
```

### 1.1 Run Locally (Development)

```bash
npm run dev
```

The application will be available at http://localhost:5173

> You can log in as a guest to test the application.

---

## 2. Project Structure

The `src/` directory is organized by feature for scalability and maintainability. **`components/`** holds reusable UI pieces grouped by domain (dashboard, products, shared). **`pages/`** contains full-page views (dashboard, login, products). **`services/`** centralizes all API communication and TypeScript types. **`hooks/`** encapsulates data-fetching logic. **`context/`** manages global auth and theme state. **`layout/`** provides the app shell, navigation, and route guards.

---

## 3. Environment Configuration

Create a `.env.local` file for development (optional):

```env
VITE_API_URL=https://dummyjson.com
```

For Docker builds, the API URL is set in `docker-compose.yml`:

```yaml
args:
  VITE_API_URL: https://dummyjson.com
```

---

## 4. Build & Deployment

### 4.1 Build for Production

```bash
npm run build
```

### 4.2 Preview Production Build Locally

```bash
npm run preview
```

### 4.3 Deployment Options

#### Option A: Vercel (Recommended for Serverless)

1. Push your code to GitHub
2. Visit [https://vercel.com](https://vercel.com)
3. Click **New Project** and import your repository
4. Select the **React** framework preset
5. Set the environment variable: `VITE_API_URL=https://dummyjson.com`
6. Click **Deploy**

Or deploy via the Vercel CLI:

```bash
npm install -g vercel
vercel
```

#### Option B: Docker (Recommended for Production Servers)

Build and run with Docker Compose:

```bash
docker-compose up --build
```

The app will be available at **http://localhost:8080**

**Common Docker commands:**

```bash
# Build and start
docker-compose up --build

# Stop containers
docker-compose down

# Check running containers
docker-compose ps
```
