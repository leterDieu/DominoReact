import './App.css'
export default function UltimateCard(props) {
    const recieved_func = props.func
    const card = props.card
    const secret = props.secret
    // if (secret) {
    //     const cardSource = "./img/card_back.png"
    // } else {
    let cardSource = card.src
    let cardHp = card.hp
    let cardAtk = card.atk
    if (secret) {
        cardSource = "./img/card-cover.png"
        cardHp = ""
        cardAtk = ""
    }


    const handleClick = () => {
        recieved_func(card)
    }

    return (
        <div className="card">
            <img className="cardBlock" src={require(`${cardSource}`)} alt="card front" onClick={handleClick}/>
            <div className="hp_num">{cardHp}</div>
            <div className="atk_num">{cardAtk}</div>
        </div>)
}