
import EditionBadge from "./EditionBadge";

export default function MintResponse (props) {

    console.log('Rendering response for: ', props.origin);

    //console.log('NFT Metadata: ', props.nft.metadata);
    const image = props.nft.metadata.image;
    const hex = props.nft.metadata.id.hex ? props.nft.metadata.id.hex : props.nft.metadata.id._hex
    const editionNum = parseInt(hex, 16);
    
    // CAMBIAR !!
    const opensea_url = `https://testnets.opensea.io/assets/mumbai/0x410C0Ff2413eCA65F990DD885F006E6f70f3a0D5/${editionNum}`

    //const animation = props.nft.metadata.animation_url;

    return (
        <div className="card rounded-0 text-center no-border mint-info" id="mint_info">
          <div className="row align-items-center mx-n3 success">
            <div className="col-4">
                <div className="profile-picture profile-picture--style-2 mx-0 mb-2 d-inline-block nft-preview">
                    <img src={`${image}`} alt="nft preview" className="mt-0"></img>
                </div>
            </div>          
            <div className="col-4">
                <EditionBadge editionNum={editionNum+1}/>
            </div>
            <div className="col-4" style={{marginTop:"30px"}}>
                <span className={`badge badge-pill badge-lg text-md strong bg-white c- text-wrap text-left z-depth-1-top btn-circle text-lowercase`}>
                <a href={`${opensea_url}`} target="_blank" rel="noreferrer" className="c-base-1"><div className="opensea"></div></a>
                </span>
                <p className="openseatext">Ver en Opensea</p>
            </div>   
          </div>
        </div>
    )

}