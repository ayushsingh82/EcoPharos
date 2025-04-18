import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";

dotenv.config();

// Initialize Express app for health checks and manual triggers
const app = express();
const PORT = process.env.PORT || 3002;

// Contract configuration
const contractAddress = process.env.VEHICLE_CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.VEHICLE_CONTRACT_ABI);
const privateKey = process.exnv.PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Carbon API configuration
const CARBON_API_KEY = process.env.CARBON_API_KEY;
const CARBON_API_URL = "https://www.carboninterface.com/api/v1/estimates";

// Vehicle data configuration
const DISTANCE_UNIT = process.env.DISTANCE_UNIT || "mi";
const DISTANCE_VALUE = process.env.DISTANCE_VALUE || "100";
const VEHICLE_MODEL_ID = process.env.VEHICLE_MODEL_ID || "7268a9b7-17e8-4c8d-acca-57059252afe9";

/**
 * Fetches vehicle carbon data from Carbon Interface API
 */
async function fetchVehicleData() {
  try {
    console.log("Fetching vehicle carbon data...");
    
    const response = await axios.post(
      CARBON_API_URL,
      {
        type: "vehicle",
        distance_unit: DISTANCE_UNIT,
        distance_value: parseInt(DISTANCE_VALUE),
        vehicle_model_id: VEHICLE_MODEL_ID
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
      vehicleModelId: data.vehicle_model_id,
      carbonKg: data.carbon_kg,
      distanceValue: data.distance_value,
      distanceUnit: data.distance_unit,
      vehicleMake: data.vehicle_make,
      vehicleModel: data.vehicle_model,
      vehicleYear: data.vehicle_year,
      metadata
    };
  } catch (error) {
    console.error("Error fetching vehicle carbon data:", error.message);
    if (error.response) {
      console.error("API response:", error.response.data);
    }
    throw error;
  }
}

/**
 * Pushes vehicle carbon data to the blockchain
 */
async function pushToBlockchain(data) {
  try {
    console.log(`Pushing data to blockchain: ${data.carbonKg}kg CO2 for ${data.distanceValue}${data.distanceUnit} in a ${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`);
    
    // Get current gas price and add 10% to ensure transaction goes through
    const gasPrice = (await provider.getGasPrice()).mul(110).div(100);
    
    const tx = await contract.updateVehicleData(
      data.vehicleModelId,
      data.carbonKg,
      Math.round(data.distanceValue),
      data.distanceUnit,
      data.vehicleMake,
      data.vehicleModel,
      data.vehicleYear,
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
 * Main function to fetch and update vehicle carbon data
 */
async function updateVehicleData() {
  try {
    const data = await fetchVehicleData();
    const receipt = await pushToBlockchain(data);
    return { success: true, data, receipt };
  } catch (error) {
    console.error("Failed to update vehicle carbon data:", error);
    return { success: false, error: error.message };
  }
}

// Schedule the job to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running scheduled vehicle carbon data update...");
  await updateVehicleData();
});

// API endpoints
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.post("/trigger-update", async (req, res) => {
  try {
    const result = await updateVehicleData();
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Vehicle Carbon Oracle service running on port ${PORT}`);
});

// Initial update on startup
updateVehicleData().then(() => {
  console.log("Initial vehicle carbon data update completed");
}); 