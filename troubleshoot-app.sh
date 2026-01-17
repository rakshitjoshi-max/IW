#!/bin/bash

echo "🔍 InvestWise Application Troubleshooter"
echo "========================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check and fix issues
check_postgres() {
    echo -e "${YELLOW}Checking PostgreSQL...${NC}"
    if pgrep -f postgres > /dev/null; then
        echo -e "${GREEN}✅ PostgreSQL is running${NC}"
        return 0
    else
        echo -e "${RED}❌ PostgreSQL not running${NC}"
        echo "Starting PostgreSQL..."
        brew services start postgresql@15
        sleep 2
        if pgrep -f postgres > /dev/null; then
            echo -e "${GREEN}✅ PostgreSQL started successfully${NC}"
        else
            echo -e "${RED}❌ Failed to start PostgreSQL${NC}"
        fi
        return 1
    fi
}

check_ports() {
    echo -e "${YELLOW}Checking port availability...${NC}"
    if lsof -i :3000 > /dev/null 2>&1; then
        echo -e "${RED}❌ Port 3000 is in use${NC}"
        echo "Killing process on port 3000..."
        lsof -ti:3000 | xargs kill -9 2>/dev/null
        echo -e "${GREEN}✅ Port 3000 freed${NC}"
    else
        echo -e "${GREEN}✅ Port 3000 is available${NC}"
    fi
    
    if lsof -i :5000 > /dev/null 2>&1; then
        echo -e "${RED}❌ Port 5000 is in use${NC}"
        echo "Killing process on port 5000..."
        lsof -ti:5000 | xargs kill -9 2>/dev/null
        echo -e "${GREEN}✅ Port 5000 freed${NC}"
    else
        echo -e "${GREEN}✅ Port 5000 is available${NC}"
    fi
}

check_dependencies() {
    echo -e "${YELLOW}Checking Node.js dependencies...${NC}"
    
    # Check backend
    if [ -d "backend" ]; then
        cd backend
        if [ ! -d "node_modules" ]; then
            echo -e "${YELLOW}Installing backend dependencies...${NC}"
            npm install
        fi
        cd ..
    fi
    
    # Check frontend
    if [ -d "frontend" ]; then
        cd frontend
        if [ ! -d "node_modules" ]; then
            echo -e "${YELLOW}Installing frontend dependencies...${NC}"
            npm install
        fi
        cd ..
    fi
    
    echo -e "${GREEN}✅ Dependencies checked${NC}"
}

check_env_files() {
    echo -e "${YELLOW}Checking environment files...${NC}"
    
    if [ ! -f "backend/.env" ]; then
        echo -e "${RED}❌ backend/.env not found${NC}"
        echo "Creating backend/.env..."
        cat > backend/.env << 'ENV_EOF'
# Database Configuration
DATABASE_URL="postgresql://investwise_user:investwise_pass@localhost:5432/investwise_dev"

# JWT Configuration  
JWT_SECRET="investwise_dev_jwt_secret_key_2024_secure_random_string"
JWT_REFRESH_SECRET="investwise_dev_refresh_secret_key_2024_secure_random_string"
JWT_EXPIRE="15m"
JWT_REFRESH_EXPIRE="7d"

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID="your_razorpay_key_id_here"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret_here"
ENV_EOF
        echo -e "${GREEN}✅ backend/.env created${NC}"
    else
        echo -e "${GREEN}✅ backend/.env exists${NC}"
    fi
}

# Run checks
check_postgres
echo ""
check_ports
echo ""
check_dependencies
echo ""
check_env_files

echo ""
echo -e "${GREEN}🎯 Troubleshooting complete!${NC}"
echo ""
echo "🚀 Ready to start your application:"
echo "Terminal 1: cd backend && npm run dev"
echo "Terminal 2: cd frontend && npm run dev"
echo ""
echo "🌐 Access at: http://localhost:3000"
