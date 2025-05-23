# Use Node.js for building frontend
FROM node:20 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:stable-alpine

# Copy built frontend to nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 80
