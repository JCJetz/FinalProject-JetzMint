import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import * as fs from 'fs';
import path from 'path';


export default async function mintToAddress (slackid,toAddress) {

    const privateKey = process.env.PKEY;
    const edition = process.env.CONTRACT;

    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "polygon");
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
        name: `NBPOA #${nextnftnum}`,
        description: `Neoland's Bootcamp Proof Of Attendance #${nextnftnum}. This NFT validates the Slack ID (${slackid}) as having attended to Neoland's Bootcamp. It is non-transferable, and therefor 'soulbounded' to the minter's wallet address.`,
        animation_url: fs.readFileSync(path.resolve(__dirname,"../assets/nft_neoland.mp4")), 
        image: fs.readFileSync(path.resolve(__dirname,"../assets/nft_neoland.gif")), 
        "attributes": [{"value": nextnumstr, "trait_type": "edition"},
                       {"value": slackid, "trait_type": "slackid"}]
    }

    /* Para 1155 */
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

