const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const s1 = ethers.provider.getSigner(1);
    const a1 = await s1.getAddress();
    const s2 = ethers.provider.getSigner(2);
    const a2 = await s2.getAddress();

    return { game, s1, a1, s2, a2 };
  }
  it('should be a winner', async function () {
    const { game, s1, a1, s2, a2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(s1).write(a2);

    await game.connect(s2).win(a1);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
