# 🐘 PostgreSQL Setup for InvestWise

This guide will help you set up PostgreSQL for the InvestWise investment advisory platform.

## Prerequisites

- macOS (this guide is macOS-specific)
- Internet connection

## Installation Steps

### Step 1: Install Homebrew (if not already installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Add Homebrew to your PATH:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Step 2: Install PostgreSQL 15

```bash
brew install postgresql@15
```

### Step 3: Start PostgreSQL Service

```bash
brew services start postgresql@15
```

### Step 4: Create InvestWise Database

Run the automated setup script:

```bash
./setup-database.sh
```

Or manually:

```bash
# Create user (optional)
createuser investwise_user

# Create database
createdb -O investwise_user investwise_dev

# Set permissions
psql -c "GRANT ALL PRIVILEGES ON DATABASE investwise_dev TO investwise_user;"
```

## Verification

Test your installation:

```bash
# Check PostgreSQL version
psql --version

# Test database connection
psql -h localhost -U investwise_user -d investwise_dev -c "SELECT version();"
```

## Database Configuration

Your database connection details:

- **Host**: localhost
- **Port**: 5432 (default)
- **Database**: investwise_dev
- **User**: investwise_user
- **Password**: investwise_pass

### Environment Variables

Add this to your `backend/.env` file:

```bash
DATABASE_URL="postgresql://investwise_user:investwise_pass@localhost:5432/investwise_dev"
```

## Prisma Setup

Once PostgreSQL is running, set up your database schema:

```bash
cd database
npx prisma generate
npx prisma db push
```

## Troubleshooting

### Service Not Starting
```bash
brew services restart postgresql@15
```

### Permission Issues
```bash
# Reset PostgreSQL
brew services stop postgresql@15
rm -rf /opt/homebrew/var/postgresql@15
brew services start postgresql@15
```

### Connection Issues
```bash
# Check if service is running
brew services list | grep postgresql

# Check PostgreSQL logs
tail -f /opt/homebrew/var/log/postgresql@15.log
```

## Next Steps

1. ✅ PostgreSQL installed and running
2. ⏭️ Run `./setup-database.sh`
3. ⏭️ Update your `.env` files with database URL
4. ⏭️ Run Prisma migrations: `npx prisma db push`
5. ⏭️ Start your InvestWise application

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify PostgreSQL service is running: `brew services list`
3. Check database exists: `psql -l`
4. Review logs: `tail -f /opt/homebrew/var/log/postgresql@15.log`
