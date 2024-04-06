import './App.css';
import {useState} from "react";


const cardImages = [
    {"src": "./img/example-card-1.png"},
    {"src": "./img/example-card-2.png"},
    {"src": "./img/example-card-3.png"},
    {"src": "./img/example-card-4.png"},
    {"src": "./img/example-card-5.png"},
    {"src": "./img/example-card-6.png"},
    {"src": "./img/example-card-7.png"},
    {"src": "./img/example-card-8.png"},
    {"src": "./img/example-card-9.png"},
    {"src": "./img/example-card-10.png"},
    {"src": "./img/example-card-11.png"},
    {"src": "./img/example-card-12.png"},
]

let manage_playerHandCards = [] // rebuild on table-class
let manage_enemyHandCards = [] // rebuild on table-class


function App() {
    const [cards, setCards] = useState([])
    const [playerHandCards, setPlayerHandCards] = useState([])
    const [enemyHandCards, setEnemyHandCards] = useState([])
    // const [turns, setTurns] = useState(0)

    // shuffle cards + id and reset turns
    const shuffleCards = () => {
        const shuffledCards = [...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random()}))

        setCards(shuffledCards)
        setPlayerHandCards([])
        setEnemyHandCards([])
        manage_playerHandCards = []
        manage_enemyHandCards = []
        // setTurns(0)
    }

    const drawPlayerCards = () => { // ограничение на ману и количество карт
        let manage_cards = [...cards]

        const randomCard = Math.floor(Math.random() * manage_cards.length)
        manage_playerHandCards.push(cards[randomCard])
        manage_cards.splice(randomCard, 1)

        setPlayerHandCards(manage_playerHandCards)
        setCards(manage_cards)
    }

    const drawEnemyCards = () => {
        let manage_cards = [...cards]

        const randomCard = Math.floor(Math.random() * manage_cards.length)
        manage_enemyHandCards.push(cards[randomCard])
        manage_cards.splice(randomCard, 1)

        setEnemyHandCards(manage_enemyHandCards)
        setCards(manage_cards)
    }


    return (
        <div className="App">

            <button onClick={shuffleCards}>Reset</button>

            <button onClick={drawPlayerCards}>Draw Player Cards</button>

            <button onClick={drawEnemyCards}>Draw Enemy Cards</button> {/*proof of concept*/}

            <div className="allCards">

                <p>Enemy's hand</p>

                <div className="hand">
                    {enemyHandCards.map(card => (
                        <div className="card" key={card.id}>
                            <div>
                                <img className="front" src={require(`${card.src}`)} alt="card front"/>
                                <img className="back" src={require("./img/card-cover.png")} alt="card back"/>
                            </div>
                        </div>
                    ))}
                </div>

                {/*<div className="enemyCardsGrid">*/}

                {/*</div>*/}


                {/*<div className="deck">*/}

                {/*</div>*/}


                {/*<div className="playerCardsGrid">*/}

                {/*</div>*/}

                <p>Player's hand:</p>

                <div className="hand">
                    {playerHandCards.map(card => (
                        <div className="card" key={card.id}>
                            <div>
                                <img className="front" src={require(`${card.src}`)} alt="card front"/>
                                <img className="back" src={require("./img/card-cover.png")} alt="card back"/>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default App;

