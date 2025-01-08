# Build Stage
FROM node:latest AS build
WORKDIR /usr/src/app
COPY mern-invoice-app/package*.json ./
RUN npm install
COPY mern-invoice-app/ . 
RUN npm run build

# Production Stage
FROM node:latest
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
EXPOSE 5000
CMD ["npm", "start"]

