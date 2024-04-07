import {randint} from "./gameLogic/gamelogic.mjs";

const Header = (props) => {
    const deck = props.data.decks
    const playerHandSetter = props.data.setters.player.hand
    const enemyHandSetter = props.data.setters.enemy.hand
    const playerHandGetter = props.data.getters.player.hand
    const enemyHandGetter = props.data.getters.enemy.hand
    const playerTableSetter = props.data.setters.player.table
    const enemyTableSetter = props.data.setters.enemy.table

    const resetFunc = (playerHandSetter, enemyHandSetter, playerTableSetter, enemyTableSetter) => {
        playerHandSetter([])
        playerTableSetter([])
        enemyTableSetter([])
        enemyHandSetter([])
    }

    const drawCards = (deck, handGetter, handSetter) => { // ограничение на ману и количество карт
        let copied_deck = [...deck]
        let copied_hand = [...handGetter]
        if (copied_hand.length === 8) {
            alert("you have reached maximum of cards in your hand")
            return 1
        }

        // copied_deck.map((card) => ({...card, id: Math.random()}))
        copied_hand.push(new copied_deck[randint(copied_deck.length)]())
        handSetter(copied_hand)
        // console.log(copied_hand)
        return 0
    }

    return (
        <header className="game-header">
            <button onClick={() => resetFunc(playerHandSetter, enemyHandSetter, playerTableSetter, enemyTableSetter)}>Reset</button>

            <button onClick={() => drawCards(deck, playerHandGetter, playerHandSetter)}>DECK -> PLAYER HAND</button>

            <button onClick={() => drawCards(deck, enemyHandGetter, enemyHandSetter)}>DECK -> ENEMY HAND</button>
        </header>)
}

export default Header