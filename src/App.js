import './App.css';
// import Content from './Content'
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

const manage_playerHandCards = []
const manage_enemyHandCards = []


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
        // setTurns(0)
    }

    const drawCards = () => {
        const randomCard_1 = Math.floor(Math.random() * cards.length)
        manage_playerHandCards.push(cards[randomCard_1])

        const randomCard_2 = Math.floor(Math.random() * cards.length)
        manage_enemyHandCards.push(cards[randomCard_2])

        setPlayerHandCards(manage_playerHandCards)
        setEnemyHandCards(manage_enemyHandCards)
    }

    console.log(cards, playerHandCards, enemyHandCards, manage_playerHandCards, manage_enemyHandCards)

    return (
        <div className="App">

            <button onClick={shuffleCards}>Reset</button>

            <button onClick={drawCards}>Draw Cards</button>

            <div className="enemyCardsHand">
                {cards.map(card => (
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

            {/*<div className="playerCardsHand">*/}

            {/*</div>*/}


            {/*<Content/>*/}

        </div>
    );
}

export default App;

