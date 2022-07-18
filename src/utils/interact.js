require('dotenv').config();
const alchemyKey = "https://eth-rinkeby.alchemyapi.io/v2/6iN3IyW3j0Ltdm_BW5vmMt9xptTc9i-8";
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
// import {Network , } from "../alchemy-nft-api/alchemy-sdk-script.js";
const PRIVATE_KEY = "d4c2bb1c239de7b359e4246f1cc8a728141a6f22af31a25937f24752d2256add";

const contractAddress = "0xdbcf433d494c47f73383d8905e0e9febfcd91422";
const contractABI = require('../contract-abi.json');


export const mintNFT = async (tokenURI) => {
//  error handling 
  console.log(tokenURI);
//   web3.get
  const nftContract = new web3.eth.Contract(contractABI, contractAddress);//loadContract();
  console.log(nftContract)
  console.log(window.ethereum.selectedAddress)
//   console.log(await nftContract.methods.mintNFT(0x6343d7675ef45d12ed09e66ec45cd12bc5f6423d, tokenURI));
  //set up your Ethereum transaction

  const transactionParameters = {
      'to': contractAddress, // Required except during contract publications.
      'from': window.ethereum.selectedAddress, // must match user's active address.
      'data':  nftContract.methods.claimItem(tokenURI).encodeABI() //make call to NFT smart contract 
    };
    // console.log(tokenURI);
    // console.log(transactionParameters);
    // sign transaction via Metamask
      try {
          const txHash = await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters],
              });
          return {
              success: true,
              status: "✅ Check out your transaction on Etherscan: https://kovan.etherscan.io/tx/" + txHash
          }
      } catch (error) {
          return {
              success: false,
              status: "😥 Something went wrong: " + error.message
          }
      }
    }



    // ---------------------------------------------------
    // console.log(web3);
    // const signPromise = await web3.eth.accounts.signTransaction(transactionParameters, PRIVATE_KEY);
    // console.log(signPromise);
    // const transaction_rec = await web3.eth.sendSignedTransaction(signPromise.rawTransaction)
    // console.log(transaction_rec);
    // if(transaction_rec){
    //     console.log(transaction_rec);
    //     return true;
    // }
    // else{
    //     return false;
    // }
// }