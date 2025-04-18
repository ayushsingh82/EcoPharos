import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";

dotenv.config();

// Initialize Express app for health checks and manual triggers
const app = express();
const PORT = process.env.PORT || 3001;

// Contract configuration
const contractAddress = process.env.FLIGHT_CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.FLIGHT_CONTRACT_ABI);
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Carbon API configuration
const CARBON_API_KEY = process.env.CARBON_API_KEY;
const CARBON_API_URL = "https://www.carboninterface.com/api/v1/estimates";

// Flight data configuration
const PASSENGERS = process.env.PASSENGERS || "2";
const FLIGHT_LEGS = JSON.parse(process.env.FLIGHT_LEGS || '[{"departure_airport":"sfo","destination_airport":"yyz"},{"departure_airport":"yyz","destination_airport":"sfo"}]');

/**
 * Fetches flight carbon data from Carbon Interface API
 */
async function fetchFlightData() {
  try {
    console.log("Fetching flight carbon data...");
    
    const response = await axios.post(
      CARBON_API_URL,
      {
        type: "flight",
        passengers: parseInt(PASSENGERS),
        legs: FLIGHT_LEGS
      },
      {
        headers: {
          Authorization: `Bearer ${CARBON_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    
    const data = response.data.data.attributes;
    
    // Create metadata with additional information
    const metadata = JSON.stringify({
      carbon_g: data.carbon_g,
      carbon_lb: data.carbon_lb,
      carbon_mt: data.carbon_mt,
      estimated_at: data.estimated_at,
      distance_unit: data.distance_unit,
      timestamp: new Date().toISOString()
    });
    
    // Format legs for the smart contract
    const legs = data.legs.map(leg => ({
      departureAirport: leg.departure_airport,
      destinationAirport: leg.destination_airport
    }));
    
    return {
      legs,
      carbonKg: data.carbon_kg,
      passengers: data.passengers,
      distanceKm: data.distance_value,
      metadata
    };
  } catch (error) {
    console.error("Error fetching flight carbon data:", error.message);
    if (error.response) {
      console.error("API response:", error.response.data);
    }
    throw error;
  }
}

/**
 * Pushes flight carbon data to the blockchain
 */
async function pushToBlockchain(data) {
  try {
    console.log(`Pushing data to blockchain: ${data.carbonKg}kg CO2 for ${data.passengers} passengers over ${data.distanceKm}km`);
    
    // Get current gas price and add 10% to ensure transaction goes through
    const gasPrice = (await provider.getGasPrice()).mul(110).div(100);
    
    const tx = await contract.updateFlightData(
      data.legs,
      data.carbonKg,
      data.passengers,
      Math.round(data.distanceKm),
      data.metadata,
      { gasPrice }
    );
    
    console.log(`Transaction submitted: ${tx.hash}`);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
    
    return receipt;
  } catch (error) {
    console.error("Error pushing to blockchain:", error.message);
    throw error;
  }
}

/**
 * Main function to fetch and update flight carbon data
 */
async function updateFlightData() {
  try {
    const data = await fetchFlightData();
    const receipt = await pushToBlockchain(data);
    return { success: true, data, receipt };
  } catch (error) {
    console.error("Failed to update flight carbon data:", error);
    return { success: false, error: error.message };
  }
}

// Schedule the job to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled flight carbon data update...");
  await updateFlightData();
});

// API endpoints
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.post("/trigger-update", async (req, res) => {
  try {
    const result = await updateFlightData();
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Flight Carbon Oracle service running on port ${PORT}`);
});

// Initial update on startup
updateFlightData().then(() => {
  console.log("Initial flight carbon data update completed");
}); 