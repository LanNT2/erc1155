const ERC1155 = artifacts.require("ERC1155");
const GameItems = artifacts.require("GameItems");

module.exports = function (deployer) {
    deployer.deploy(ERC1155, "./metadata/1.json");
    deployer.deploy(GameItems);
};
