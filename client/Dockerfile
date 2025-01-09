FROM  node:latest
WORKDIR /usr/src/app
COPY  client/package*.json ./
RUN npm install 
COPY client/ . 
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]
