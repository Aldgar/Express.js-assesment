# Use a lightweight Node.js base image
FROM node:lts-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the application port
EXPOSE 4000

# Set the command to start the server
CMD ["node", "app.js"]