FROM node:19-alpine3.16


RUN mkdir /app
WORKDIR /app

 
COPY . .
RUN rm -rf /app/node_modules
RUN rm -rf .vscode .git .git .gitignore .sample-env \
     && npm install

RUN npm dedupe

EXPOSE 3000

CMD [ "npm", "start" ]
