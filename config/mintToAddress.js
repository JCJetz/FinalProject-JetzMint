import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import * as fs from 'fs';
import path from 'path';


export default async function mintToAddress (slackid,toAddress) {

    const privateKey = process.env.PKEY;
    const edition = process.env.CONTRACT;

    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "mumbai");
    const contract = sdk.getEdition(edition);
    const nfts = await contract.getAll();
    let nextnftnum = nfts.length+1;
    console.log('Next NFT:', nextnftnum);
    console.log('SlackId:', slackid);
    console.log('Address toMint:', toAddress);
    let nextnumstr = `${nextnftnum} of 100`;

    //const __dirname = dirname(fileURLToPath(import.meta.url));
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    const metadata = {
        name: `NBPOA #${nfts.length+1}`,
        description: "This NFT associates its owner's wallet with a Slack ID, which in turn validates attendance to Neoland's Bootcamp.It is non-transferable, and was made as the bootcamp's final project by JCJetz, with help from x and y.",
        animation_url: fs.readFileSync(path.resolve(__dirname,"../assets/nft_neoland.mp4")), 
        image: fs.readFileSync(path.resolve(__dirname,"../assets/nft_neoland.gif")), 
        "attributes": [
            {
                "value": nextnumstr,
                "trait_type": "edition"
              },
              {
                "value": slackid,
                "trait_type": "slackid"
              }]
    }

    const metadataWithSupply = {
        metadata,
        supply: 1, // The number of this NFT you want to mint
    };

    console.log('Matadata completo: ', metadataWithSupply);
    
    const tx = await contract.mintTo(toAddress, metadataWithSupply);
    const receipt = tx.receipt; // the transaction receipt
    console.log('Tx transacción: ', receipt);
    const tokenId = tx.id; // the id of the NFT minted
    
    const nft = await tx.data();
    console.log('Minteado? ', nft);

    // tx.receipt y tx.id
    return [tx,tokenId,nft];
}

