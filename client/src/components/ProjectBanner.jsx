import MainBanner from '../assets/BannerNFTNeoland2.png'

export default function ProjectBanner () {

    return (
        <section className="background-image-holder bg-base-1" data-holder-offset="">
          {/* imgur de momento..
          */}
          <div className="slice holder-item holder-item-light has-bg-cover bg-size-cover" 
          style={{backgroundImage: `url(${MainBanner})`, backgroundPosition: "center center", minHeight: "140px"}}>
            <div className="container d-flex align-items-center">
            </div>
          </div>
        </section>
    )
}