# Build Stage
FROM node:latest AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the correct path
COPY mern-invoice-app/package*.json ./

RUN npm install

# Copy the rest of the application files
COPY mern-invoice-app/ .

RUN npm run build

# Production Stage
FROM node:latest
WORKDIR /usr/src/app

# Copy from the build stage
COPY --from=build /usr/src/app . 

EXPOSE 5000
CMD ["npm", "start"]
