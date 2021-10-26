# I./ erc1155 install development environment
  #1. Cài đặt node
    $ node -v 
    $ brew install node
  #2.Cài đặt truffle framework : allows us to create decentralized applications on Ethereum network
    $ npm install -g truffle 
  #3. Download Ganache : is a local and memory blockchain used for development purposes 
  #4. MetaMask Extension for google chrome
  #5. Package Control : Ethereum ( sublime text)
# II./ Initialize solidity project
  #1.Create a ethereum folder
  $ truffle unbox pet-shop
  hoặc 
  $truffle init

  #2.deploy in the first run
  $truffle migrate

  #deploy when code was changed
  $truffle migrate --reset

  #3. run all test
  $truffle test

  # run specific test file
  $truffle test ./test/file_name.js

