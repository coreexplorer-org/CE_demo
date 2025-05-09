# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Tailwind and PostCSS (needed by some Alpine builds)
RUN apk add --no-cache libc6-compat

# Copy package files separately to leverage Docker cache
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies (prioritize yarn/pnpm if present)
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else npm install --legacy-peer-deps; \
  fi

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
