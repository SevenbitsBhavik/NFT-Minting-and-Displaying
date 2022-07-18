import {  useState } from "react";
import {ethers} from 'ethers';
import { mintNFT } from "../src/utils/interact.js";
import { Outlet, Link } from "react-router-dom";
import { Network, initializeAlchemy, getNftMetadata } from "@alch/alchemy-sdk";
const {pinJSONToIPFS} = require('../src/utils/pinata');
const settings = {
  apiKey: "6iN3IyW3j0Ltdm_BW5vmMt9xptTc9i-8", // Replace with your Alchemy API Key.
  network: Network.ETH_RINKEBY, // Replace with your network.
  maxRetries: 10,
};
const alchemy = initializeAlchemy(settings);


// import fetch from 'node-fetch';


const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  // useEffect(async () => { //TODO: implement
    
  // }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const jsonProvider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await jsonProvider.send("eth_requestAccounts", []);
    const selectedAddress = accounts[0];
    const balance = await jsonProvider.getBalance(accounts[0]);
    const balanceinEther = ethers.utils.formatEther(balance);
    setWallet(selectedAddress);
  };

  

  const onMintPressed = async () => { //TODO: implement

    if (url.trim() === "" || (name.trim() === "" || description.trim() == "")) { 
      return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
      }
    }
    // var image = await pinJSONToIPFS(url,12);
    // url.saveIPFS();
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    console.log(metadata.image);
    // var abc = JSON.stringify(metadata);
    // console.log(abc);
    //make pinata call
    const pinataResponse = await pinJSONToIPFS(metadata,13); 
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;
    // const tokenURI = "https://ipfs.io/ipfs/QmXxYG3atdQ1kcjNmLM7movmJcVg2c7YfjMha8ozraK16e/2.json";
    const {status} = await mintNFT(tokenURI);
    setStatus(status);
  };

  return (
    <div className="Minter">
            <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="Add a URL"
          onChange={(event) => setURL(event.target.value)}
          
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          // placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          // placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>

      
      <a href = "/a"><button id="viewButton" >
        View NFT
      </button></a>
      
      <p id="status">
        {status}
      </p>
      
    </div>
  );
};

export default Minter;
