# This image already has Java 17 and Node 20 installed!
FROM ghcr.io/graalvm/jdk-community:17

# Install Node.js simply
RUN curl -sL https://rpm.nodesource.com | bash - && \
    yum install -y nodejs

WORKDIR /usr/src/app

# Copy your 5 files
COPY . .

# Install express
RUN npm install express

EXPOSE 3000

# Start
CMD ["node", "index.js"]
