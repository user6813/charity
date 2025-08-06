// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Charity is Ownable, ReentrancyGuard {
    struct Campaign {
        uint256 id;
        string title;
        string description;
        address payable beneficiary;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        bool active;
        bool goalReached;
    }

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        uint256 campaignId;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Donation[]) public campaignDonations;
    mapping(address => uint256[]) public donorCampaigns;
    
    uint256 public campaignCounter;
    uint256 public totalDonations;
    
    event CampaignCreated(uint256 indexed campaignId, string title, address beneficiary, uint256 goal, uint256 deadline);
    event DonationMade(uint256 indexed campaignId, address indexed donor, uint256 amount);
    event CampaignCompleted(uint256 indexed campaignId, uint256 totalRaised);
    event FundsWithdrawn(uint256 indexed campaignId, address beneficiary, uint256 amount);

    constructor() {}

    function createCampaign(
        string memory _title,
        string memory _description,
        address payable _beneficiary,
        uint256 _goal,
        uint256 _durationInDays
    ) external returns (uint256) {
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");
        require(_beneficiary != address(0), "Invalid beneficiary address");

        uint256 deadline = block.timestamp + (_durationInDays * 1 days);
        
        campaigns[campaignCounter] = Campaign({
            id: campaignCounter,
            title: _title,
            description: _description,
            beneficiary: _beneficiary,
            goal: _goal,
            raised: 0,
            deadline: deadline,
            active: true,
            goalReached: false
        });

        emit CampaignCreated(campaignCounter, _title, _beneficiary, _goal, deadline);
        
        return campaignCounter++;
    }

    function donate(uint256 _campaignId) external payable nonReentrant {
        require(msg.value > 0, "Donation must be greater than 0");
        require(_campaignId < campaignCounter, "Campaign does not exist");
        
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is not active");
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        campaign.raised += msg.value;
        totalDonations += msg.value;
        
        campaignDonations[_campaignId].push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            campaignId: _campaignId
        }));
        
        donorCampaigns[msg.sender].push(_campaignId);

        if (campaign.raised >= campaign.goal && !campaign.goalReached) {
            campaign.goalReached = true;
            emit CampaignCompleted(_campaignId, campaign.raised);
        }

        emit DonationMade(_campaignId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _campaignId) external nonReentrant {
        require(_campaignId < campaignCounter, "Campaign does not exist");
        
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.beneficiary, "Only beneficiary can withdraw");
        require(campaign.raised > 0, "No funds to withdraw");
        require(block.timestamp >= campaign.deadline || campaign.goalReached, "Campaign still active");

        uint256 amount = campaign.raised;
        campaign.raised = 0;
        campaign.active = false;

        campaign.beneficiary.transfer(amount);
        
        emit FundsWithdrawn(_campaignId, campaign.beneficiary, amount);
    }

    function getCampaign(uint256 _campaignId) external view returns (Campaign memory) {
        require(_campaignId < campaignCounter, "Campaign does not exist");
        return campaigns[_campaignId];
    }

    function getCampaignDonations(uint256 _campaignId) external view returns (Donation[] memory) {
        require(_campaignId < campaignCounter, "Campaign does not exist");
        return campaignDonations[_campaignId];
    }

    function getDonorCampaigns(address _donor) external view returns (uint256[] memory) {
        return donorCampaigns[_donor];
    }

    function getAllActiveCampaigns() external view returns (Campaign[] memory) {
        uint256 activeCount = 0;
        
        // Count active campaigns
        for (uint256 i = 0; i < campaignCounter; i++) {
            if (campaigns[i].active && block.timestamp < campaigns[i].deadline) {
                activeCount++;
            }
        }
        
        Campaign[] memory activeCampaigns = new Campaign[](activeCount);
        uint256 index = 0;
        
        // Populate active campaigns
        for (uint256 i = 0; i < campaignCounter; i++) {
            if (campaigns[i].active && block.timestamp < campaigns[i].deadline) {
                activeCampaigns[index] = campaigns[i];
                index++;
            }
        }
        
        return activeCampaigns;
    }
}