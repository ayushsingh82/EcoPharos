// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title VehicleCarbonOracle
 * @dev Contract for storing vehicle carbon emission data from real-world sources
 */
contract VehicleCarbonOracle {
    address public owner;
    address public pendingOwner;
    
    struct VehicleData {
        uint256 carbonKg;      // Carbon emissions in kg
        uint256 distanceValue; // Distance value
        string distanceUnit;   // Distance unit (mi or km)
        string vehicleMake;    // Vehicle make (e.g., Toyota)
        string vehicleModel;   // Vehicle model (e.g., Corolla)
        uint256 vehicleYear;   // Vehicle year
        string vehicleModelId; // Vehicle model ID from API
        uint256 timestamp;     // When the data was updated
        string metadata;       // Additional JSON metadata
    }
    
    // Mapping from vehicle model ID to vehicle data
    mapping(string => VehicleData) public vehicleModelData;
    
    // Latest updated vehicle model ID
    string public latestVehicleModelId;
    VehicleData public latestData;
    
    // For aggregation purposes
    mapping(address => bool) public authorizedProviders;
    mapping(string => mapping(address => VehicleData)) public providerVehicleData;
    address[] public providers;
    
    event DataUpdated(
        string vehicleModelId,
        uint256 carbonKg, 
        uint256 distanceValue, 
        string distanceUnit,
        string vehicleMake,
        string vehicleModel,
        uint256 vehicleYear,
        uint256 timestamp, 
        string metadata
    );
    event ProviderAdded(address provider);
    event ProviderRemoved(address provider);
    event OwnershipTransferInitiated(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "VehicleCarbonOracle: caller is not the owner");
        _;
    }
    
    modifier onlyProvider() {
        require(authorizedProviders[msg.sender], "VehicleCarbonOracle: caller is not an authorized provider");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Updates vehicle carbon data (restricted to authorized providers)
     */
    function updateVehicleData(
        string calldata vehicleModelId,
        uint256 carbonKg,
        uint256 distanceValue,
        string calldata distanceUnit,
        string calldata vehicleMake,
        string calldata vehicleModel,
        uint256 vehicleYear,
        string calldata metadata
    ) external onlyProvider {
        providerVehicleData[vehicleModelId][msg.sender] = VehicleData({
            carbonKg: carbonKg,
            distanceValue: distanceValue,
            distanceUnit: distanceUnit,
            vehicleMake: vehicleMake,
            vehicleModel: vehicleModel,
            vehicleYear: vehicleYear,
            vehicleModelId: vehicleModelId,
            timestamp: block.timestamp,
            metadata: metadata
        });
        
        // Update the latest aggregated data for this vehicle model
        _aggregateData(vehicleModelId);
        
        // Update latest vehicle model ID
        latestVehicleModelId = vehicleModelId;
        latestData = vehicleModelData[vehicleModelId];
        
        emit DataUpdated(
            vehicleModelId,
            carbonKg, 
            distanceValue, 
            distanceUnit,
            vehicleMake,
            vehicleModel,
            vehicleYear,
            block.timestamp, 
            metadata
        );
    }
    
    /**
     * @dev Aggregates data from all providers for a specific vehicle model
     */
    function _aggregateData(string memory vehicleModelId) internal {
        uint256 totalCarbonKg = 0;
        uint256 totalDistanceValue = 0;
        uint256 count = 0;
        string memory primaryDistanceUnit = "";
        string memory primaryVehicleMake = "";
        string memory primaryVehicleModel = "";
        uint256 primaryVehicleYear = 0;
        
        for (uint i = 0; i < providers.length; i++) {
            address provider = providers[i];
            if (providerVehicleData[vehicleModelId][provider].timestamp > 0) {
                totalCarbonKg += providerVehicleData[vehicleModelId][provider].carbonKg;
                totalDistanceValue += providerVehicleData[vehicleModelId][provider].distanceValue;
                count++;
                
                // Use the most recent data as the primary source
                if (providerVehicleData[vehicleModelId][provider].timestamp > vehicleModelData[vehicleModelId].timestamp) {
                    primaryDistanceUnit = providerVehicleData[vehicleModelId][provider].distanceUnit;
                    primaryVehicleMake = providerVehicleData[vehicleModelId][provider].vehicleMake;
                    primaryVehicleModel = providerVehicleData[vehicleModelId][provider].vehicleModel;
                    primaryVehicleYear = providerVehicleData[vehicleModelId][provider].vehicleYear;
                }
            }
        }
        
        if (count > 0) {
            vehicleModelData[vehicleModelId] = VehicleData({
                carbonKg: totalCarbonKg / count,
                distanceValue: totalDistanceValue / count,
                distanceUnit: primaryDistanceUnit,
                vehicleMake: primaryVehicleMake,
                vehicleModel: primaryVehicleModel,
                vehicleYear: primaryVehicleYear,
                vehicleModelId: vehicleModelId,
                timestamp: block.timestamp,
                metadata: '{"aggregation":"average"}'
            });
        }
    }
    
    /**
     * @dev Adds a new authorized data provider
     */
    function addProvider(address provider) external onlyOwner {
        require(!authorizedProviders[provider], "Provider already exists");
        authorizedProviders[provider] = true;
        providers.push(provider);
        emit ProviderAdded(provider);
    }
    
    /**
     * @dev Removes an authorized data provider
     */
    function removeProvider(address provider) external onlyOwner {
        require(authorizedProviders[provider], "Provider doesn't exist");
        authorizedProviders[provider] = false;
        
        // Remove from the providers array
        for (uint i = 0; i < providers.length; i++) {
            if (providers[i] == provider) {
                providers[i] = providers[providers.length - 1];
                providers.pop();
                break;
            }
        }
        
        emit ProviderRemoved(provider);
    }
    
    /**
     * @dev Returns the carbon data for a specific vehicle model
     */
    function getVehicleData(string calldata vehicleModelId) external view returns (
        uint256 carbonKg, 
        uint256 distanceValue, 
        string memory distanceUnit,
        string memory vehicleMake,
        string memory vehicleModel,
        uint256 vehicleYear,
        uint256 timestamp, 
        string memory metadata
    ) {
        VehicleData memory data = vehicleModelData[vehicleModelId];
        
        return (
            data.carbonKg, 
            data.distanceValue, 
            data.distanceUnit,
            data.vehicleMake,
            data.vehicleModel,
            data.vehicleYear,
            data.timestamp, 
            data.metadata
        );
    }
    
    /**
     * @dev Returns the latest vehicle data
     */
    function getLatestData() external view returns (
        uint256 carbonKg, 
        uint256 distanceValue, 
        string memory distanceUnit,
        string memory vehicleMake,
        string memory vehicleModel,
        uint256 vehicleYear,
        uint256 timestamp, 
        string memory metadata
    ) {
        return (
            latestData.carbonKg, 
            latestData.distanceValue, 
            latestData.distanceUnit,
            latestData.vehicleMake,
            latestData.vehicleModel,
            latestData.vehicleYear,
            latestData.timestamp, 
            latestData.metadata
        );
    }
    
    /**
     * @dev Returns carbon per distance unit
     */
    function getCarbonPerDistanceUnit() external view returns (uint256) {
        if (latestData.distanceValue == 0) return 0;
        return (latestData.carbonKg * 1000) / latestData.distanceValue;
    }
    
    /**
     * @dev Initiates ownership transfer
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        pendingOwner = newOwner;
        emit OwnershipTransferInitiated(owner, newOwner);
    }
    
    /**
     * @dev Accepts ownership transfer
     */
    function acceptOwnership() external {
        require(msg.sender == pendingOwner, "Only pending owner can accept ownership");
        emit OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }
} 