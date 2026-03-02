# Use a version of Java that works for 26.2
FROM eclipse-temurin:17-jdk-jammy

# Install Node.js
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com | bash -
RUN apt-get install -y nodejs

# Create app directory
WORKDIR /usr/src/app

# Copy your files (jar, index.js, package.json, config.yml)
COPY . .

# Install node dependencies
RUN npm install

# Expose the port for Render
EXPOSE 3000

# Start the bot
CMD ["node", "index.js"]
