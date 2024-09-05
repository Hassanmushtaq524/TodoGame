# Dockerfile for the frontend
FROM node:18 as build

# Create and set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use an Nginx image to serve the application
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port for the application
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]