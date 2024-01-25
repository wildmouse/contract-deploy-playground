import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ledger";
import {configDotenv} from "dotenv";

configDotenv()

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [process.env.PRIVATE_KEY ?? ""],
        },
    },
};

export default config;
