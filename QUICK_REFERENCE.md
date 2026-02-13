# 🚀 create-node-spark Quick Reference Guide

**Version 2.7.1** | Last Updated: February 13, 2026

## 📦 Installation

```bash
# NPX (Recommended - Always latest)
npx create-node-spark@latest

# Global Installation
npm install -g create-node-spark
create-node-spark

# With pnpm
pnpm create node-spark
```

## 🎯 Quick Start

```bash
# Interactive mode (recommended for first time)
npx create-node-spark@latest

# With project name
npx create-node-spark my-awesome-api

# Full automation
npx create-node-spark my-api --lang ts --framework express --db mongodb --docker --yes
```

## 🚩 CLI Flags Reference

### Configuration Flags

| Flag | Options | Description |
|------|---------|-------------|
| `--name <name>` | string | Project name |
| `--lang <lang>` | `js`, `javascript`, `ts`, `typescript` | Programming language |
| `--framework <fw>` | `express`, `fastify`, `none` | Web framework |
| `--db <database>` | `mongodb`, `mongo`, `mysql`, `postgresql`, `postgres`, `none` | Database |
| `--pm <manager>` | `npm`, `pnpm` | Package manager |

### Feature Flags

| Flag | Description |
|------|-------------|
| `--eslint` / `--no-eslint` | Enable/disable ESLint |
| `--multer` / `--no-multer` | Enable/disable Multer |
| `--docker` / `--no-docker` | Enable/disable Docker |

### Utility Flags

| Flag | Description |
|------|-------------|
| `--yes`, `-y` | Skip all prompts |
| `--verbose` | Show detailed output |
| `--silent` | Suppress non-error output |
| `--help`, `-h` | Show help |
| `--version`, `-v` | Show version |

## 💡 Common Examples

### TypeScript + Express + MongoDB

```bash
npx create-node-spark my-api \
  --lang typescript \
  --framework express \
  --db mongodb \
  --eslint \
  --yes
```

### Fastify + PostgreSQL + Docker

```bash
npx create-node-spark fast-api \
  --lang ts \
  --framework fastify \
  --db postgresql \
  --docker \
  --yes
```

### Full-Stack with Multer

```bash
npx create-node-spark shop-api \
  --lang typescript \
  --framework express \
  --db mysql \
  --multer \
  --docker \
  --yes
```

### Minimal JavaScript Server

```bash
npx create-node-spark simple-api \
  --lang javascript \
  --framework none \
  --db none \
  --yes
```

## 📁 Generated Project Structure

```
my-project/
├── public/                 # Static files & uploads
│   ├── css/
│   ├── js/
│   ├── images/
│   └── temp/
├── src/                    # Application source
│   ├── config/             # Configuration
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Helpers
│   └── index.ts            # Entry point
├── prisma/ (if PostgreSQL) # Prisma schema
├── .env                    # Environment variables
├── .eslintrc.js           # ESLint config
├── .prettierrc            # Prettier config
├── Dockerfile             # Production Docker
├── Dockerfile.dev         # Dev Docker
├── docker-compose.yml     # Docker Compose
└── package.json           # Dependencies
```

## 🛠️ npm Scripts

### Development

```bash
npm run dev          # Start dev server with auto-reload
npm start            # Start production server
```

### TypeScript (TS projects)

```bash
npm run build        # Compile TypeScript
npm run type-check   # Check types
```

### Code Quality

```bash
npm run lint         # Check with ESLint
npm run lint:fix     # Auto-fix issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

### Docker (if enabled)

```bash
npm run docker:build # Build production image
npm run docker:run   # Run production container
npm run docker:dev   # Run dev container
npm run docker:up    # Start all services
npm run docker:down  # Stop services
npm run docker:logs  # View logs
```

### Database (PostgreSQL)

```bash
npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Run migrations
npx prisma studio    # Open Prisma Studio
```

## 🗄️ Database Configuration

### MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/myapp
DB_NAME=myapp
```

### MySQL

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=myapp
```

### PostgreSQL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"
```

## 🐳 Docker Quick Start

```bash
# Development mode (with hot-reload)
npm run docker:dev

# Production mode
npm run docker:build
npm run docker:run

# With database (docker-compose)
npm run docker:up    # Start all services
npm run docker:down  # Stop all services
npm run docker:logs  # View logs
```

## 🎨 Framework Comparison

| Feature | Express | Fastify | None |
|---------|---------|---------|------|
| **Speed** | Fast | Fastest | Custom |
| **Ecosystem** | Largest | Growing | N/A |
| **Learning Curve** | Easy | Moderate | Basic |
| **Validation** | Manual | Built-in | Manual |
| **TypeScript** | Good | Excellent | Basic |
| **Best For** | General APIs | Performance | Learning |

## 🔧 Database Comparison

| Feature | MongoDB | MySQL | PostgreSQL |
|---------|---------|-------|------------|
| **Type** | NoSQL | SQL | SQL |
| **ORM/ODM** | Mongoose | Knex.js | Prisma |
| **Schema** | Flexible | Fixed | Fixed |
| **TypeScript** | Good | Good | Excellent |
| **Best For** | Flexible data | Relational | Type safety |

## 📚 Additional Resources

- **Documentation**: <https://create-node-spark.dev/docs.html>
- **Changelog**: <https://create-node-spark.dev/changelog.html>
- **GitHub**: <https://github.com/talhabilal-dev/create-node-spark>
- **npm**: <https://www.npmjs.com/package/create-node-spark>
- **Issues**: <https://github.com/talhabilal-dev/create-node-spark/issues>
- **Discussions**: <https://github.com/talhabilal-dev/create-node-spark/discussions>

## 🆘 Troubleshooting

### Port already in use

```bash
# Change PORT in .env file
PORT=3001
```

### Database connection failed

```bash
# Check database is running
# MongoDB
mongod --version

# MySQL
mysql --version

# PostgreSQL
psql --version
```

### Docker build fails

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
npm run docker:build -- --no-cache
```

### ESLint errors

```bash
# Auto-fix most issues
npm run lint:fix

# Disable specific rules in .eslintrc.js
```

## 🎯 Best Practices

1. **Always use environment variables** for sensitive data
2. **Keep .env in .gitignore** - never commit secrets
3. **Use TypeScript** for production projects
4. **Enable ESLint & Prettier** for code quality
5. **Add .env.example** for team collaboration
6. **Use Docker** for consistent environments
7. **Write tests** for critical functionality
8. **Document your API** endpoints
9. **Use semantic versioning** for releases
10. **Keep dependencies updated** regularly

## 🔄 Migration Guide

### From v1.x to v2.x

- Auth & Multer are now optional (use `--multer` flag)
- TypeScript support added (use `--lang typescript`)
- Multiple databases supported (use `--db <database>`)

### From v2.5 to v2.6

- CLI flags system added for automation
- Fastify framework support added
- PostgreSQL + Prisma integration added

### From v2.6 to v2.7

- Docker support added (use `--docker` flag)
- Enhanced CLI color scheme
- Database-specific environment configs

## 📞 Support

- **Email**: <contact@talhabilal.dev>
- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and share ideas
- **Twitter**: [@talhabilal_dev](https://twitter.com/talhabilal_dev)

---

**Made with ❤️ by [Talha Bilal](https://talhabilal.dev)**

*Last updated: February 13, 2026*
