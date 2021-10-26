const GameItems = artifacts.require("GameItems");
const ERC1155 = artifacts.require("ERC1155");

contract("GameItems", async accounts =>{
    var gameItems;
    const GOLD = 0;
    const SILVER = 1;
    const THORS_HAMMER = 2;
    const SWORD = 3;
    const SHIELD = 4;
    // Initialize accounts
    const accountA = accounts[0];
    const accountB = accounts[1];
    const accountC = accounts[2];
    before("mint() GameItems ",async function(){
        gameItems = await GameItems.deployed();
        await gameItems.mint(accountA, GOLD, 1000000, []);
        await gameItems.mint(accountA, SILVER, 1000000, []);
        await gameItems.mint(accountA, THORS_HAMMER, 1, []);
        await gameItems.mint(accountA, SWORD, 1000000, []);
        await gameItems.mint(accountA, SHIELD, 1000000, []);
    });

    it("Test mint()", async function(){
          //Test mint
         let totalSupplyOfGoldA = await gameItems.balanceOf(accountA,GOLD);
         let totalSupplyOfSilverA = await gameItems.balanceOf(accountA,SILVER);
         let totalSupplyOfThorHammerA = await gameItems.balanceOf(accountA,THORS_HAMMER);
         let totalSupplyOfSwordA = await gameItems.balanceOf(accountA,SWORD);
         let totalSupplyOfShieldA = await gameItems.balanceOf(accountA,SHIELD);
    
         assert.equal(totalSupplyOfGoldA.valueOf(),1000000);
         assert.equal(totalSupplyOfSilverA.valueOf(),1000000);
         assert.equal(totalSupplyOfThorHammerA.valueOf(),1);
         assert.equal(totalSupplyOfSwordA.valueOf(),1000000);
         assert.equal(totalSupplyOfShieldA.valueOf(),1000000);
    });

    it("Test safeTransferFrom()", async function(){

         //Test safeTransferFrom
        await gameItems.safeTransferFrom(accountA,accountB,0,1000,[]);

        let totalSupplyOfGoldB = await gameItems.balanceOf(accountB,GOLD);
        let totalSupplyOfGoldA = await gameItems.balanceOf(accountA,GOLD);
        assert.equal(totalSupplyOfGoldB.valueOf(),1000);
        assert.equal(totalSupplyOfGoldA.valueOf(),(1000000-1000));          
    });

    it("Test safeBatchTransferFrom()", async function(){
         //Test safeBatchTransferFrom

         await gameItems.safeBatchTransferFrom(accountA,accountB,[1,3],[1000,1000],[]);

         let totalSupplyOfSilverB = await gameItems.balanceOf(accountB,SILVER);
         let totalSupplyOfSwordB = await gameItems.balanceOf(accountB,SWORD);
         let totalSupplyOfSilverA = await gameItems.balanceOf(accountA,SILVER);
         let totalSupplyOfSwordA = await gameItems.balanceOf(accountA,SWORD);
 
         assert.equal(totalSupplyOfSilverB.valueOf(),1000);
         assert.equal(totalSupplyOfSwordB.valueOf(),1000);
         assert.equal(totalSupplyOfSilverA.valueOf(),1000000-1000);
         assert.equal(totalSupplyOfSwordA.valueOf(),1000000-1000);
    });

    it("Test balanceOfBatch()", async function(){
        // Test balanceOfbatch
        let balanceOfbatch = await gameItems.balanceOfBatch([accountB,accountB,accountB],[0,1,3]);
        assert.equal(balanceOfbatch[0].valueOf(),1000);
        assert.equal(balanceOfbatch[1].valueOf(),1000);
        assert.equal(balanceOfbatch[2].valueOf(),1000); 
   });

   it("Test setApprovalForAll()", async function(){
    //test setApprovalForAll
     await gameItems.setApprovalForAll(accountB,true);
     var isApproved = await gameItems.isApprovedForAll(accountA,accountB);
     assert.equal(isApproved,true);

     await gameItems.safeTransferFrom(accountB,accountC,0,500,[]);
     let totalSupplyOfGoldC = await gameItems.balanceOf(accountC,GOLD);
     let totalSupplyOfGoldB = await gameItems.balanceOf(accountB,GOLD);
     assert.equal(totalSupplyOfGoldB.valueOf(),500,"something wrong in setApprovalForAll() function");
     assert.equal(totalSupplyOfGoldC.valueOf(),500,"something wrong in setApprovalForAll() function");
   });
});
