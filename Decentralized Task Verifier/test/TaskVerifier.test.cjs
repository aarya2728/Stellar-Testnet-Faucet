const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TaskVerifier", function () {
  let TaskVerifier;
  let taskVerifier;
  let owner;
  let addr1;

  beforeEach(async function () {
    TaskVerifier = await ethers.getContractFactory("TaskVerifier");
    [owner, addr1] = await ethers.getSigners();
    taskVerifier = await TaskVerifier.deploy();
    await taskVerifier.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await taskVerifier.owner()).to.equal(owner.address);
    });

    it("Should start with 0 reports", async function () {
      expect(await taskVerifier.reportCount()).to.equal(0);
    });
  });

  describe("Transactions", function () {
    it("Should emit ReportCreated event when creating a report", async function () {
      await expect(taskVerifier.createReport("Test Data"))
        .to.emit(taskVerifier, "ReportCreated")
        .withArgs(1, "Test Data", owner.address);
      
      expect(await taskVerifier.reportCount()).to.equal(1);
    });

    it("Should revert if a non-owner tries to verify", async function () {
      await taskVerifier.createReport("Test Data");
      await expect(taskVerifier.connect(addr1).verifyReport(1))
        .to.be.revertedWith("Only owner can call this function");
    });

    it("Should emit ReportVerified event when owner verifies", async function () {
      await taskVerifier.createReport("Test Data");
      await expect(taskVerifier.verifyReport(1))
        .to.emit(taskVerifier, "ReportVerified")
        .withArgs(1);
        
      const report = await taskVerifier.reports(1);
      expect(report.verified).to.equal(true);
    });
  });
});
