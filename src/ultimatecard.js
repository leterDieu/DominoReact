import './App.css'
export default function UltimateCard(props) {
    const recieved_func = props.func
    const card = props.card

    const handleClick = () => {
        recieved_func(card)
    }

    return (

        <div>
        <div>
            <img className="card"
                 src={require(`${card.src}`)}
                 alt="card front"
                 onClick={handleClick}
            />


            <div className="hp_num">{card.hp}</div>
            <div className="atk_num">{card.atk}</div>
        </div>
    </div>)
}