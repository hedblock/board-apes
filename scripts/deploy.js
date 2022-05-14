const hre = require("hardhat");

async function main() {
  const BoardApes = await hre.ethers.getContractFactory("BoardApes");
  const boardApes = await BoardApes.deploy("abcdefg");
  await boardApes.deployed();
  console.log("Minter deployed to:", boardApes.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
