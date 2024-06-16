FROM node:14.15.0 as vuejs

LABEL authors="Collins Amuhaya"
RUN mkdir -p /app/public
COPY ./app/public
CMD["node","server.js"]

