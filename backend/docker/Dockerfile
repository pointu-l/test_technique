FROM debian:latest

RUN apt update
RUN apt install -y curl

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt update
RUN apt install -y nodejs

WORKDIR /app

ENTRYPOINT ["npm", "run", "start:dev"]