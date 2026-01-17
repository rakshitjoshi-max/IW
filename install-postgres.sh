#!/bin/bash

echo "🐘 Complete PostgreSQL Installation for InvestWise"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Installing Homebrew...${NC}"
echo "This will require your administrator password..."

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Homebrew installed successfully!${NC}"
else
    echo -e "${RED}❌ Homebrew installation failed${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Adding Homebrew to PATH...${NC}"

# Add Homebrew to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

echo -e "${GREEN}✅ Homebrew added to PATH${NC}"

echo ""
echo -e "${YELLOW}Step 3: Installing PostgreSQL 15...${NC}"

# Install PostgreSQL
brew install postgresql@15

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PostgreSQL 15 installed successfully!${NC}"
else
    echo -e "${RED}❌ PostgreSQL installation failed${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 4: Starting PostgreSQL service...${NC}"

# Start PostgreSQL service
brew services start postgresql@15

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PostgreSQL service started!${NC}"
else
    echo -e "${RED}❌ Failed to start PostgreSQL service${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 5: Creating InvestWise database...${NC}"

# Wait for PostgreSQL to start
sleep 3

# Create database user
echo "Creating database user..."
createuser investwise_user 2>/dev/null || echo "User might already exist"

# Create database
echo "Creating InvestWise database..."
createdb -O investwise_user investwise_dev 2>/dev/null || echo "Database might already exist"

# Set permissions
echo "Setting up permissions..."
psql -c "GRANT ALL PRIVILEGES ON DATABASE investwise_dev TO investwise_user;" 2>/dev/null

echo -e "${GREEN}✅ Database setup complete!${NC}"

echo ""
echo -e "${YELLOW}Step 6: Verification...${NC}"

# Verify installation
echo "PostgreSQL version:"
psql --version

echo ""
echo "Testing database connection:"
psql -h localhost -U investwise_user -d investwise_dev -c "SELECT version();" 2>/dev/null && echo -e "${GREEN}✅ Database connection successful!${NC}" || echo -e "${RED}❌ Database connection failed${NC}"

echo ""
echo "=================================================="
echo -e "${GREEN}🎉 PostgreSQL installation complete!${NC}"
echo ""
echo "📋 Your database details:"
echo "   Host: localhost"
echo "   Database: investwise_dev"
echo "   User: investwise_user"
echo "   Password: investwise_pass"
echo ""
echo "🔗 Add this to your backend/.env file:"
echo '   DATABASE_URL="postgresql://investwise_user:investwise_pass@localhost:5432/investwise_dev"'
echo ""
echo "🚀 Next steps:"
echo "   1. Run: npx prisma generate"
echo "   2. Run: npx prisma db push"
echo "   3. Start your InvestWise application!"
echo "=================================================="
