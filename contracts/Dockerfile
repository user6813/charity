FROM node:20.12.0-alpine

WORKDIR /contracts

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8545

CMD ["npx", "hardhat", "node", "--hostname", "0.0.0.0"]
