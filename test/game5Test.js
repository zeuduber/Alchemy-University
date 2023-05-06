// took the solution from this github so give the man credit: https://github.com/Yorkzhong1/Contract-Puzzles/blob/master/test/game5Test.js
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
  

    return { game};
  }
//here generate random address which is lower than threshold
  async function getAddress(){
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    let address = threshold
    while(true){
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      address = await wallet.getAddress();
      // console.log(address)
      if(address<threshold){
        return {wallet,address}
      }
    }
    

  }

  it('should be a winner', async function () {
    const { game} = await loadFixture(deployContractAndSetVariables);
    const {wallet,address} = await getAddress();//get a random address below threshold
    console.log(`get randome address${address}`)
    
    //the random address does not have gas, send some gas to it:
    const signer = ethers.provider.getSigner(0);
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
    });

    // const balance0ETH = await ethers.provider.getBalance(wallet.address);
    // console.log(`${address}balance is ${balance0ETH}`)

    // good luck
    const tx = await game.connect(wallet).win();
    console.log(`Transaction sent from address ${address}...`)
    await tx.wait()
    // await game.win();
    console.log('Transaction completed')

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
    // assert(true, 'You did not win the game');
  });
});