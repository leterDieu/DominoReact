function attack(attacker, defender, attackerTable, defenderTable, defenderTableSetter) { // 0 - success; 1 - error
    if (attacker.canAttackThisTurn === true) {
        attacker.router("atk", [attackerTable, defender, defenderTable])
        defender.router("def", [defenderTable, attacker, attackerTable])

        defender.getDamage(attacker.atk)

        let toRemoveAttacked = checkHealth(defenderTable)
        let updatedTable = [...defenderTable]
        for (let i = 0; i < toRemoveAttacked.length; i++) {
            updatedTable.splice(updatedTable.indexOf(toRemoveAttacked[i]), 1)
        }
        console.log(updatedTable)
        defenderTableSetter(updatedTable)
        attacker.canAttackThisTurn = false
    }
}

function basicSpells(table) {
    for (let i = 0; i < table.length; i++) {
        table[i].router("basic", [table, null, null])
    }
}

function allowAttacks(table) {
    for (let i = 0; i < table.length; i++) {
        table[i].canAttackThisTurn = true
    }
}

function checkHealth(table) {
    let toRemove = []
    for (let i = 0; i < table.length; i++) {
        if (table[i].hp <= 0) {
            toRemove.push(table[i])
        }
    }
    return toRemove
}

function randint(max) {
    return Math.floor(Math.random() * max)
}

export { attack, basicSpells, checkHealth, randint }
