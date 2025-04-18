import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";

dotenv.config();

// Initialize Express app for health checks and manual triggers
const app = express();
const PORT = process.env.PORT || 3000;

// Contract configuration
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.CONTRACT_ABI);
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Carbon API configuration
const CARBON_API_KEY = process.env.CARBON_API_KEY;
const CARBON_API_URL = "https://www.carboninterface.com/api/v1/estimates";

// Electricity data configuration
const ELECTRICITY_MWH = process.env.ELECTRICITY_MWH || "42";
const COUNTRY = process.env.COUNTRY || "us";
const STATE = process.env.STATE || "fl";

/**
 * Fetches electricity carbon data from Carbon Interface API
 */
async function fetchElectricityData() {
  try {
    console.log("Fetching electricity carbon data...");
    
    const response = await axios.post(
      CARBON_API_URL,
      {
        type: "electricity",
        electricity_unit: "mwh",
        electricity_value: ELECTRICITY_MWH,
        country: COUNTRY,
        state: STATE
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
      timestamp: new Date().toISOString()
    });
    
    return {
      carbonKg: data.carbon_kg,
      electricityMwh: parseFloat(data.electricity_value),
      country: data.country,
      state: data.state,
      metadata
    };
  } catch (error) {
    console.error("Error fetching electricity carbon data:", error.message);
    if (error.response) {
      console.error("API response:", error.response.data);
    }
    throw error;
  }
}

/**
 * Pushes electricity carbon data to the blockchain
 */
async function pushToBlockchain(data) {
  try {
    console.log(`Pushing data to blockchain: ${data.carbonKg}kg CO2 for ${data.electricityMwh}MWh in ${data.country}-${data.state}`);
    
    // Get current gas price and add 10% to ensure transaction goes through
    const gasPrice = (await provider.getGasPrice()).mul(110).div(100);
    
    const tx = await contract.updateElectricityData(
      data.carbonKg,
      ethers.utils.parseUnits(data.electricityMwh.toString(), 'ether'),
      data.country,
      data.state,
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
 * Main function to fetch and update electricity carbon data
 */
async function updateElectricityData() {
  try {
    const data = await fetchElectricityData();
    const receipt = await pushToBlockchain(data);
    return { success: true, data, receipt };
  } catch (error) {
    console.error("Failed to update electricity carbon data:", error);
    return { success: false, error: error.message };
  }
}

// Schedule the job to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled electricity carbon data update...");
  await updateElectricityData();
});

// API endpoints
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.post("/trigger-update", async (req, res) => {
  try {
    const result = await updateElectricityData();
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Electricity Carbon Oracle service running on port ${PORT}`);
});

// Initial update on startup
updateElectricityData().then(() => {
  console.log("Initial electricity carbon data update completed");
}); 