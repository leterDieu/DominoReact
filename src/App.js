import './App.css';
import {useState} from "react";
import Header from "./Header.js";
import {basic_deck} from "./gameLogic/deckcreator.mjs";
import UltimateCard from "./ultimatecard";
import {attack, randint, allowAttacks, basicSpells} from "./gameLogic/gamelogic.mjs";
import {Boris} from "./gameLogic/card.mjs";
import background from "./img/wood.jpg";


// const cardImages = [{"src": "./img/example-card-1.png"}, {"src": "./img/example-card-2.png"}, {"src": "./img/example-card-3.png"}, {"src": "./img/example-card-4.png"}, {"src": "./img/example-card-5.png"}, {"src": "./img/example-card-6.png"}, {"src": "./img/example-card-7.png"}, {"src": "./img/example-card-8.png"}, {"src": "./img/example-card-9.png"}, {"src": "./img/example-card-10.png"}, {"src": "./img/example-card-11.png"}, {"src": "./img/example-card-12.png"},]
const deck = basic_deck


const gameData = {
    turn: 1,
    stage: -1,
    playerMana: 5,
    botMana: 5,
    playerManaPerTurn: 2,
    botManaPerTurn: 2,
    playerHp: 10,
    botHp: 10,
    winner: "none"
};

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
        if (gameData.stage === 1) {
            if (gameData.playerMana < card.cst) {
                alert("You have not enough mana to get this card on table")
                return
            }
            let manage_HandCards = [...playerHandCards]
            let oldTable = [...playerTableCards]
            if (playerTableCards.length === 10) {
                alert("You have reached card maximum in table")
                return;
            }

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
            attack(tableChoice1, card, playerTableCards, enemyTableCards, setEnemyTableCards)
        }
    }

    const botAttack = () => {
        for (let botCardId = 0; botCardId < enemyTableCards.length; botCardId++){
            let rng_card_bot = enemyTableCards[botCardId]
            if (playerTableCards.length === 0) {
                gameData.playerHp -= rng_card_bot.atk
            } else {
                let rng_card_plr = playerTableCards[randint(playerTableCards.length)]
                attack(rng_card_bot, rng_card_plr, enemyTableCards, playerTableCards, setPlayerTableCards)
            }
        }
    }

    const Mana = (props) => {
        const mana = props.mana
        return (
            <div>
                <p>your mana: {mana}; bot mana: {gameData.botMana}</p>
                <p>your hp: {gameData.playerHp}; bot hp: {gameData.botHp}</p>
            </div>
        )
    }

    const Field = (props) => {
        const name = props.name
        const func = props.func
        const container = props.container
        const secret = props.secret

        return (
            <div className="cardContainer">
                <p>{name}:</p>
                <div className={"stdBlock"}>
                    {container.map(card => (
                        <UltimateCard key={card.id} card={card} func={func} secret={secret}/>))}
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
        if(manage_TableCards.length === 10) {
            return
        }

        let card_index = randint(manage_HandCards.length)
        let card = manage_HandCards[card_index]
        if (gameData.botMana < card.cst) {
            return;
        }
        manage_TableCards.push(card)
        manage_HandCards.splice(card_index)
        setEnemyHandCards(manage_HandCards)
        setEnemyTableCards(manage_TableCards)
        gameData.botMana -= card.cst
    }

    const manaIncrease = () => {
        gameData.playerMana += gameData.playerManaPerTurn
        gameData.botMana += gameData.botManaPerTurn
    }

    const attackTable = (target) => {
        //waiting to be written
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
        allowAttacks(playerTableCards)
        allowAttacks(enemyTableCards)
        if (gameData.stage === 0) {
            manaIncrease()
            drawCards(playerHandCards, setPlayerHandCards)
            drawCards(enemyHandCards, setEnemyHandCards)
            gameData.stage += 1
            setStage(gameData.stage)
            stagePlus()
        } else if (gameData.stage === 1) {
            // implemented
            // attention! no stagePlus required here, as it's written in the ready button
        } else if (gameData.stage === 2) {
            botPick()
            gameData.stage += 1
            setStage(gameData.stage)
            stagePlus()
        } else if (gameData.stage === 3) {
            basicSpells(playerTableCards)
            basicSpells(enemyTableCards)
            checkWin()
            gameData.stage += 1
            setStage(gameData.stage)
            stagePlus()
        } else if (gameData.stage === 4) {
            // implemented
            // attention! no stagePlus required here, as it's written in the ready button
        } else if (gameData.stage === 5) {
            checkWin()
            botAttack()
            checkWin()
            gameData.stage = 0
            setStage(gameData.stage)
            gameData.turn += 1
            stagePlus()
        }
    }

    const checkWin = () => {
        if (gameData.playerHp <= 0) {
            alert('You lost, loser!')
            gameData.winner = "bot"
        } else if (gameData.botHp <= 0) {
            alert('You won, gg.')
            gameData.winner = "player"
        }
    }

    const blankFunc = () => {
        //
    }

    const readyButton = () => {
        if (stage === 1 || stage === 4) {
            gameData.stage += 1
            setStage(gameData.stage)
            stagePlus()
        }
    }

    function startGame() {
        gameData.stage = 0
        setStage(gameData.stage)
        stagePlus()
    }

    const dealDamageToBase = (card) => {
        if (enemyTableCards.length === 0 && tableChoice1 !== null) {
            gameData.botHp -= tableChoice1.atk
            tableChoice1.canAttackThisTurn = false
        }
    }


    const Base = () => {
        const name = "bot base"

        const handleClick = () => {
            dealDamageToBase()
        }

        return (
            <div className="rightBlock">
                <p className="bigkostyl">{name}:</p>
                <img src={require(`./img/lumbabalumba.png`)} onClick={handleClick}/>
            </div>)
    }

    let answer;
    if (stage === 1) {
        answer = "pick cards from hand"
    } else {
        answer = "attack enemy cards"
    }

    if (stage === -1) {
        return (
            <div>
                <button onClick={startGame}>start game</button>
            </div>
        )
    } else if (gameData.winner === "player" || gameData.winner === "bot") {
        return (
            <div>
                <p>{gameData.winner} won</p>
            </div>
        )
    } else {
        return (
            <div className="mainWindow" style={{ backgroundImage: `url(${background})`, color: 'white'}}>

                <div className="headerWindow">

                    <Mana mana={gameData.playerMana}/>

                    <button onClick={readyButton}>Ready</button>
                    <p>you can now: {answer}. Press ready button to go to the next phase. current turn: {gameData.turn}</p>

                </div>


                <div className="bodyWindow">
                    <div>
                        <Base />
                    </div>
                    <div className="enemyHand">
                        <Field name={"Enemy's hand"} func={blankFunc} container={enemyHandCards} secret={true}/>
                    </div>

                    <div className="enemyTable">
                        <Field name={"Enemy's table"} func={handleTableClickOther} container={enemyTableCards} secret={false}/>
                    </div>

                    <div>
                        <hr/>
                    </div>

                    <div className="playerTable">
                        <Field name={"Player's table"} func={handleTableClickOwn} container={playerTableCards} secret={false}/>
                    </div>

                    <div className="playerHand">
                        <Field name={"Player's hand"} func={handleHandClick} container={playerHandCards} secret={false}/>
                    </div>
                </div>
            </div>);
    }
}

export default App;