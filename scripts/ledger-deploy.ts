import { ethers } from "hardhat";
import { LedgerSigner } from "@ethers-ext/signer-ledger";
import HIDTransport from "@ledgerhq/hw-transport-node-hid";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  let signer = new LedgerSigner(HIDTransport, ethers.provider);
  signer = signer.getSigner(process.env.HD_PATH);

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
    signer
  });

  await lock.waitForDeployment();

  console.log(
      `Lock with ${ethers.formatEther(
          lockedAmount
      )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
