function attack(attacker, defender, attackerTable, defenderTable) { // 0 - success; 1 - error
    if (attacker.canAttackThisTurn === true) {
        attacker.router("atk", [attackerTable, defender, defenderTable])
        defender.router("def", [defenderTable, attacker, attackerTable])

        defender.getDamage(attacker.atk)
        attacker.canAttackThisTurn = false
    }
}

function basicSpells(table) {
    for (let i = 0; i < table.length; i++) {
        table[i].router("basic", [table, null, null])
    }
}

function checkHealth(table) {
    let toRemove = []
    for (let i = 0; i < table.length; i++) {
        if (table[i].hp <= 0) {
            toRemove.push(table.indexOf(table[i]))
        }
    }
    return toRemove
}

function randint(max) {
    return Math.floor(Math.random() * max)
}

export { attack, basicSpells, checkHealth, randint }
