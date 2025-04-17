// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title CarbonOracle
 * @dev Contract for storing carbon credit data from real-world sources
 */
contract CarbonOracle {
    address public owner;
    address public pendingOwner;
    
    struct CarbonData {
        uint256 value;      // Carbon value in kg
        uint256 timestamp;  // When the data was updated
        string source;      // Data source identifier
        string metadata;    // Additional JSON metadata
    }
    
    CarbonData public latestData;
    
    // For aggregation purposes
    mapping(address => bool) public authorizedProviders;
    mapping(address => CarbonData) public providerData;
    address[] public providers;
    
    event DataUpdated(uint256 value, uint256 timestamp, string source, string metadata);
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
     * @dev Updates carbon data (restricted to authorized providers)
     */
    function updateCarbonData(uint256 value, string calldata source, string calldata metadata) external onlyProvider {
        providerData[msg.sender] = CarbonData({
            value: value,
            timestamp: block.timestamp,
            source: source,
            metadata: metadata
        });
        
        // Update the latest aggregated data
        _aggregateData();
        
        emit DataUpdated(value, block.timestamp, source, metadata);
    }
    
    /**
     * @dev Aggregates data from all providers (simple average in this implementation)
     */
    function _aggregateData() internal {
        uint256 total = 0;
        uint256 count = 0;
        string memory primarySource = "";
        
        for (uint i = 0; i < providers.length; i++) {
            address provider = providers[i];
            if (providerData[provider].timestamp > 0) {
                total += providerData[provider].value;
                count++;
                
                // Use the most recent source as the primary source
                if (providerData[provider].timestamp > latestData.timestamp) {
                    primarySource = providerData[provider].source;
                }
            }
        }
        
        if (count > 0) {
            latestData = CarbonData({
                value: total / count,
                timestamp: block.timestamp,
                source: primarySource,
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
     * @dev Returns the latest carbon data
     */
    function getLatestData() external view returns (uint256 value, uint256 timestamp, string memory source, string memory metadata) {
        return (latestData.value, latestData.timestamp, latestData.source, latestData.metadata);
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