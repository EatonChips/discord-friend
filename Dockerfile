# Node container
FROM node:carbon

# Set working directory
WORKDIR /usr/src/discord-friend

# Copy src code
COPY . .

# Install dependencies
RUN npm install

# Run
CMD ["npm", "start"]