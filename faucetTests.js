const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { TASK_NODE_GET_PROVIDER } = require('hardhat/builtin-tasks/task-names');

// what is describe?
describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const provider = ethers.provider;
    // use ethers library and take ABI+Bytecode of contracts and creates "instances" of them which we would deploy afterwards using .deploy() method
    const Faucet = await ethers.getContractFactory('Faucet');
    // we use small letters and .deploy method because it is an instance of the contractfactory big class Faucet
    const faucet = await Faucet.deploy();
    // it is in these brackets because it is an array and we are taking the first signer from getSigners method (which basically takes 10 accounts and kind of uses the contract). obviously the first signer is the owner/ deployer
    const [owner, non_owner] = await ethers.getSigners();
    // define this variable for the second test about 0.1ETH
    let withdrawAmount = ethers.utils.parseUnits("1", "ether");

    //checks:
    console.log('Signer 1 address: ', owner.address);
    console.log('Signer 2 address: ', non_owner.address);

    // this function returns an object and we choose what to put in it.
    return { faucet, owner, withdrawAmount, non_owner };
  }

  // "it" is part of the mocha library which is simply part of the describe function that performs some specific test. 
  it('should deploy and set the owner correctly', async function () {
    //remember the shitty ass object that it returned. well loadfixture deconstructs it, so we can use it further in the expect method!
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    //plus minus makes sense, but syntax is a bit weird
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1ETH at a time', async function () {
    const {faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  //"onlyOwner" modifier should work
  it('should allow to call function only if owner', async function () {
    const {faucet, non_owner } = await loadFixture(deployContractAndSetVariables);
    // connect to the instance of a faucet using non_owner account and try to call withdrawAll function
    const nonOwnerFaucet = faucet.connect(non_owner);
    await expect(nonOwnerFaucet.withdrawAll() && nonOwnerFaucet.destroyFaucet()).to.be.reverted ;
  });

  it('should destroy contract when destroyFaucet is called', async function () {

    const {faucet, owner } = await loadFixture(deployContractAndSetVariables);
    const destroy = await faucet.destroyFaucet();
    await destroy.wait();

    const destroyedContractAddress = await ethers.provider.getCode(faucet.address);
    await expect(destroyedContractAddress).to.equal("0x");
  });

  it('should return all the ether using withdrawAll', async function () {
    const {faucet, owner } = await loadFixture(deployContractAndSetVariables);
    const sendEther = await faucet.withdrawAll();

    const balance = await ethers.provider.getBalance(faucet.address);
    console.log(balance);

    await expect(balance).to.equal(ethers.utils.parseEther("0"));
  });

});