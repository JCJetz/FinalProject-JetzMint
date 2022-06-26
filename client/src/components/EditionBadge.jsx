export default function EditionBadge (props) {

    const num = props.editionNum < 10 ? `0${props.editionNum}` : props.editionNum
    return (
        <div className="rotating_badge">
            <svg viewBox="0 0 300 300" width="100" heigh="100">
                <defs>
                     <path id="criclePath" d=" M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0 "/>
                </defs>

                <g className="circleText ">
                    <use xlinkHref="#criclePath" fill="none"/>
                    <text fill="#000" fontFamily="Verdana" fontSize="31">
                            <textPath xlinkHref="#criclePath" >{`${num} of 100 · ${num} of 100 · ${num} of 100 · ${num} of 100 ·`}</textPath>
                    </text>
                </g>
                <g>
                    <text x="100" y="175" fontFamily="Verdana" fontSize="80">
                        {num}
                    </text>
                </g>
            </svg>
        </div>
    )
}