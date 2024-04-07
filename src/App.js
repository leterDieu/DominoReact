import './App.css';
import {useState} from "react";
import Header from "./Header.js";
import {basic_deck} from "./gameLogic/deckcreator.mjs";
import UltimateCard from "./ultimatecard";
import {attack} from "./gameLogic/gamelogic.mjs";


// const cardImages = [{"src": "./img/example-card-1.png"}, {"src": "./img/example-card-2.png"}, {"src": "./img/example-card-3.png"}, {"src": "./img/example-card-4.png"}, {"src": "./img/example-card-5.png"}, {"src": "./img/example-card-6.png"}, {"src": "./img/example-card-7.png"}, {"src": "./img/example-card-8.png"}, {"src": "./img/example-card-9.png"}, {"src": "./img/example-card-10.png"}, {"src": "./img/example-card-11.png"}, {"src": "./img/example-card-12.png"},]
const deck = basic_deck


const gameData = {turn: 0, stage: 0, playerMana: 5, botMana: 5, playerManaPerTurn: 2, botManaPerTurn: 2};
// stages:
// -1 - debug,
// 0 - mana increase, cards drawing
// 1 - player cards picking
// 2 - bot cards picking
// 3 - spells
// 4 - player attacks
// 5 - bot attacks

function App() {
    const [deckedCards] = useState(deck)

    const [playerHandCards, setPlayerHandCards] = useState([])
    const [enemyHandCards, setEnemyHandCards] = useState([])

    const [playerTableCards, setPlayerTableCards] = useState([])
    const [enemyTableCards, setEnemyTableCards] = useState([])

    const [tableChoice1, setTableChoice1] = useState(null)

    const [stage, setStage] = useState(gameData.stage)

    const allData = {
        decks: deckedCards, setters: {
            player: {hand: setPlayerHandCards, table: setPlayerTableCards},
            enemy: {hand: setEnemyHandCards, table: setEnemyTableCards}
        }, getters: {
            player: {hand: playerHandCards, table: playerTableCards},
            enemy: {hand: enemyHandCards, table: enemyTableCards}
        }
    }
    // will be used as keyed collection for Header and other


    const handleHandClick = (card) => {
        if (gameData.stage === 1 || gameData.stage === -1) {
            let manage_HandCards = [...playerHandCards]
            let oldTable = [...playerTableCards]

            oldTable.push(card)
            manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
            setPlayerHandCards(manage_HandCards)
            setPlayerTableCards(oldTable)
        }
    }

    const handleHandBot = (card) => {
        if (gameData.stage === 2 || gameData.stage === -1) {
            let manage_HandCards = [...enemyHandCards]
            let oldTable = [...enemyTableCards]

            oldTable.push(card)
            manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
            setEnemyHandCards(manage_HandCards)
            setEnemyTableCards(oldTable)
        }
    }

    const handleTableClickOwn = (card) => {
        if (gameData.stage === 4 || gameData.stage === -1) {
            setTableChoice1(card)
        }
    }

    const handleTableClickOther = (card) => {
        if (gameData.stage === 4 || gameData.stage === -1) {
            if (tableChoice1 !== null) {
                console.log(tableChoice1)
                console.log(card)

                attack(tableChoice1, card, allData.getters.player.table, allData.getters.enemy.table)
            }
        }
    }

    const plusStage = () => {
        if (gameData.stage === 0) {
            // draw cards
            gameData.stage++
        }
        else if (gameData.stage === 1) {
            //bot cards picking
            gameData.stage++
        } else if (gameData.stage === 2) {
            //spells
            gameData.stage++
        } else if (gameData.stage === 4) {
            //bot attack
            gameData.stage++
        } else if (gameData.stage === 5) {
            gameData.playerMana += gameData.playerManaPerTurn
            gameData.botMana += gameData.botManaPerTurn
            gameData.stage = 0
            gameData.turn++
        } else {
            gameData.stage++
        }
        setStage(gameData.stage)
    }

    const debugStage = () => {
        gameData.stage = -1
        setStage(gameData.stage)
    }
    

    return (<div className="App">
        <button onClick={plusStage}>stage++</button>
        <button onClick={debugStage}>debug stage</button>
        <p>{stage}</p>

        <Header data={allData} stage={gameData.stage}/>

        <div className="allCards">

            <p>Enemy's hand:</p>

            <div className="enemy-hand">
                {enemyHandCards.map(card => (
                    <UltimateCard key={card.id} card={card} func={handleHandBot}/>))}
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

    </div>);
}

export default App;