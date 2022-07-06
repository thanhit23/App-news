FROM node:14
COPY ./ /app
WORKDIR /app
RUN ls -al /app
EXPOSE 80
RUN cd /app && npm install
CMD npm start