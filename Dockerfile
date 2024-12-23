# Step 1: Use the official Node.js image from Docker Hub
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the backend code to the container
COPY . .

# Step 6: Expose the port your backend will run on (5000 by default)
EXPOSE 5000

# Step 7: Command to run the app
CMD node app.js
