# Electricity Carbon Oracle for Pharos Network

This project implements a real-world asset (RWA) oracle for electricity carbon emissions data on the Pharos Network blockchain.

## Overview

The oracle fetches electricity carbon emissions data from the Carbon Interface API and stores it on-chain, making it available for other smart contracts to use. This data can be valuable for:

- Carbon offset tokenization
- ESG-compliant DeFi applications
- Climate-aware smart contracts
- Energy trading platforms

## Components

1. **Smart Contract**: Stores and aggregates electricity carbon data from authorized providers
2. **Oracle Service**: Fetches data from Carbon Interface API and pushes it to the blockchain
3. **API Server**: Provides health checks and manual trigger endpoints

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Pharos Network account with testnet tokens
- Carbon Interface API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/electricity-carbon-oracle.git
   cd electricity-carbon-oracle
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your details:
   ```
   cp .env.example .env
   ```

### Deployment

1. Deploy the smart contract:
   ```
   npm run deploy
   ```

2. Update your `.env` file with the deployed contract address.

3. Start the oracle service:
   ```
   npm start
   ```

### Usage

The oracle service will automatically fetch and update electricity carbon data every hour. You can also trigger an update manually:

curl -X POST http://localhost:3000/trigger 