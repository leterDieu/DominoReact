import './App.css';
import {useState} from "react";
import Header from "./Header.js";
import {basic_deck} from "./gameLogic/deckcreator.mjs";
import UltimateCard from "./ultimatecard";
import {attack, randint} from "./gameLogic/gamelogic.mjs";
import {Boris} from "./gameLogic/card.mjs";


// const cardImages = [{"src": "./img/example-card-1.png"}, {"src": "./img/example-card-2.png"}, {"src": "./img/example-card-3.png"}, {"src": "./img/example-card-4.png"}, {"src": "./img/example-card-5.png"}, {"src": "./img/example-card-6.png"}, {"src": "./img/example-card-7.png"}, {"src": "./img/example-card-8.png"}, {"src": "./img/example-card-9.png"}, {"src": "./img/example-card-10.png"}, {"src": "./img/example-card-11.png"}, {"src": "./img/example-card-12.png"},]
const deck = basic_deck


const gameData = {turn: 0, stage: 0, playerMana: 12321321, botMana: 213123231, playerManaPerTurn: 2, botManaPerTurn: 2, hasTakenCard: false};
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
    const [turnConst, setTurnConst] = useState(gameData.turn)

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
        if (gameData.playerMana < card.cst) {
            alert("You have not enough mana to get this card on table")
            return
        }
        let manage_HandCards = [...playerHandCards]
        let oldTable = [...playerTableCards]

        oldTable.push(card)
        manage_HandCards.splice(manage_HandCards.indexOf(card), 1)
        setPlayerHandCards(manage_HandCards)
        setPlayerTableCards(oldTable)
        gameData.playerMana -= card.cst
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

            attack(tableChoice1, card, allData.getters.player.table, allData.getters.enemy.table, allData.setters.enemy.table)
        }
    }

    const Mana = (props) => {
        const mana = props.mana
        return (
            <p>mana: {mana}</p>
        )
    }

    const Field = (props) => {
        const name = props.name
        const func = props.func
        const container = props.container

        return (
            <div>
                <p>{name}:</p>
                <div className={"stdBlock"}>
                    {container.map(card => (
                        <UltimateCard key={card.id} card={card} func={func}/>))}
                </div>
            </div>
        )
    }

    return (<div className="App">

        <div>
            <Header data={allData} stage={stage} setStage={setStage} turn={turnConst} setTurn={setTurnConst} hasTakenCard={gameData.hasTakenCard}/>

            <Mana mana={gameData.playerMana}/>
        </div>
        <div className="allCards">
            <div>
                <Field name={"Enemy's hand"} func={handleHandBot} container={enemyHandCards}/>
            </div>

            <div>
                <Field name={"Enemy's table"} func={handleTableClickOther} container={enemyTableCards}/>
            </div>

            <div>
                <Field name={"Player's table"} func={handleTableClickOwn} container={playerTableCards}/>
            </div>

            <div>
                <Field name={"Player's hand"} func={handleHandClick} container={playerHandCards}/>
            </div>
        </div>

    </div>);
}

export default App;