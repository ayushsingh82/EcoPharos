// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title FlightCarbonOracle
 * @dev Contract for storing flight carbon emission data from real-world sources
 */
contract FlightCarbonOracle {
    address public owner;
    address public pendingOwner;
    
    struct FlightLeg {
        string departureAirport;
        string destinationAirport;
    }
    
    struct FlightData {
        uint256 carbonKg;      // Carbon emissions in kg
        uint256 passengers;    // Number of passengers
        uint256 distanceKm;    // Distance in kilometers
        uint256 timestamp;     // When the data was updated
        string metadata;       // Additional JSON metadata
    }
    
    // Mapping from flight route hash to flight data
    mapping(bytes32 => FlightData) public flightRouteData;
    
    // Latest updated flight route
    bytes32 public latestFlightRouteHash;
    FlightData public latestData;
    
    // For aggregation purposes
    mapping(address => bool) public authorizedProviders;
    mapping(bytes32 => mapping(address => FlightData)) public providerFlightData;
    address[] public providers;
    
    event DataUpdated(
        bytes32 flightRouteHash,
        uint256 carbonKg, 
        uint256 passengers, 
        uint256 distanceKm,
        uint256 timestamp, 
        string metadata
    );
    event ProviderAdded(address provider);
    event ProviderRemoved(address provider);
    event OwnershipTransferInitiated(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "FlightCarbonOracle: caller is not the owner");
        _;
    }
    
    modifier onlyProvider() {
        require(authorizedProviders[msg.sender], "FlightCarbonOracle: caller is not an authorized provider");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Generates a hash for a flight route
     */
    function getFlightRouteHash(FlightLeg[] calldata legs) public pure returns (bytes32) {
        return keccak256(abi.encode(legs));
    }
    
    /**
     * @dev Updates flight carbon data (restricted to authorized providers)
     */
    function updateFlightData(
        FlightLeg[] calldata legs,
        uint256 carbonKg,
        uint256 passengers,
        uint256 distanceKm,
        string calldata metadata
    ) external onlyProvider {
        bytes32 flightRouteHash = getFlightRouteHash(legs);
        
        providerFlightData[flightRouteHash][msg.sender] = FlightData({
            carbonKg: carbonKg,
            passengers: passengers,
            distanceKm: distanceKm,
            timestamp: block.timestamp,
            metadata: metadata
        });
        
        // Update the latest aggregated data for this flight route
        _aggregateData(flightRouteHash);
        
        // Update latest flight route
        latestFlightRouteHash = flightRouteHash;
        latestData = flightRouteData[flightRouteHash];
        
        emit DataUpdated(
            flightRouteHash,
            carbonKg, 
            passengers, 
            distanceKm,
            block.timestamp, 
            metadata
        );
    }
    
    /**
     * @dev Aggregates data from all providers for a specific flight route
     */
    function _aggregateData(bytes32 flightRouteHash) internal {
        uint256 totalCarbonKg = 0;
        uint256 totalPassengers = 0;
        uint256 totalDistanceKm = 0;
        uint256 count = 0;
        
        for (uint i = 0; i < providers.length; i++) {
            address provider = providers[i];
            if (providerFlightData[flightRouteHash][provider].timestamp > 0) {
                totalCarbonKg += providerFlightData[flightRouteHash][provider].carbonKg;
                totalPassengers += providerFlightData[flightRouteHash][provider].passengers;
                totalDistanceKm += providerFlightData[flightRouteHash][provider].distanceKm;
                count++;
            }
        }
        
        if (count > 0) {
            flightRouteData[flightRouteHash] = FlightData({
                carbonKg: totalCarbonKg / count,
                passengers: totalPassengers / count,
                distanceKm: totalDistanceKm / count,
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
     * @dev Returns the carbon data for a specific flight route
     */
    function getFlightData(FlightLeg[] calldata legs) external view returns (
        uint256 carbonKg, 
        uint256 passengers, 
        uint256 distanceKm,
        uint256 timestamp, 
        string memory metadata
    ) {
        bytes32 flightRouteHash = getFlightRouteHash(legs);
        FlightData memory data = flightRouteData[flightRouteHash];
        
        return (
            data.carbonKg, 
            data.passengers, 
            data.distanceKm,
            data.timestamp, 
            data.metadata
        );
    }
    
    /**
     * @dev Returns the latest flight data
     */
    function getLatestData() external view returns (
        uint256 carbonKg, 
        uint256 passengers, 
        uint256 distanceKm,
        uint256 timestamp, 
        string memory metadata
    ) {
        return (
            latestData.carbonKg, 
            latestData.passengers, 
            latestData.distanceKm,
            latestData.timestamp, 
            latestData.metadata
        );
    }
    
    /**
     * @dev Returns carbon per passenger per km
     */
    function getCarbonPerPassengerKm() external view returns (uint256) {
        if (latestData.passengers == 0 || latestData.distanceKm == 0) return 0;
        return (latestData.carbonKg * 1000) / (latestData.passengers * latestData.distanceKm);
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