import {BiBoltCircle} from "react-icons/bi";

export default function Footer () {
    return (
        <div>
            <div className="card-footer  py-1">
              <a href="/anondegenz/report/" className="btn text-muted btn-outline btn-block"><BiBoltCircle size={25}/> Powered by JetzMint</a>
            </div>
        </div>
    )
}