
import EditionBadge from "./EditionBadge";

export default function MintResponse (props) {

    console.log('Rendering response for: ', props.origin);

    //console.log('NFT Metadata: ', props.nft.metadata);
    const image = props.nft.metadata.image;
    const hex = props.nft.metadata.id.hex ? props.nft.metadata.id.hex : props.nft.metadata.id._hex
    const editionNum = parseInt(hex, 16);

    const contrato = "0xf67461cd56abBd3399bb94c42B4ec0e6376D97de";
    
    // CONTRACT! (THIRDWEB)
    const opensea_url = `https://opensea.io/assets/matic/${contrato}/${editionNum}`

    //const animation = props.nft.metadata.animation_url;

    return (
        <div className="card rounded-0 text-center no-border mint-info" id="mint_info">
          <div className="row align-items-center mx-n3 success" style={{margin: "20px"}}>
            <div className="col-4">
                <div className="profile-picture profile-picture--style-2 mx-0 mb-2 d-inline-block nft-preview">
                    <img src={`${image}`} alt="nft preview" className="mt-0"></img>
                </div>
            </div>          
            <div className="col-4">
                <EditionBadge editionNum={editionNum+1}/>
            </div>
            <div className="col-4" style={{marginTop:"14px"}}>
                <span className={`badge badge-pill badge-lg text-md strong bg-white c- text-wrap text-left z-depth-1-top btn-circle text-lowercase`}>
                <a href={`${opensea_url}`} target="_blank" rel="noreferrer" className="c-base-1"><div className="opensea"></div></a>
                </span>
                <p className="openseatext">Ver en Opensea</p>
            </div>   
          </div>
        </div>
    )

}