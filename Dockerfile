# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install minimal system deps needed for many JS builds (e.g. Tailwind, PostCSS)
RUN apk add --no-cache libc6-compat

# Copy only npm files to leverage cache
COPY package.json package-lock.json ./
# Copy the rest of your code
COPY . .

# Install dependencies
RUN npm install

# Build your Next.js app (this will also run PostCSS and Tailwind steps if configured)
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["npm", "run", "start"]
