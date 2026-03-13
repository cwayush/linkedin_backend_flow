FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
# Exclude dev dependencies in prod? We need typescript to build right now so we just install
RUN npm install

# Copy source and shared libraries (assuming monolithic docker context but usually built locally or context in root)
COPY . .

# Generate Prisma client
RUN npx prisma generate || true

# Build TypeScript
RUN npm run build

# Start the application
CMD ["npm", "start"]
