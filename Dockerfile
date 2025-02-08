# Base Image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including dev dependencies
RUN npm install tailwindcss-animate clsx next-themes tailwind-merge
RUN npm install

# Copy the rest of the code
COPY . .

# Development target stops here
FROM builder AS dev
CMD ["npm", "run", "dev"]

# Production build continues
FROM builder AS production
RUN npm run build

# Production runtime
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=production /app ./

CMD ["npm", "run", "start"]