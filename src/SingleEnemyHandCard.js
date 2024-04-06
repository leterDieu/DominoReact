export default function SingleEnemyHandCard({ card, handleHandBot }) {

    const handleClick = () => {
        handleHandBot(card)
    }

    return (
        <div className="card">
            <div>
                <img className="front"
                     src={require(`${card.src}`)}
                     alt="card front"
                     onClick={handleClick}
                />
                <img
                    className="back"
                    src={require("./img/card-cover.png")}
                    alt="card back"
                />
            </div>
        </div>
    )
}