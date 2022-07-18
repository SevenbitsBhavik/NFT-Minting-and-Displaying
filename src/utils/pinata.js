require('dotenv').config();
const key = "e303f9a3384b97d52011";
const secret = "a3987c39f4c6b5f8f1128ece05455f5ccecb1de11902f80399c160c058936269";

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody,tokenid) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                "pinata_api_key": key,
                "pinata_secret_api_key": secret,
                // "Content-Type": "multipart/form-data"
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash 
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};