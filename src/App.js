import './App.css';
import {useState} from "react";
import SinglePlayerHandCard from "./SinglePlayerHandCard";
import SinglePlayerTableCard from "./SinglePlayerTableCard";
import SingleEnemyTableCard from "./SingleEnemyTableCard";
import SingleEnemyHandCard from "./SingleEnemyHandCard";
import {tab} from "@testing-library/user-event/dist/tab";


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

let manage_playerHandCards = []
let manage_enemyHandCards = []
let manage_playerTableCards = []
let manage_enemyTableCards = []


function App() {
    const [cards, setCards] = useState([])
    const [playerHandCards, setPlayerHandCards] = useState([])
    const [enemyHandCards, setEnemyHandCards] = useState([])
    // const [turns, setTurns] = useState(0)
    const [playerTableCards, setPlayerTableCards] = useState([])
    const [enemyTableCards, setEnemyTableCards] = useState([])

    const [tableChoice1, setTableChoice1] = useState(null)
    const [tableChoice2, setTableChoice2] = useState(null)


    // shuffle cards + id and reset turns
    const shuffleCards = () => {
        const shuffledCards = [...cardImages]
            .sort(() => Math.random() - 0.5)

        setCards(shuffledCards)
        setPlayerHandCards([])
        setEnemyHandCards([])
        manage_playerHandCards = []
        manage_enemyHandCards = []
        // setTurns(0)
    }

    const drawPlayerCards = () => {
        let manage_cards = [...cards]

        const randomCard = Math.floor(Math.random() * manage_cards.length)
        manage_playerHandCards.push(cards[randomCard])
        manage_playerHandCards.map((card) => ({ ...card, id: Math.random()}))
        // manage_cards.splice(randomCard, 1)

        setPlayerHandCards(manage_playerHandCards)
        setCards(manage_cards)
    }

    const drawEnemyCards = () => {
        let manage_cards = [...cards]

        const randomCard = Math.floor(Math.random() * manage_cards.length)
        manage_enemyHandCards.push(cards[randomCard])
        manage_enemyHandCards.map((card) => ({ ...card, id: Math.random()}))
        // manage_cards.splice(randomCard, 1)

        setEnemyHandCards(manage_enemyHandCards)
        setCards(manage_cards)
    }

    const handleHandClick = (card) => {
        let manage_HandCards = [...playerHandCards]

        manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
        manage_playerTableCards.push(card)
        manage_playerHandCards.splice(manage_HandCards.indexOf(card), 1)

        setPlayerHandCards(manage_HandCards)
        setPlayerTableCards(manage_playerTableCards)
    }

    const handleHandBot = (card) => {
        let manage_HandCards = [...enemyHandCards]

        manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
        manage_enemyTableCards.push(card)
        manage_enemyHandCards.splice(manage_HandCards.indexOf(card), 1)

        setEnemyHandCards(manage_HandCards)
        setEnemyTableCards(manage_enemyTableCards)
    }

    const handleTableClickOwn = (card) => {
        setTableChoice1(card)
    }

    const handleTableClickOther = (card) => {
        tableChoice1 ? setTableChoice2(card) : setTableChoice1(null)

        console.log(tableChoice1)
        console.log(tableChoice2)
        // FUNCTION

    }

    return (
        <div className="App">

            <button onClick={shuffleCards}>Reset</button>

            <button onClick={drawPlayerCards}>Draw Player Cards</button>

            <button onClick={drawEnemyCards}>Draw Enemy Cards</button> {/*proof of concept*/}

            <div className="allCards">

                <p>Enemy's hand</p>

                <div className="enemy-hand">
                    {enemyHandCards.map(card => (
                        <SingleEnemyHandCard
                        key={card.id}
                        card={card}
                        handleHandBot={handleHandBot}
                        />
                    ))}
                </div>

                <div className="enemy-table">
                    {enemyTableCards.map(card => (
                        <SingleEnemyTableCard
                        key={card.id}
                        card={card}
                        handleTableClick2={handleTableClickOther}
                        />
                    ))}
                </div>

                <p>Player's table:</p>

                <div className="player-table">
                    {playerTableCards.map(card => (
                        <SinglePlayerTableCard
                        key={card.id}
                        card={card}
                        handleTableClick1={handleTableClickOwn}
                        />
                    ))}
                </div>

                <p>Player's hand:</p>

                <div className="player-hand">
                    {playerHandCards.map(card => (
                        <SinglePlayerHandCard
                            key={card.id}
                            card={card}
                            handleHandClick={handleHandClick}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
}

export default App;

