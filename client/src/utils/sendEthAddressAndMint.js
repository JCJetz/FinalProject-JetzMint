
// Función que envía dirección wallet a backend para guardar en bbdd

export default async function sendEthAddressAndMint (mintaddress,setUserstate,userstate,setMintData,setIsMinting) {
    console.log('send address function with mintaddress: ', mintaddress);
    // only if mm is connected
    if (mintaddress.length > 1) {

      console.log('Sending mint address to backend/mongo')

      fetch("/auth/mintNFT", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ address: mintaddress })
      })
      .then(response => {
          if (response.status === 200) {
            console.log('Success from backend')
            return response.json();
          }
          console.log('error');
          throw new Error("failed to update user");
      })
      .then(responseJson => {
          console.log('Mint response: ',responseJson);
          setMintData({nft: responseJson.mintArray[2]});
          setUserstate({...userstate, alreadyMinted: true, mintTx: responseJson.mintArray[0], tokenId: responseJson.mintArray[1], nftData: responseJson.mintArray[2]});
          setIsMinting(false);
          return responseJson.mintArray[0];
      })
      .catch(error => {
          console.log('Mint error :(');
          setIsMinting(false);
          /*
          setUserstate({
            alreadyMinted: false,
            error: "Failed to mint"
          })
          */
      });
    } else {
      console.log('Cant send request. Incorrect MM status, already minted, or eth address length < 1');
    }
};
