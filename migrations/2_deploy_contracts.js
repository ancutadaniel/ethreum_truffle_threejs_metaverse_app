const Land = artifacts.require('Land');

module.exports = async (deployer) => {
  const NAME = 'DacetherLand Buildings';
  const SYMBOL = 'DCB';
  const COST = web3.utils.toWei('1', 'ether');

  // we pass artifacts, and variables to the constructor
  await deployer.deploy(Land, NAME, SYMBOL, COST);
};
