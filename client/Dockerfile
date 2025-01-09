FROM  node:latest
WORKDIR /usr/src/app
COPY  client/package*.json ./
RUN npm install 
RUN npm install axios --save
RUN npm install @babel/plugin-proposal-private-property-in-object --save-dev
COPY client/ . 
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]
