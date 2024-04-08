import {randint} from "./gameLogic/gamelogic.mjs";

const Header = (props) => {
    const deck = props.data.decks
    const playerHandSetter = props.data.setters.player.hand
    const enemyHandSetter = props.data.setters.enemy.hand
    const playerHandGetter = props.data.getters.player.hand
    const enemyHandGetter = props.data.getters.enemy.hand
    const playerTableSetter = props.data.setters.player.table
    const enemyTableSetter = props.data.setters.enemy.table
    const stage = props.stage
    const setStage = props.setStage
    const turn = props.turn
    const setTurn = props.setTurn
    const hasTakenCard = props.hasTakenCard

    const resetFunc = (playerHandSetter, enemyHandSetter, playerTableSetter, enemyTableSetter, setTurn, setStage) => {
        playerHandSetter([])
        playerTableSetter([])
        enemyTableSetter([])
        enemyHandSetter([])
        setStage(0)
        setTurn(0)

        // set stage to zero, set gameData to initial
    }

    const drawCards = (deck, handGetter, handSetter, hasTakenCard) => { // ограничение на ману и количество карт
        if (!hasTakenCard) {
            let copied_deck = [...deck]
            let copied_hand = [...handGetter]

            if (copied_hand.length === 8) {
                alert("you have reached maximum of cards in your hand")
                return 1
            }

            let newCard = new copied_deck[randint(copied_deck.length)]()
            copied_hand.push(newCard)
            handSetter(copied_hand)
            return 0
        } else {
            alert("You have already took card from deck this turn.")
            return 1
        }
    }

    return (
        <header className="game-header">
            <button
                onClick={() => resetFunc(playerHandSetter, enemyHandSetter, playerTableSetter, enemyTableSetter, setTurn, setStage)}>Reset
            </button>

            <button onClick={() => drawCards(deck, playerHandGetter, playerHandSetter, hasTakenCard)}>DECK -> PLAYER HAND</button>

            <button onClick={() => drawCards(deck, enemyHandGetter, enemyHandSetter, false)}>DECK -> ENEMY HAND</button>
        </header>)
}

export default Header