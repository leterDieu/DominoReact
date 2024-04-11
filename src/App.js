import './App.css';
import {useState} from "react";
import Header from "./Header.js";
import {basic_deck} from "./gameLogic/deckcreator.mjs";
import UltimateCard from "./ultimatecard";
import {attack, basicSpells, randint} from "./gameLogic/gamelogic.mjs";
import {Boris} from "./gameLogic/card.mjs";


// const cardImages = [{"src": "./img/example-card-1.png"}, {"src": "./img/example-card-2.png"}, {"src": "./img/example-card-3.png"}, {"src": "./img/example-card-4.png"}, {"src": "./img/example-card-5.png"}, {"src": "./img/example-card-6.png"}, {"src": "./img/example-card-7.png"}, {"src": "./img/example-card-8.png"}, {"src": "./img/example-card-9.png"}, {"src": "./img/example-card-10.png"}, {"src": "./img/example-card-11.png"}, {"src": "./img/example-card-12.png"},]
const deck = basic_deck


const gameData = {
    turn: 0,
    stage: 0,
    playerMana: 12321321,
    botMana: 213123231,
    playerManaPerTurn: 2,
    botManaPerTurn: 2,
    hasTakenCard: false,
    playerHp: 10,
    botHp: 10
};

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
        if (gameData.stage === 1) {
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
    }

    const handleTableClickOwn = (card) => {
        if (gameData.stage === 4) {
            setTableChoice1(card)
        }
    }

    const handleTableClickOther = (card) => {
        if (tableChoice1 !== null) {
            console.log(tableChoice1)
            console.log(card)

            attack(tableChoice1, card, allData.getters.player.table, allData.getters.enemy.table, allData.setters.enemy.table)
        }
    }

    const botAttack = () => {
        let rng_card = enemyTableCards[randint(enemyTableCards.length)]
        attack(tableChoice1, rng_card, allData.getters.enemy.table, allData.getters.player.table, allData.setters.player.table)
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
            <div className="cardContainer">
                <p>{name}:</p>
                <div className={"stdBlock"}>
                    {container.map(card => (
                        <UltimateCard key={card.id} card={card} func={func}/>))}
                </div>
            </div>
        )
    }

    const drawCards = (handGetter, handSetter) => { // ограничение на ману и количество карт
        let copied_hand = [...handGetter]

        if (copied_hand.length === 8) {
            return
        }

        let newCard = new deck[randint(deck.length)]()
        copied_hand.push(newCard)
        handSetter(copied_hand)
    }

    const botPick = () => {
        let manage_HandCards = [...enemyHandCards]
        let manage_TableCards = [...enemyTableCards]

        let card_index = randint(manage_HandCards.length)

        manage_TableCards.push(manage_HandCards[card_index])
        manage_HandCards.splice(card_index)
        setEnemyHandCards(manage_HandCards)
        setEnemyTableCards(manage_TableCards)
    }

    const manaIncrease = () => {
        gameData.playerMana += gameData.playerManaPerTurn
        gameData.botMana += gameData.botManaPerTurn
    }

    const applySpells = () => {
        //
    }

    // stages:
    // -1 - debug,
    // 0 - mana increase, cards drawing - stdMana++ ; drawCards => sys
    // 1 - player cards picking => ready button
    // 2 - bot cards picking => sys
    // 3 - spells => sys
    // 4 - player attacks => ready button
    // 5 - bot attacks => sys


    const stagePlus = () => {
        // this block is separate of easier readability
        if (gameData.stage === 5) {
            gameData.stage = 0
        } else {
            gameData.stage++
        }

        setStage(gameData.stage)

        if (gameData.stage === 0) {
            manaIncrease()
            drawCards(playerHandCards, setPlayerHandCards)
            drawCards(enemyHandCards, setEnemyHandCards)
            stagePlus()
        } else if (gameData.stage === 1) {
            // implemented
            // attention! no stagePlus required here, as it's written in the ready button
        } else if (gameData.stage === 2) {
            botPick()
            stagePlus()
        } else if (gameData.stage === 3) {
            basicSpells(playerTableCards)
            checkWin()
            basicSpells(enemyTableCards)
            checkWin()
            stagePlus()
        } else if (gameData.stage === 4) {
            // implemented
            // attention! no stagePlus required here, as it's written in the ready button
        } else if (gameData.stage === 5) {
            checkWin()
            botAttack()
            checkWin()
            stagePlus()
        }
    }

    const checkWin = () => {
        if (gameData.playerHp <= 0) {
            alert('You lost, loser!')
        } else if (gameData.botHp <= 0) {
            alert('You won, gg.')
        }
    }

    const blankFunc = () => {
        //
    }

    const readyButton = () => {
        if (gameData.stage === 1 || gameData.stage === 4) {
            stagePlus()
        }
    }

    return (<div className="mainWindow">

        <div className="headerWindow">
            <Header data={allData} stage={stage} setStage={setStage} turn={turnConst} setTurn={setTurnConst}
                    hasTakenCard={gameData.hasTakenCard}/>

            <Mana mana={gameData.playerMana}/>
        </div>

        <button onClick={readyButton}>Ready</button>

        <div className="bodyWindow">
            <div className="enemyHand">
                <Field name={"Enemy's hand"} func={blankFunc} container={enemyHandCards}/>
            </div>

                <div className="enemyTable">
                    <Field name={"Enemy's table"} func={handleTableClickOther} container={enemyTableCards}/>
                </div>

                <div className="playerTable">
                    <Field name={"Player's table"} func={handleTableClickOwn} container={playerTableCards}/>
                </div>

                <div className="playerHand">
                    <Field name={"Player's hand"} func={handleHandClick} container={playerHandCards}/>
                </div>
            </div>

        </div>);
}

export default App;