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

    return (
        <header className="game-header">
            <button
                onClick={() => resetFunc(playerHandSetter, enemyHandSetter, playerTableSetter, enemyTableSetter, setTurn, setStage)}>Reset
            </button>
        </header>)
}

export default Header