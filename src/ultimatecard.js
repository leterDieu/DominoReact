import {useLayoutEffect, useRef} from "react";
import {sleep} from "./gameLogic/gamelogic.mjs";
import gsap from "gsap";

export default function UltimateCard(props) {
    const recieved_func = props.func
    const card = props.card
    const cardaRef = useRef(null);
    const handleClick = () => {
        recieved_func(card)

    }

    return (<div className="card">
        <div>
            <img className="front"
                 src={require(`${card.src}`)}
                 alt="card front"
                 onClick={handleClick}
            />
            <img className="back"
                src={require("./img/card-cover.png")}
                alt="card back"
            />
        </div>
    </div>)
}