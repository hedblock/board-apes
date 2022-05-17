const { assert, expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
chai.use(require('chai-as-promised')).should()
chai.use(require('chai-bn')(BN))

const {affen} = require('../data/affenTest.js');

describe("Board Apes", function() {
  describe('deployment', async function() {
    it('deploys successfully', async function() {
      const BoardApes = await ethers.getContractFactory("BoardApesTest")
      const boardApes = await BoardApes.deploy("aaa");
      const contract = await boardApes.deployed()
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('minting', async function() {

    let contract;

    beforeEach(async function() {
      const BoardApes = await ethers.getContractFactory("BoardApesTest");
      const boardApes = await BoardApes.deploy("aaa");
      contract = await boardApes.deployed();
    })

    describe('mint function', async function() {

        it('no mint before public sale', async function() {
          await contract.mint(1, { value: ethers.utils.parseEther("0.08")}).should.be.rejected
        })

        describe('public sale active', async function() {

          beforeEach(async function() {
            await contract.setSaleState(true);
          })

          it('mint out of quantity range', async function() {
            await contract.mint(0, { value: ethers.utils.parseEther("0")}).should.be.rejected
            await contract.mint(20, { value: ethers.utils.parseEther("1.6")}).should.be.rejected
          });

          it('mint incorrect price', async function() {
            await contract.mint(10, { value: ethers.utils.parseEther("0.08")}).should.be.rejected;
            await contract.mint(1, { value: ethers.utils.parseEther("0.8")}).should.be.rejected;
          });

          it('mint out of public range', async function() {

            const publicMintMax = await contract.publicMintMax();
            await Promise.all(Array(publicMintMax.toNumber() / 10).fill(0).map(() => {
              return contract.mint(10, { value: ethers.utils.parseEther("0.8")});
            })).should.be.fulfilled;
            const totalSupply = await contract.totalSupply();
            assert.equal(totalSupply.toNumber(), publicMintMax.toNumber());
            
            await contract.mint(1, { value: ethers.utils.parseEther("0.08")}).should.be.rejected;
            
          });

          it('mint 1 token', async function() {
            const [minter] = await ethers.getSigners();
            await contract.mint(1, { value: ethers.utils.parseEther("0.08")})

            const balance = await contract.balanceOf(minter.address)
            assert.equal(balance, 1);

            const totalSupply = await contract.totalSupply()
            // Success: 5 tokens should be minted.
            assert.equal(totalSupply, 1)
          })

          it('mint 10 tokens', async function() {
            const [minter] = await ethers.getSigners();
            await contract.mint(10, { value: ethers.utils.parseEther("0.8")})

            const balance = await contract.balanceOf(minter.address)
            assert.equal(balance, 10);

            const totalSupply = await contract.totalSupply()
            // Success: 5 tokens should be minted.
            assert.equal(totalSupply, 10)
          })
        })
    });

    describe('affe mint', async () => {

      describe('set affe ids', async () => {

        it('initialize affe ids', async () => {
          const tokenIds = Array.from({ length: affen.length }, (_, i) => i)
          await contract.setAffeIds(tokenIds, affen).should.be.fulfilled;
          await Promise.all(affen.map(async (affe, i) => {
            return (await contract.affeIds(i)).should.be.equal(affe);
          }));
        });

        it('initialize and update affe id', async () => {
          const tokenIds = Array.from({ length: affen.length }, (_, i) => i)
          await contract.setAffeIds(tokenIds, affen).should.be.fulfilled;
          await contract.setAffeIds([0], [affen[1]]).should.be.fulfilled;
          (await contract.affeIds(0)).should.be.equal(affen[1]);
        })

        it('initialize affe ids with wrong length', async () => {
          const tokenIds = Array.from({ length: affen.length - 1 }, (_, i) => i)
          await contract.setAffeIds(tokenIds, affen).should.be.rejected;
        });
      })

      describe('check affe owners', async () => {
        it('affe not owned reverts', async function() {
          const [minter] = await ethers.getSigners();
          contract.checkRedeemTest([affen[0]], minter).should.be.rejected;
        })

        it('affe owned passes and sets state with owner', async () => {
          const owner = "0x8125ef62932875F3DFAb6C9b39Fa12C087397CB5";
          const tokensOwned = [3, 7, 13, 15, 23, 31];
          contract.checkRedeemTest(tokensOwned.map(tokenId => affen[tokenId-1]), owner).should.be.fulfilled;
          await Promise.all(tokensOwned.map(async (tokenId, i) => {
            return (await contract.affeRedeemed(affen[tokenId-1])).should.be.equal(true);
          }))
        })

        it('double check reverts', async () => {
          const owner = "0x8125ef62932875F3DFAb6C9b39Fa12C087397CB5";
          const tokensOwned = [3, 7, 13, 15, 23, 31];
          contract.checkRedeemTest(tokensOwned.map(tokenId => affen[tokenId-1]), owner).should.be.fulfilled;
          contract.checkRedeemTest(tokensOwned.map(tokenId => affen[tokenId-1]), owner).should.be.rejected;
        })
      })
        
    })
    
  })
})

