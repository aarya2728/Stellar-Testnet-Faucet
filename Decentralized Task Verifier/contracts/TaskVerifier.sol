// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TaskVerifier {
    struct Report {
        uint256 id;
        string data;
        address submitter;
        bool verified;
    }

    address public owner;
    uint256 public reportCount;
    mapping(uint256 => Report) public reports;

    event ReportCreated(uint256 indexed id, string data, address submitter);
    event ReportVerified(uint256 indexed id);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createReport(string memory _data) public {
        reportCount++;
        reports[reportCount] = Report(reportCount, _data, msg.sender, false);
        emit ReportCreated(reportCount, _data, msg.sender);
    }

    function verifyReport(uint256 _id) public onlyOwner {
        require(_id > 0 && _id <= reportCount, "Invalid report ID");
        require(!reports[_id].verified, "Report already verified");
        
        reports[_id].verified = true;
        emit ReportVerified(_id);
    }

    function getReports() public view returns (Report[] memory) {
        Report[] memory allReports = new Report[](reportCount);
        for (uint256 i = 1; i <= reportCount; i++) {
            allReports[i - 1] = reports[i];
        }
        return allReports;
    }
}
