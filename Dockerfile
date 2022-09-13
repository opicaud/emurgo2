FROM node:12

# Install Truffle
RUN npm install -g truffle
RUN npm config set bin-links false

# Move Contract Files
COPY contracts ./contracts
COPY migrations ./migrations
COPY test ./test
COPY truffle-config.js ./truffle-config.js
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY bootstrap.js ./bootstrap.js
RUN npm install
# Move React Files
COPY app/src ./app/src
COPY app/public ./app/public
COPY app/package.json ./app/package.json
COPY app/package-lock.json ./app/package-lock.json

# Clean Install NPM Dependencies
RUN cd app && npm ci
