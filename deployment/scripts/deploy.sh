#!/bin/bash

# InvestWise Deployment Script
# This script handles the complete deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="investwise"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_requirements() {
    log_info "Checking system requirements..."

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    # Check if .env file exists
    if [ ! -f ".env" ]; then
        log_error ".env file not found. Please copy deployment/env.production.config to .env and configure your settings."
        exit 1
    fi

    log_success "System requirements check passed."
}

setup_environment() {
    log_info "Setting up deployment environment..."

    # Create necessary directories
    mkdir -p backend/uploads
    mkdir -p backend/logs
    mkdir -p deployment/nginx/ssl

    # Set proper permissions
    chmod +x deployment/scripts/*.sh

    log_success "Environment setup completed."
}

build_and_deploy() {
    log_info "Building and deploying InvestWise..."

    # Stop existing containers
    log_info "Stopping existing containers..."
    docker-compose -f $DOCKER_COMPOSE_FILE down || true

    # Build and start services
    log_info "Building and starting services..."
    docker-compose -f $DOCKER_COMPOSE_FILE up --build -d

    # Run database migrations
    log_info "Running database migrations..."
    docker-compose -f $DOCKER_COMPOSE_FILE --profile migrate run --rm migrate

    # Wait for services to be healthy
    log_info "Waiting for services to be healthy..."
    sleep 30

    # Check service health
    check_services_health

    log_success "Deployment completed successfully!"
}

check_services_health() {
    log_info "Checking service health..."

    # Check PostgreSQL
    if docker-compose -f $DOCKER_COMPOSE_FILE ps postgres | grep -q "Up"; then
        log_success "PostgreSQL is running"
    else
        log_error "PostgreSQL failed to start"
        exit 1
    fi

    # Check Redis
    if docker-compose -f $DOCKER_COMPOSE_FILE ps redis | grep -q "Up"; then
        log_success "Redis is running"
    else
        log_error "Redis failed to start"
        exit 1
    fi

    # Check Backend
    if docker-compose -f $DOCKER_COMPOSE_FILE ps backend | grep -q "Up"; then
        log_success "Backend API is running"
    else
        log_error "Backend API failed to start"
        exit 1
    fi

    # Check Frontend
    if docker-compose -f $DOCKER_COMPOSE_FILE ps frontend | grep -q "Up"; then
        log_success "Frontend is running"
    else
        log_error "Frontend failed to start"
        exit 1
    fi

    # Check Nginx
    if docker-compose -f $DOCKER_COMPOSE_FILE ps nginx | grep -q "Up"; then
        log_success "Nginx reverse proxy is running"
    else
        log_error "Nginx failed to start"
        exit 1
    fi
}

show_deployment_info() {
    echo
    log_success "🎉 InvestWise has been deployed successfully!"
    echo
    echo "📊 Service Status:"
    docker-compose -f $DOCKER_COMPOSE_FILE ps
    echo
    echo "🌐 Access your application at:"
    echo "   Frontend: http://localhost"
    echo "   API: http://localhost/api"
    echo "   Admin Panel: http://localhost/admin"
    echo
    echo "🔧 Useful commands:"
    echo "   View logs: docker-compose -f $DOCKER_COMPOSE_FILE logs -f [service]"
    echo "   Stop services: docker-compose -f $DOCKER_COMPOSE_FILE down"
    echo "   Restart service: docker-compose -f $DOCKER_COMPOSE_FILE restart [service]"
    echo "   Update deployment: ./deployment/scripts/update.sh"
    echo
}

cleanup_old_images() {
    log_info "Cleaning up old Docker images..."
    docker image prune -f
}

# Main deployment process
main() {
    echo "🚀 InvestWise Deployment Script"
    echo "================================"
    echo

    case "${1:-deploy}" in
        "deploy")
            check_requirements
            setup_environment
            build_and_deploy
            cleanup_old_images
            show_deployment_info
            ;;
        "stop")
            log_info "Stopping all services..."
            docker-compose -f $DOCKER_COMPOSE_FILE down
            log_success "All services stopped."
            ;;
        "restart")
            log_info "Restarting all services..."
            docker-compose -f $DOCKER_COMPOSE_FILE restart
            log_success "All services restarted."
            ;;
        "logs")
            log_info "Showing logs for all services..."
            docker-compose -f $DOCKER_COMPOSE_FILE logs -f
            ;;
        "status")
            log_info "Service status:"
            docker-compose -f $DOCKER_COMPOSE_FILE ps
            ;;
        *)
            echo "Usage: $0 {deploy|stop|restart|logs|status}"
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"