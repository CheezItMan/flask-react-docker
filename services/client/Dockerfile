FROM node:16-alpine3.11

# Set working dir
WORKDIR /app

# Add the node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies

COPY package.json .
COPY package-lock.json .
RUN npm ci
RUN npm install react-scripts@4.0.3 -g --silent

# Start App
CMD ["npm", "start"]
