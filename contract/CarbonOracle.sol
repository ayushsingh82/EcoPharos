// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title CarbonOracle
 * @dev Contract for storing electricity carbon emission data from real-world sources
 */
contract CarbonOracle {
    address public owner;
    address public pendingOwner;
    
    struct ElectricityData {
        uint256 carbonKg;      // Carbon emissions in kg
        uint256 electricityMwh; // Electricity consumption in MWh
        string country;        // Country code
        string state;          // State/province code
        uint256 timestamp;     // When the data was updated
        string metadata;       // Additional JSON metadata
    }
    
    ElectricityData public latestData;
    
    // For aggregation purposes
    mapping(address => bool) public authorizedProviders;
    mapping(address => ElectricityData) public providerData;
    address[] public providers;
    
    event DataUpdated(
        uint256 carbonKg, 
        uint256 electricityMwh, 
        string country, 
        string state, 
        uint256 timestamp, 
        string metadata
    );
    event ProviderAdded(address provider);
    event ProviderRemoved(address provider);
    event OwnershipTransferInitiated(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "CarbonOracle: caller is not the owner");
        _;
    }
    
    modifier onlyProvider() {
        require(authorizedProviders[msg.sender], "CarbonOracle: caller is not an authorized provider");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Updates electricity carbon data (restricted to authorized providers)
     */
    function updateElectricityData(
        uint256 carbonKg,
        uint256 electricityMwh,
        string calldata country,
        string calldata state,
        string calldata metadata
    ) external onlyProvider {
        providerData[msg.sender] = ElectricityData({
            carbonKg: carbonKg,
            electricityMwh: electricityMwh,
            country: country,
            state: state,
            timestamp: block.timestamp,
            metadata: metadata
        });
        
        // Update the latest aggregated data
        _aggregateData();
        
        emit DataUpdated(
            carbonKg, 
            electricityMwh, 
            country, 
            state, 
            block.timestamp, 
            metadata
        );
    }
    
    /**
     * @dev Aggregates data from all providers (simple average in this implementation)
     */
    function _aggregateData() internal {
        uint256 totalCarbonKg = 0;
        uint256 totalElectricityMwh = 0;
        uint256 count = 0;
        string memory primaryCountry = "";
        string memory primaryState = "";
        
        for (uint i = 0; i < providers.length; i++) {
            address provider = providers[i];
            if (providerData[provider].timestamp > 0) {
                totalCarbonKg += providerData[provider].carbonKg;
                totalElectricityMwh += providerData[provider].electricityMwh;
                count++;
                
                // Use the most recent data as the primary source
                if (providerData[provider].timestamp > latestData.timestamp) {
                    primaryCountry = providerData[provider].country;
                    primaryState = providerData[provider].state;
                }
            }
        }
        
        if (count > 0) {
            latestData = ElectricityData({
                carbonKg: totalCarbonKg / count,
                electricityMwh: totalElectricityMwh / count,
                country: primaryCountry,
                state: primaryState,
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
     * @dev Returns the latest electricity carbon data
     */
    function getLatestData() external view returns (
        uint256 carbonKg, 
        uint256 electricityMwh, 
        string memory country, 
        string memory state, 
        uint256 timestamp, 
        string memory metadata
    ) {
        return (
            latestData.carbonKg, 
            latestData.electricityMwh, 
            latestData.country, 
            latestData.state, 
            latestData.timestamp, 
            latestData.metadata
        );
    }
    
    /**
     * @dev Returns carbon intensity (kg CO2 per MWh)
     */
    function getCarbonIntensity() external view returns (uint256) {
        if (latestData.electricityMwh == 0) return 0;
        return (latestData.carbonKg * 1000) / latestData.electricityMwh;
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