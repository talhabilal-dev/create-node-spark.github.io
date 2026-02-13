# 🎨 create-node-spark Features Guide

Complete guide to all features available in create-node-spark v2.7.1

## 📑 Table of Contents

1. [Language Support](#-language-support)
2. [Framework Options](#-framework-options)
3. [Database Integration](#-database-integration)
4. [Docker Support](#-docker-support)
5. [Developer Tools](#-developer-tools)
6. [Package Managers](#-package-managers)
7. [CLI Automation](#-cli-automation)

---

## 🔤 Language Support

### JavaScript (ES6+)

**When to use**: Quick prototypes, learning, smaller projects

**Features**:

- Modern ES6+ syntax
- ESM modules (import/export)
- Async/await patterns
- No compilation step
- Fast development cycle

**Example**:

```bash
npx create-node-spark my-app --lang javascript
```

**Generated code**:

```javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### TypeScript

**When to use**: Production apps, team projects, type safety required

**Features**:

- Full type safety
- Better IDE support
- Compile-time error detection
- Auto-generated types (Prisma)
- Strict mode enabled
- Source maps for debugging

**Example**:

```bash
npx create-node-spark my-app --lang typescript
```

**Generated code**:

```typescript
import express, { Request, Response } from 'express';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Available Scripts**:

- `npm run build` - Compile TypeScript to JavaScript
- `npm run type-check` - Check types without building
- `npm run dev` - Development with auto-reload

---

## 🚀 Framework Options

### 1. Express.js

**The Classic Choice** - Most popular Node.js framework

**Pros**:

- ✅ Mature and stable
- ✅ Largest ecosystem
- ✅ Extensive middleware
- ✅ Great documentation
- ✅ Easy to learn

**Cons**:

- ❌ Slower than Fastify
- ❌ More boilerplate
- ❌ Manual validation

**Usage**:

```bash
npx create-node-spark my-app --framework express
```

**Generated Structure**:

```javascript
// src/index.js
import express from 'express';
import routes from './routes/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

export default app;
```

### 2. Fastify

**The Performance Champion** - High-performance alternative

**Pros**:

- ✅ Up to 2x faster than Express
- ✅ Built-in JSON schema validation
- ✅ Async/await first-class
- ✅ Plugin architecture
- ✅ Automatic logging (Pino)

**Cons**:

- ❌ Smaller ecosystem
- ❌ Steeper learning curve
- ❌ Different middleware patterns

**Usage**:

```bash
npx create-node-spark my-app --framework fastify
```

**Generated Structure**:

```javascript
// src/index.js
import Fastify from 'fastify';
import routes from './routes/index.js';

const fastify = Fastify({
  logger: true
});

// Register routes
fastify.register(routes, { prefix: '/api' });

// Error handling
fastify.setErrorHandler((error, request, reply) => {
  reply.status(error.statusCode || 500).send({
    error: error.message
  });
});

export default fastify;
```

### 3. None (Vanilla Node.js)

**The Minimalist** - Native HTTP module

**Pros**:

- ✅ No dependencies
- ✅ Full control
- ✅ Perfect for learning
- ✅ Lightweight

**Cons**:

- ❌ More manual work
- ❌ No routing helpers
- ❌ No middleware system

**Usage**:

```bash
npx create-node-spark my-app --framework none
```

**Generated Structure**:

```javascript
// src/index.js
import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello World!' }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🗄️ Database Integration

### 1. MongoDB + Mongoose

**Document-Oriented NoSQL Database**

**Best for**:

- Flexible schemas
- Rapid prototyping
- Document-based data
- Real-time applications

**Usage**:

```bash
npx create-node-spark my-app --db mongodb
```

**Generated Files**:

```
src/
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   └── user.model.js      # Example Mongoose schema
└── index.js               # Connection initialization
```

**Configuration**:

```javascript
// src/config/database.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
```

**Example Model**:

```javascript
// src/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
```

### 2. MySQL + Knex.js

**SQL Database with Query Builder**

**Best for**:

- Relational data
- Complex queries
- Transactions
- Traditional SQL

**Usage**:

```bash
npx create-node-spark my-app --db mysql
```

**Generated Files**:

```
src/
├── config/
│   └── database.js        # Knex configuration
└── index.js               # Connection initialization
```

**Configuration**:

```javascript
// src/config/database.js
import knex from 'knex';

export const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: { min: 2, max: 10 }
});
```

**Example Query**:

```javascript
// Get all users
const users = await db('users').select('*');

// Insert user
await db('users').insert({
  name: 'John Doe',
  email: 'john@example.com'
});

// Update user
await db('users')
  .where('id', 1)
  .update({ name: 'Jane Doe' });
```

### 3. PostgreSQL + Prisma

**Modern ORM with Type Safety**

**Best for**:

- Type-safe queries
- Auto-generated types
- Complex relations
- TypeScript projects

**Usage**:

```bash
npx create-node-spark my-app --db postgresql --lang typescript
```

**Generated Files**:

```
prisma/
└── schema.prisma          # Database schema
src/
├── config/
│   └── db.config.ts       # Prisma client
├── models/
│   └── (auto-generated)   # TypeScript types
├── services/
│   └── user.service.ts    # CRUD operations
├── controllers/
│   └── user.controller.ts # API handlers
└── routes/
    └── user.routes.ts     # API routes
```

**Prisma Schema**:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}
```

**Prisma Client Usage**:

```typescript
// src/services/user.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: { posts: true }
  });
};

export const createUser = async (data: { email: string; name?: string }) => {
  return await prisma.user.create({ data });
};
```

**Prisma Commands**:

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name init

# Open Prisma Studio (GUI)
npx prisma studio

# Apply migrations in production
npx prisma migrate deploy
```

---

## 🐳 Docker Support

**Production-Ready Containerization** (New in v2.7.0)

### Features

- ✅ Multi-stage production builds
- ✅ Development mode with hot-reload
- ✅ Database containers
- ✅ Docker Compose orchestration
- ✅ Alpine-based images
- ✅ Non-root user execution
- ✅ Health checks
- ✅ Volume persistence

### Usage

```bash
npx create-node-spark my-app --docker
```

### Generated Files

```
├── Dockerfile              # Production build
├── Dockerfile.dev          # Development build
├── .dockerignore          # Ignore patterns
└── docker-compose.yml     # Services orchestration
```

### Dockerfile (Production)

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # TypeScript only

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs package*.json ./
USER nodejs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
CMD ["node", "dist/index.js"]
```

### docker-compose.yml (with MongoDB)

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://mongo:27017/myapp
    depends_on:
      mongo:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health')"]
      interval: 30s
      timeout: 3s
      retries: 3

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo-data:
```

### Docker Commands

```bash
# Build production image
npm run docker:build

# Run production container
npm run docker:run

# Development mode
npm run docker:dev

# Start all services
npm run docker:up

# Stop services
npm run docker:down

# View logs
npm run docker:logs

# Restart services
npm run docker:restart
```

---

## 🛠️ Developer Tools

### ESLint Configuration

**Developer-Friendly Linting**

**Features**:

- ✅ TypeScript support
- ✅ Balanced rules
- ✅ Prettier integration
- ✅ Node.js best practices
- ✅ Customizable

**Usage**:

```bash
npx create-node-spark my-app --eslint
```

**Generated Files**:

```
├── .eslintrc.js           # ESLint config
├── .eslintignore          # Ignore patterns
└── .prettierrc            # Prettier config
```

**Available Scripts**:

```bash
npm run lint         # Check code
npm run lint:fix     # Auto-fix issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

### Multer File Upload

**Multipart Form-Data Handling**

**Features**:

- ✅ Single & multiple uploads
- ✅ File size limits
- ✅ Type validation
- ✅ Organized storage

**Usage**:

```bash
npx create-node-spark my-app --multer
```

**Generated Structure**:

```
public/
├── images/                # Image uploads
├── temp/                  # Temporary files
└── ...
src/
└── middlewares/
    └── upload.middleware.js
```

**Example**:

```javascript
// src/middlewares/upload.middleware.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});
```

---

## 📦 Package Managers

### npm

**Default Node.js Package Manager**

**Pros**:

- ✅ Comes with Node.js
- ✅ Universal support
- ✅ Large ecosystem

**Usage**:

```bash
npx create-node-spark my-app --pm npm
```

### pnpm

**Fast, Disk-Efficient Alternative**

**Pros**:

- ✅ 2-3x faster than npm
- ✅ Saves disk space
- ✅ Strict dependency resolution
- ✅ Better monorepo support

**Usage**:

```bash
npx create-node-spark my-app --pm pnpm
```

---

## 🤖 CLI Automation

### Full Automation Mode

**Skip All Prompts**

```bash
npx create-node-spark my-api \
  --lang typescript \
  --framework express \
  --db mongodb \
  --pm npm \
  --eslint \
  --multer \
  --docker \
  --yes
```

### Silent Mode (CI/CD)

**Suppress All Output**

```bash
npx create-node-spark my-api \
  --lang ts \
  --framework express \
  --db postgresql \
  --yes \
  --silent
```

### Verbose Mode

**Detailed Output**

```bash
npx create-node-spark my-api \
  --lang typescript \
  --framework fastify \
  --verbose
```

---

## 🎯 Feature Combinations

### 1. Full-Stack TypeScript Monolith

```bash
npx create-node-spark monolith-api \
  --lang typescript \
  --framework express \
  --db postgresql \
  --eslint \
  --multer \
  --docker \
  --yes
```

**Use case**: E-commerce backend, SaaS application

### 2. High-Performance Microservice

```bash
npx create-node-spark user-service \
  --lang typescript \
  --framework fastify \
  --db mongodb \
  --docker \
  --pm pnpm \
  --yes
```

**Use case**: Microservices architecture, real-time apps

### 3. Learning Project

```bash
npx create-node-spark learn-api \
  --lang javascript \
  --framework express \
  --db none \
  --yes
```

**Use case**: Tutorials, educational projects

### 4. Rapid Prototype

```bash
npx create-node-spark mvp-api \
  --lang typescript \
  --framework express \
  --db mongodb \
  --eslint \
  --yes
```

**Use case**: Hackathons, proof-of-concepts

---

## 📊 Feature Comparison Matrix

| Feature | JS | TS | Express | Fastify | MongoDB | MySQL | PostgreSQL | Docker | ESLint | Multer |
|---------|----|----|---------|---------|---------|-------|------------|--------|--------|--------|
| **Type Safety** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | N/A | N/A | N/A |
| **Performance** | ⚡ | ⚡⚡ | ⚡⚡ | ⚡⚡⚡ | ⚡⚡⚡ | ⚡⚡ | ⚡⚡ | ⚡⚡ | N/A | N/A |
| **Learning Curve** | Easy | Moderate | Easy | Moderate | Easy | Moderate | Moderate | Moderate | Easy | Easy |
| **Ecosystem** | Huge | Huge | Largest | Growing | Large | Large | Large | Mature | Large | Large |
| **Production Ready** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

**Need help?** Check the [documentation](https://create-node-spark.dev/docs.html) or [open an issue](https://github.com/talhabilal-dev/create-node-spark/issues)!
