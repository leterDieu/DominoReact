import './App.css';
import {useState} from "react";
import Header from "./Header.js";
import {basic_deck} from "./gameLogic/deckcreator.mjs";
import UltimateCard from "./ultimatecard";


// const cardImages = [{"src": "./img/example-card-1.png"}, {"src": "./img/example-card-2.png"}, {"src": "./img/example-card-3.png"}, {"src": "./img/example-card-4.png"}, {"src": "./img/example-card-5.png"}, {"src": "./img/example-card-6.png"}, {"src": "./img/example-card-7.png"}, {"src": "./img/example-card-8.png"}, {"src": "./img/example-card-9.png"}, {"src": "./img/example-card-10.png"}, {"src": "./img/example-card-11.png"}, {"src": "./img/example-card-12.png"},]
const deck = basic_deck


// const GameData = {turn: 0, stage: 0, playerMana: 5, botMana: 5, playerManaPerTurn: 2, botManaPerTurn: 2};


function App() {
    const [deckedCards] = useState(deck)

    const [playerHandCards, setPlayerHandCards] = useState([])
    const [enemyHandCards, setEnemyHandCards] = useState([])

    const [playerTableCards, setPlayerTableCards] = useState([])
    const [enemyTableCards, setEnemyTableCards] = useState([])

    const [tableChoice1, setTableChoice1] = useState(null)

    const allData = {
        decks: deckedCards,
        setters: {
            player: {hand: setPlayerHandCards, table: setPlayerTableCards},
            enemy: {hand: setEnemyHandCards, table: setEnemyTableCards}
        },
        getters: {
            player: {hand: playerHandCards, table: playerTableCards},
            enemy: {hand: enemyHandCards, table: enemyTableCards}
        }
    }
    // will be used as keyed collection for Header and other

    const handleHandClick = (card) => {
        let manage_HandCards = [...playerHandCards]
        let oldTable = [...playerTableCards]

        oldTable.push(card)
        manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
        setPlayerHandCards(manage_HandCards)
        setPlayerTableCards(oldTable)
    }

    const handleHandBot = (card) => {
        let manage_HandCards = [...enemyHandCards]
        let oldTable = [...enemyTableCards]

        oldTable.push(card)
        manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
        setEnemyHandCards(manage_HandCards)
        setEnemyTableCards(oldTable)
    }

    const handleTableClickOwn = (card) => {
        setTableChoice1(card)
    }

    const handleTableClickOther = (card) => {
        if (tableChoice1 !== null) {
            console.log(tableChoice1)
            console.log(card)
            // FUNCTION
        }

            setTableChoice1(null)
        }
    }

    return (
        <div className="App">
            <Header data={allData}/>

            <div className="allCards">

                <p>Enemy's hand:</p>

                <div className="enemy-hand">
                    {
                        enemyHandCards.map(card => (<UltimateCard key={card.id} card={card} func={handleHandBot}/>
                        ))}
                </div>

                <p>Enemy's table:</p>

                <div className="enemy-table">
                    {enemyTableCards.map(card => (
                        <UltimateCard key={card.id} card={card} func={handleTableClickOther}/>))}
                </div>

                <p>Player's table:</p>

                <div className="player-table">
                    {playerTableCards.map(card => (
                        <UltimateCard key={card.id} card={card} func={handleTableClickOwn}/>))}
                </div>

                <p>Player's hand:</p>

                <div className="player-hand">
                    {playerHandCards.map(card => (<UltimateCard key={card.id} card={card} func={handleHandClick}/>))}
                </div>

            </div>

        </div>
    );
}

export default App;

