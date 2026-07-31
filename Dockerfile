# Base Image: Lightweight Node.js Alpine
FROM node:18-alpine

# Set Working Directory
WORKDIR /app

# Copy dependency specifications
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production || npm install --production

# Copy application source code
COPY . .

# Create uploads directory if not exists
RUN mkdir -p /app/uploads

# Expose Application Port
EXPOSE 5000

# Set Default Environment Variables
ENV PORT=5000 \
    NODE_ENV=production

# Start Node.js Express Server
CMD ["npm", "start"]
