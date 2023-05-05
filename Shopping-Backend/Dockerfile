# Use official Node.js runtime as parent image
FROM node:14

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the port that the container should listen on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
