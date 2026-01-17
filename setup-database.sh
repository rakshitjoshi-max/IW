#!/bin/bash

echo "🐘 Setting up InvestWise Database"
echo "================================="

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL not found. Please install it first:"
    echo "   brew install postgresql@15"
    echo "   brew services start postgresql@15"
    exit 1
fi

echo "✅ PostgreSQL found: $(psql --version)"

# Create database user (optional, but good practice)
echo "👤 Creating database user..."
createuser investwise_user 2>/dev/null || echo "User might already exist"

# Set password for user
echo "🔑 Setting up user permissions..."
psql -c "ALTER USER investwise_user PASSWORD 'investwise_pass';" 2>/dev/null || echo "Password already set or user doesn't exist"

# Create database
echo "🗄️ Creating InvestWise database..."
createdb -O investwise_user investwise_dev 2>/dev/null || echo "Database might already exist"

# Grant permissions
echo "🔐 Setting up permissions..."
psql -c "GRANT ALL PRIVILEGES ON DATABASE investwise_dev TO investwise_user;" 2>/dev/null

# Test connection
echo "🧪 Testing database connection..."
psql -h localhost -U investwise_user -d investwise_dev -c "SELECT version();" && echo "✅ Database setup complete!" || echo "❌ Connection failed"

echo ""
echo "📋 Database Details:"
echo "   Host: localhost"
echo "   Database: investwise_dev"
echo "   User: investwise_user"
echo "   Password: investwise_pass"
echo ""
echo "🔗 Connection string for your .env files:"
echo "   DATABASE_URL=\"postgresql://investwise_user:investwise_pass@localhost:5432/investwise_dev\""
