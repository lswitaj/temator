# Use official Node.js image as the build environment
FROM node:lts-bookworm-slim AS builder

# Set working directory
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use NGINX to serve the built static files
FROM nginx:alpine

# Copy built files from builder stage to NGINX's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80