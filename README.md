# Charity DApp – Full Stack Web3 Project

A decentralized charity platform built with Node.js (Express), React (Vite), Solidity (Hardhat), and Docker Compose for local development.

## Project Structure

```
charity/
├── backend/        # Node.js backend (Express + nodemon)
├── client/         # React frontend (Vite)
├── contracts/      # Solidity contracts (Hardhat)
├── docker-compose.yml
└── README.md
```

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, Nodemon
- **Frontend:** React, Vite
- **Smart Contracts:** Solidity, Hardhat
- **Infrastructure:** Docker, Docker Compose

## Development (with Docker Compose)

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Quick Start

```bash
git clone <repo-url>
cd charity
docker-compose up --build
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001/api/health](http://localhost:3001/api/health)
- Hardhat Node (RPC): [http://localhost:8545](http://localhost:8545)

### Live Reload / Hot Reload
- **Backend:** Uses `nodemon` for auto-restart on code changes.
- **Frontend:** Uses Vite dev server with hot module reload.
- **Contracts:** Hardhat node runs in dev mode; edit contracts and recompile/redeploy as needed.

### Environment Variables
- Copy `server/.env.example` to `server/.env` and fill in your config.

### Useful Commands

- Start all services: `docker-compose up --build`
- Stop all services: `docker-compose down`
- Install new backend deps: `docker-compose run backend npm install <package>`
- Install new frontend deps: `docker-compose run frontend npm install <package>`
- Compile contracts: `docker-compose run contracts npx hardhat compile`
- Deploy contracts: `docker-compose run contracts npx hardhat run scripts/deploy.js --network localhost`

---

## Directory Details

### backend/
- Express API server
- TypeScript + Nodemon for live reload
- Runs on port 3001

### client/
- React app (Vite)
- Hot module reload enabled
- Runs on port 5173

### contracts/
- Hardhat for Solidity smart contracts
- `Charity.sol` contract
- Local blockchain node on port 8545
- Deployment scripts in `scripts/`

---

## License
MIT
