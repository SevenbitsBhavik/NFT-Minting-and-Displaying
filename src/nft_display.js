import React from 'react';
import {  useState } from "react";
import { Network, initializeAlchemy, getNftMetadata, getNftsForOwner, getNftsForCollection } from "@alch/alchemy-sdk";
import { Description } from '@ethersproject/properties';
import fetch from 'node-fetch';
import { Outlet } from 'react-router-dom';
const alchemyKey = "https://eth-rinkeby.alchemyapi.io/v2/6iN3IyW3j0Ltdm_BW5vmMt9xptTc9i-8";
const baseURL = `https://eth-rinkeby.alchemyapi.io/v2/6iN3IyW3j0Ltdm_BW5vmMt9xptTc9i-8/getContractMetadata`;
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractAddress = "0xdbcf433d494c47f73383d8905e0e9febfcd91422";
const contractABI = require('./contract-abi.json');
const fetchURL = `${baseURL}?contractAddress=${contractAddress}`
// const web3 = createAlchemyWeb3(alchemyKey);
const settings = {
  apiKey: "6iN3IyW3j0Ltdm_BW5vmMt9xptTc9i-8", // Replace with your Alchemy API Key.
  network: Network.ETH_RINKEBY, // Replace with your network.
  maxRetries: 10,
};
const alchemy = initializeAlchemy(settings);
const ipfsGatewayTools = require("@pinata/ipfs-gateway-tools/dist/node");
const gatewayTools = new ipfsGatewayTools();
// function showDiv() {
// 	document.getElementById('image').style.display = "block";
//  }
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};



export default function Nft_display() {
	
	const [Details,setDetails] = useState({Name:"",Description:"",Img:""})
	const [Tokenid,setTokenid] = useState()
	// const nftContract = new web3.eth.Contract(contractABI, contractAddress);
	const [output,setOutput] = useState()
	const [output1,setOutput1] = useState()
	const [output2,setOutput2] = useState()
	const name_array=[];
	const img_array=[];
	const description=[];
	// const Tokenid = nftContract.methods.totalSupply()
	// setTokenid(nftContract.methods.totalSupply())
	const onPressed = async() =>{
		// const abc="true";
		const nftsForOwner = await getNftsForOwner(alchemy, "0x6343D7675ef45d12ED09e66ec45CD12BC5f6423d");
		console.log(nftsForOwner.ownedNfts);
		const array = nftsForOwner.ownedNfts
		const length = nftsForOwner.ownedNfts.length;
  		// setOutput(ade);
		for(let i=0;i<length;i++){
			img_array.push(nftsForOwner.ownedNfts[i].rawMetadata.image);
			name_array.push(nftsForOwner.ownedNfts[i].title);
			description.push(nftsForOwner.ownedNfts[i].description);
			console.log(name_array);
			console.log(img_array);
			console.log(nftsForOwner.ownedNfts[i].title);
		}
		const nameList = name_array.map((item)=>
			<td><h2>{item}</h2></td>
		);
		// const result = [img_array,name_array]
		setOutput1(nameList)
		const imgList = img_array.map((image) =>
		<td><img height="250" width="320" style={{marginRight:"20px",marginTop:"100px"}} src = {image}  title="NFT"/></td>
		)
		console.log(imgList);
		setOutput(imgList)

		const descriptionList = description.map((item)=>
			<td><h4>{item}</h4></td>
		)
		setOutput2(descriptionList)			
		
	} 

	return (
		<div>

			<h1>NFTs</h1>
			{/* <input className='tokenid' type="text" placeholder="Enter Token Id" size="20px"  */}
				{/* // onChange={(event) => setTokenid(event.target.value)}/> */}
			<br></br>
			<button class='submit'onClick={() => { onPressed();}} id="btnID" >Press Here</button>
			{/* <img  id="image" height="200" width="300" src={Details.Img} style={{display:"none" , marginLeft: "42%", marginTop:"20px" }} /> */}
			{/* <p>{Details.Name}</p> */}
			{/* <p>{Details.Description}</p> */}
			{/* <p>{output} </p> */}
			{/* <ul>{output1}</ul> */}
			{/* {output.map(home => <div>{home.description}</div>)} */}
			<table style={{display:"block",overflow:"auto"}} >
				<tr colSpan="2">{output}<br></br></tr>
				<tr colSpan="2">{output1}<br></br></tr>
				<tr colSpan="2">{output2}</tr>
			</table>
		</div>
	)
}




// const count =  nftsForOwner['nfts'];
		// for(let i=1;i<=2;i++){
		// 	const response = await getNftMetadata(
		// 		alchemy,
		// 		"0xdbcf433d494c47f73383d8905e0e9febfcd91422",
		// 		i
		// 	  );	
		// 	// var output = response;
		// 	// console.log("NFT name: ", response.title);
		// 	// console.log("token type: ", response.tokenType);
		// 	// // console.log("tokenUri: ", response.tokenUri.gateway);
		// 	// console.log("image url: ", response.rawMetadata.image);
		// 	// // const nftContract = new web3.eth.Contract(contractABI, contractAddress);

		// 	const Name = response.title;
		// 	const Description = response.description;
		// 	const Img = response.rawMetadata.image;
		// 	// console.log("Name:"+Details.Name);
		// 	// console.log(name_array);
		// 	name_array.push(Name);
		// 	//console.log(response.description);
		// 	// description_array.push(Description);
		// 	// img_urls.push(Img);
		// 	// console.log(name_array);
		// 	 setDetails({Name, Description,Img});
			
		// 	// console.log(description_array);
		// 	// console.log(img_urls);

		// 	// document.getElementById('image').style.display = "block";
		// 	// const listName = name_array.map((item)=>
		// 	// <li>{item}</li>
		// 	// // return(listName)
		// 	// )
		// }
	
            // document.getElementById('btnID').style.display = "none";
			
		// }