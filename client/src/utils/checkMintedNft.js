
// Función que envía dirección wallet a backend para guardar en bbdd

export default async function checkMintedNft (tx) {
    //console.log('checking mint status: ', tx);
    // only if mm is connected
    if (tx && tx.length > 1) {

      console.log('Sending tx to backend: ', tx)

      fetch("https://localhost:4000/mintstatus", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ tx: tx })
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
          console.log('Mint check response: ',responseJson);
          return responseJson.nft;
          //setUserstate({...userstate, alreadyMinted: true, mintTx: responseJson.mintArray[0], tokenId: responseJson.mintArray[1]});
      })
      .catch(error => {
          console.log('Mint error :(', error);
          /*
          setUserstate({
            alreadyMinted: false,
            error: "Failed to mint"
          })
          */
      });
    } else {
      console.log('Cant MintCheck request. Incorrect MM status, already minted, or eth address length < 1');
    }
};
