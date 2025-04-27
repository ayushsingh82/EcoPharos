// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title ElectricityCarbonOracle
 * @dev Contract for storing electricity carbon emission data from real-world sources
 */
contract ElectricityCarbonOracle {
    address public owner;
    address public pendingOwner;
    
    struct ElectricityData {
        uint256 carbonKg;        // Carbon emissions in kg
        uint256 energyValue;     // Energy value
        string energyUnit;       // Energy unit (kWh)
        string regionCode;       // Region code (e.g., US-NY, EU-FR)
        string energySource;     // Energy source mix description
        uint256 timestamp;       // When the data was updated
        string metadata;         // Additional JSON metadata
    }
    
    // Mapping from region code to electricity data
    mapping(string => ElectricityData) public regionData;
    
    // Latest updated region
    string public latestRegionCode;
    ElectricityData public latestData;
    
    // For aggregation purposes
    mapping(address => bool) public authorizedProviders;
    mapping(string => mapping(address => ElectricityData)) public providerRegionData;
    address[] public providers;
    
    // List of all regions
    string[] public regions;
    mapping(string => bool) public regionExists;
    
    event DataUpdated(
        string regionCode,
        uint256 carbonKg, 
        uint256 energyValue, 
        string energyUnit,
        string energySource,
        uint256 timestamp, 
        string metadata
    );
    event ProviderAdded(address provider);
    event ProviderRemoved(address provider);
    event OwnershipTransferInitiated(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "ElectricityCarbonOracle: caller is not the owner");
        _;
    }
    
    modifier onlyProvider() {
        require(authorizedProviders[msg.sender], "ElectricityCarbonOracle: caller is not an authorized provider");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Updates electricity carbon data (restricted to authorized providers)
     */
    function updateRegionData(
        string calldata regionCode,
        uint256 carbonKg,
        uint256 energyValue,
        string calldata energyUnit,
        string calldata energySource,
        string calldata metadata
    ) external onlyProvider {
        providerRegionData[regionCode][msg.sender] = ElectricityData({
            carbonKg: carbonKg,
            energyValue: energyValue,
            energyUnit: energyUnit,
            regionCode: regionCode,
            energySource: energySource,
            timestamp: block.timestamp,
            metadata: metadata
        });
        
        // Add region to list if it doesn't exist
        if (!regionExists[regionCode]) {
            regions.push(regionCode);
            regionExists[regionCode] = true;
        }
        
        // Update the latest aggregated data for this region
        _aggregateData(regionCode);
        
        // Update latest region
        latestRegionCode = regionCode;
        latestData = regionData[regionCode];
        
        emit DataUpdated(
            regionCode,
            carbonKg, 
            energyValue, 
            energyUnit,
            energySource,
            block.timestamp, 
            metadata
        );
    }
    
    /**
     * @dev Aggregates data from all providers for a specific region
     */
    function _aggregateData(string memory regionCode) internal {
        uint256 totalCarbonKg = 0;
        uint256 totalEnergyValue = 0;
        uint256 count = 0;
        string memory primaryEnergyUnit = "";
        string memory primaryEnergySource = "";
        
        for (uint i = 0; i < providers.length; i++) {
            address provider = providers[i];
            if (providerRegionData[regionCode][provider].timestamp > 0) {
                totalCarbonKg += providerRegionData[regionCode][provider].carbonKg;
                totalEnergyValue += providerRegionData[regionCode][provider].energyValue;
                count++;
                
                // Use the most recent data as the primary source
                if (providerRegionData[regionCode][provider].timestamp > regionData[regionCode].timestamp) {
                    primaryEnergyUnit = providerRegionData[regionCode][provider].energyUnit;
                    primaryEnergySource = providerRegionData[regionCode][provider].energySource;
                }
            }
        }
        
        if (count > 0) {
            regionData[regionCode] = ElectricityData({
                carbonKg: totalCarbonKg / count,
                energyValue: totalEnergyValue / count,
                energyUnit: primaryEnergyUnit,
                regionCode: regionCode,
                energySource: primaryEnergySource,
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
     * @dev Returns the carbon data for a specific region
     */
    function getRegionData(string calldata regionCode) external view returns (
        uint256 carbonKg, 
        uint256 energyValue, 
        string memory energyUnit,
        string memory energySource,
        uint256 timestamp, 
        string memory metadata
    ) {
        ElectricityData memory data = regionData[regionCode];
        
        return (
            data.carbonKg, 
            data.energyValue, 
            data.energyUnit,
            data.energySource,
            data.timestamp, 
            data.metadata
        );
    }
    
    /**
     * @dev Returns the latest electricity data
     */
    function getLatestData() external view returns (
        uint256 carbonKg, 
        uint256 energyValue, 
        string memory energyUnit,
        string memory regionCode,
        string memory energySource,
        uint256 timestamp, 
        string memory metadata
    ) {
        return (
            latestData.carbonKg, 
            latestData.energyValue, 
            latestData.energyUnit,
            latestData.regionCode,
            latestData.energySource,
            latestData.timestamp, 
            latestData.metadata
        );
    }
    
    /**
     * @dev Returns carbon per energy unit (g CO2 per kWh)
     */
    function getCarbonPerEnergyUnit(string calldata regionCode) external view returns (uint256) {
        ElectricityData memory data = regionData[regionCode];
        if (data.energyValue == 0) return 0;
        return (data.carbonKg * 1000) / data.energyValue; // Convert kg to g
    }
    
    /**
     * @dev Returns all regions
     */
    function getAllRegions() external view returns (string[] memory) {
        return regions;
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