const Land = artifacts.require('Land');
const chai = require('chai');

chai.use(require('chai-as-promised')).should();

// helpers
const tokens = (n) => {
  return new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));
};

const EVM_REVERT = 'VM Exception while processing transaction: revert';

contract('Land', async ([deployer, buyer]) => {
  const NAME = 'DacetherLand Buildings';
  const SYMBOL = 'DCB';
  const COST = web3.utils.toWei('1', 'ether');

  let land, result;

  beforeEach('check deploy', async () => {
    land = await Land.new(NAME, SYMBOL, COST);
  });

  describe('contract is deployed', async () => {
    it('should have an address', async () => {
      const address = await land.address;
      console.log(address);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.isString(address);
    });

    it('should be deployed', async function () {
      await Land.deployed();
      return assert.isTrue(true);
    });

    it('should have a name, symbol, cost', async () => {
      const name = await land.name();
      const symbol = await land.symbol();
      const cost = await land.cost();

      assert.equal(name, `DacetherLand Buildings`);
      assert.equal(symbol, `DCB`);
      assert.equal(cost.toString(), tokens(1));

      assert.isNotEmpty(name);
      assert.isNotEmpty(symbol);
    });

    it('should have the max supply 5', async () => {
      result = await land.maxSupply();
      result.toString().should.equal('5');
    });

    it('returns the number of the buildings/land available', async () => {
      result = await land.getBuildings();
      result.length.should.equal(5);
    });
  });

  describe('Minting', async () => {
    describe('Success', () => {
      beforeEach(async () => {
        result = await land.mint(1, { from: deployer, value: COST });
      });

      it('Updates the owner address', async () => {
        result = await land.ownerOf(1);
        result.should.equal(deployer);
      });

      it('Updates building details', async () => {
        result = await land.getBuilding(1);
        result.owner.should.equal(deployer);
      });
    });
    describe('Failure', () => {
      it('Prevents mint with 0 value', async () => {
        await land
          .mint(1, { from: deployer, value: 0 })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it('Prevents mint with invalid ID', async () => {
        await land
          .mint(100, { from: deployer, value: 1 })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it('Prevents minting if already owned', async () => {
        await land.mint(1, { from: deployer, value: COST });
        await land
          .mint(1, { from: buyer, value: COST })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });

  describe('Transfers', () => {
    describe('success', () => {
      beforeEach(async () => {
        await land.mint(1, { from: deployer, value: COST });
        await land.approve(buyer, 1, { from: deployer });
        await land.transferFrom(deployer, buyer, 1, { from: buyer });
      });

      it('Updates the owner address', async () => {
        result = await land.ownerOf(1);
        result.should.equal(buyer);
      });

      it('Updates building details', async () => {
        result = await land.getBuilding(1);
        result.owner.should.equal(buyer);
      });
    });

    describe('failure', () => {
      it('Prevents transfers without ownership', async () => {
        await land
          .transferFrom(deployer, buyer, 1, { from: buyer })
          .should.be.rejectedWith(EVM_REVERT);
      });

      it('Prevents transfers without approval', async () => {
        await land.mint(1, { from: deployer, value: COST });
        await land
          .transferFrom(deployer, buyer, 1, { from: buyer })
          .should.be.rejectedWith(EVM_REVERT);
      });
    });
  });
});
